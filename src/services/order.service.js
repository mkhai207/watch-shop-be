const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db/models');
const {
	getCurrentDateYYYYMMDDHHMMSS,
	parseChar14ToDDMMYYYY,
} = require('../utils/datetime');
const { generateOrderCode } = require('../utils/generateOrderCode');
const orderStatusService = require('./order.status.service');
const { getClientIp } = require('../utils/requestInfo');
const paymentService = require('./payment.service');
const config = require('../config/config');
const { getOffset, buildFilters, buildOrder } = require('../utils/query');
const orderStatusHistoryService = require('./order.status.history.service');
const emailService = require('./email.service');
const watchService = require('./watch.service');
const watchSyncService = require('./watch.sync.service');

async function sendOrderConfirmationEmail(to, order) {
	const subject = `Xác nhận đơn hàng #${order.code} thành công`;

	const text = `Xin chào ${order.guess_name},

Cảm ơn bạn đã đặt hàng tại Watch Shop!

Đơn hàng của bạn đã được tiếp nhận thành công với thông tin sau:
- Mã đơn hàng: ${order.code}
- Ngày đặt: ${parseChar14ToDDMMYYYY(order.created_at)}
- Tổng tiền: ${order.final_amount.toLocaleString()} VND
- Địa chỉ giao hàng: ${order.shipping_address}

Bạn có thể theo dõi trạng thái đơn hàng tại liên kết sau:
http://link-to-app/orders/${order.id}

Chúng tôi sẽ thông báo cho bạn khi đơn hàng được đóng gói và bàn giao cho đơn vị vận chuyển.

Trân trọng,
Watch Shop Team`;

	await emailService.sendEmail(to, subject, text);
}

async function getOrderById(orderId) {
	const order = await db.order.findOne({
		where: { id: orderId, del_flag: '0' },
		include: [
			{
				model: db.orderDetail,
				as: 'details',
				attributes: ['id', 'quantity'],
				include: [
					{
						model: db.watchVariant,
						as: 'variant',
						attributes: ['id'],
						include: [
							{
								model: db.watch,
								as: 'watch',
							},
							{
								model: db.color,
								as: 'color',
								attributes: ['id', 'name'],
							},
							{
								model: db.strapMaterial,
								as: 'strapMaterial',
								attributes: ['id', 'name'],
							},
						],
					},
				],
			},
		],
	});

	return order;
}

async function getOrderByCode(code, options = {}) {
	return db.order.findOne({ where: { code, del_flag: '0' }, ...options });
}

async function createOrder(req) {
	const {
		shipping_address,
		shipping_fee,
		discount_code,
		guess_name,
		guess_email,
		guess_phone,
		payment_method = '0', // '0' = COD, '1' = online
		discount_amount,
		variants = [],
	} = req.body || {};

	const t = await db.sequelize.transaction();
	try {
		const code = generateOrderCode();
		const dup = await getOrderByCode(code, {
			transaction: t,
			lock: t.LOCK.UPDATE,
		});
		if (dup) {
			throw new ApiError(
				httpStatus.CONFLICT,
				'Mã đơn hàng đã tồn tại, vui lòng thử lại.'
			);
		}

		const firstStatus =
			payment_method === '1'
				? await orderStatusService.getOrderStatusBySortOrder(2, {
						transaction: t,
				  })
				: await orderStatusService.getOrderStatusFirst({
						transaction: t,
				  });

		if (!firstStatus) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				'Không xác định được trạng thái đơn đầu tiên.'
			);
		}

		let itemsTotal = 0;
		const nowStr = getCurrentDateYYYYMMDDHHMMSS();
		const userId = req.user?.userId ?? null;

		const detailRows = [];
		for (const item of variants) {
			const { variant_id, quantity } = item || {};
			if (!variant_id || !quantity || quantity <= 0) {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					'Dòng hàng không hợp lệ.'
				);
			}

			const variant = await db.watchVariant.findOne({
				where: { id: variant_id, del_flag: '0' },
				transaction: t,
				lock: t.LOCK.UPDATE,
			});
			if (!variant) {
				throw new ApiError(
					httpStatus.NOT_FOUND,
					'Không tìm thấy sản phẩm bạn chọn.'
				);
			}
			if (variant.stock_quantity < quantity) {
				throw new ApiError(
					httpStatus.CONFLICT,
					'Không đủ số lượng tồn. Vui lòng chọn lại.'
				);
			}

			const unitPrice = Number(variant.price);
			const lineTotal = unitPrice * item.quantity;
			itemsTotal += lineTotal;

			await variant.update(
				{ stock_quantity: variant.stock_quantity - quantity },
				{ transaction: t }
			);

			detailRows.push({
				order_id: null,
				variant_id,
				quantity,
				unit_price: unitPrice,
				total_price: lineTotal,
				created_at: nowStr,
				created_by: userId,
				del_flag: '0',
			});
		}
		const shippingFee = Number(shipping_fee) || 0;
		const discountAmount = Math.max(0, Number(discount_amount) || 0);
		const total_amount = itemsTotal;
		const final_amount = Math.max(
			0,
			total_amount + shippingFee - discountAmount
		);

		const createdOrder = await db.order.create(
			{
				code,
				user_id: userId,
				discount_code,
				shipping_address,
				shipping_fee: shippingFee,
				discount_amount: discountAmount,
				total_amount,
				final_amount,
				guess_name,
				guess_email,
				guess_phone,
				current_status_id: firstStatus.id,
				payment_method,
				created_at: nowStr,
				created_by: userId,
				del_flag: '0',
				review_flag: '0',
			},
			{ transaction: t }
		);

		if (!createdOrder) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				'Tạo đơn hàng thất bại, vui lòng thử lại.'
			);
		}

		detailRows.forEach((d) => (d.order_id = createdOrder.id));
		await db.orderDetail.bulkCreate(detailRows, { transaction: t });

		await db.orderStatusHistory.create(
			{
				order_id: createdOrder.id,
				status_id: firstStatus.id,
				note: null,
				created_at: nowStr,
				created_by: userId,
				del_flag: '0',
			},
			{ transaction: t }
		);

		await t.commit();

		const orderPlain = createdOrder.get
			? createdOrder.get({ plain: true })
			: createdOrder;
		const result = {
			order: {
				...orderPlain,
				current_status_content: firstStatus.name,
				order_detail: detailRows,
			},
		};

		if (payment_method === '1') {
			const ipAddr = getClientIp(req);
			result.vnpayUrl = paymentService.createVNPayUrl(
				orderPlain,
				final_amount,
				ipAddr
			);
		}
		sendOrderConfirmationEmail(createdOrder.guess_email, createdOrder);
		return result;
	} catch (err) {
		await t.rollback();
		throw err;
	}
}

async function getOrders(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			current_status_id: { type: 'string', op: 'eq' },
			code: { type: 'string', op: 'like' },
			created_at: { type: 'date', op: 'range' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	where.user_id = req.user.userId;

	const order = buildOrder(req.query.sort, [
		'total_amount',
		'id',
		'final_amount',
		'guess_name',
	]);

	const { count, rows } = await db.order.findAndCountAll({
		where,
		order,
		include: {
			model: db.configOrderStatus,
			as: 'currentStatus',
			attributes: ['name'],
			where: { del_flag: '0' },
		},
		limit,
		offset,
	});

	return {
		page,
		limit,
		totalItems: count,
		totalPages: Math.ceil(count / limit),
		items: rows,
	};
}

async function getAllOrders(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			current_status_id: { type: 'string', op: 'eq' },
			code: { type: 'string', op: 'like' },
			created_at: { type: 'string', op: 'range' },
		},
	};

	const { where } = buildFilters(req.query, schema);

	const order = buildOrder(req.query.sort, [
		'total_amount',
		'id',
		'final_amount',
		'guess_name',
	]);

	const orders = await db.order.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return orders;
}

async function changeOrderStatus(req) {
	const order = await getOrderById(req.params.orderId);
	if (!order)
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'Đơn hàng này không tồn tại. Vui lòng kiểm tra lại.'
		);

	const newStatus = await orderStatusService.getOrderStatusById(
		req.body.order_status_id
	);
	if (!newStatus)
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'Không tìm thấy trạng thái đơn hàng. Vui lòng kiểm tra lại.'
		);

	const currStatus = await orderStatusService.getOrderStatusById(
		order.current_status_id
	);

	if (currStatus.code.toLowerCase() === 'completed')
		throw new ApiError(
			400,
			'Đơn hàng đã hoàn thành, không thể thay đổi trạng thái.'
		);

	if (newStatus.sort_order < currStatus.sort_order)
		throw new ApiError(
			400,
			'Trạng thái đơn hàng không hợp lệ. Vui lòng kiểm tra lại'
		);

	const t = await db.sequelize.transaction();
	try {
		const updatedStatus =
			await orderStatusHistoryService.createOrderStatusHistory(
				{
					orderId: order.id,
					statusId: newStatus.id,
					userId: req.user.userId || 0,
				},
				{ transaction: t }
			);

		const updatedOrder = await order.update(
			{ current_status_id: newStatus.id },
			{ transaction: t }
		);

		if (updatedStatus && newStatus.code.toLowerCase() === 'completed') {
			const watch_ids = [
				...new Set(order.details.map((item) => item.variant.watch.id)),
			];
			watch_ids.forEach(async (watch_id) => {
				await watchService.incrementWatchSoldCount(watch_id);
				await watchSyncService.syncOneWatch(watch_id);
			});
		}

		await t.commit();
		if (updatedStatus && updatedOrder) return true;
		return false;
	} catch (error) {
		await t.rollback();
		throw error;
	}
}

async function deleteOrder(req) {
	const updatedOrder = await db.order.update(
		{
			del_flag: '1',
			updated_at: getCurrentDateYYYYMMDDHHMMSS(),
			updated_by: req.user.userId || 0,
		},
		{ where: { id: req.params.orderId } }
	);

	if (!updatedOrder)
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'Không tìm thấy đơn hàng này. Vui lòng thử lại.'
		);

	return updatedOrder;
}

async function cancelOrder(req) {
	const order = await getOrderById(req.params.orderId);
	if (!order)
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'Đơn hàng này không tồn tại. Vui lòng kiểm tra lại.'
		);

	const cancelStatus = await orderStatusService.getOrderStatusByCode(
		'CANCEL',
		0
	);
	if (!cancelStatus)
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'Không tìm thấy trạng thái đơn hàng. Vui lòng kiểm tra lại.'
		);

	const currStatus = await orderStatusService.getOrderStatusById(
		order.current_status_id
	);

	if (currStatus.sort_order > 4)
		throw new ApiError(400, 'Không thể hủy đơn hàng.');

	const t = await db.sequelize.transaction();
	try {
		let refund_flag = false;
		const payment = await paymentService.getPaymentByOrderId(
			req.params.orderId
		);

		if (payment) {
			const refundData = await paymentService.refundVNPay({
				payment,
				reason: req.body.reason || '',
				userId: req.user.userId,
			});

			const refundSuccess = refundData.vnp_ResponseCode === '00';
			refund_flag = refundSuccess;

			if (!refundSuccess) {
				throw new ApiError(
					400,
					`Hoàn tiền VNPay thất bại: ${
						refundData.vnp_Message || 'Không xác định'
					}`
				);
			}
			console.log(refundData);

			const paymentRefund = {
				order_id: payment.order_id,
				transaction_code: `REFUND_${payment.order_id}_${Date.now()}`,
				amount: payment.amount,
				method: 'vnpay',
				status: refundSuccess ? 'REFUNDED' : 'FAILED',
				type: '1', // hoàn tiền
				note:
					refundData.vnp_Message ||
					`Hoàn tiền đơn hàng #${payment.order_id}`,
				gateway_trans_no: refundData.vnp_TransactionNo || null,
				trans_date: refundData.vnp_TransDate || null,
				created_by: req.user.userId || 0,
				del_flag: '0',
			};

			await paymentService.createPayment(paymentRefund, {
				transaction: t,
			});
		} else {
			refund_flag = true;
		}

		// if (!payment || refund_flag) {
		// 	await orderStatusHistoryService.createOrderStatusHistory(
		// 		{
		// 			orderId: order.id,
		// 			statusId: cancelStatus.id,
		// 			userId: req.user.userId || 0,
		// 		},
		// 		{ transaction: t }
		// 	);

		// 	await order.update(
		// 		{ current_status_id: cancelStatus.id },
		// 		{ transaction: t }
		// 	);
		// }

		if (refund_flag) {
			const orderDetails = await db.orderDetail.findAll({
				where: { order_id: order.id },
				transaction: t,
			});

			for (const item of orderDetails) {
				await db.watchVariant.increment('stock', {
					by: item.quantity,
					where: { id: item.variant_id },
					transaction: t,
				});
			}

			await orderStatusHistoryService.createOrderStatusHistory(
				{
					orderId: order.id,
					statusId: cancelStatus.id,
					userId: req.user.userId || 0,
				},
				{ transaction: t }
			);

			await order.update(
				{ current_status_id: cancelStatus.id },
				{ transaction: t }
			);
		}

		await t.commit();
		if (updatedStatus && updatedOrder && refund_flag) return true;
		return false;
	} catch (error) {
		if (!t.finished) {
			await t.rollback();
		}
		throw new ApiError(500, `Hủy đơn hàng thất bại: ${error}`);
	}
}

async function retryPayment(req) {
	const order = await getOrderById(req.params.orderId);

	if (order.payment_method !== '1')
		throw new ApiError(
			400,
			'Đơn hàng này không phải thanh toán online. Vui lòng kiểm tra lại.'
		);

	if (order.current_status_id > 2)
		throw new ApiError(
			400,
			'Đơn hàng đã được xử lý, không thể thanh toán lại.'
		);

	const payment = await paymentService.getPaymentByOrderId(order.id);
	if (payment && payment.status.toLowerCase() === 'success')
		throw new ApiError(400, 'Đơn hàng đã được thanh toán thành công.');

	const ipAddr = '127.0.0.1';
	const rePaymentUrl = paymentService.createVNPayUrl(
		order,
		order.final_amount,
		ipAddr
	);
	return rePaymentUrl;
}

module.exports = {
	createOrder,
	getOrders,
	getOrderById,
	changeOrderStatus,
	deleteOrder,
	sendOrderConfirmationEmail,
	cancelOrder,
	retryPayment,
	getAllOrders,
};
