const crypto = require('crypto');
const httpStatus = require('http-status');
const db = require('../db/models');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const orderStatusService = require('../services/order.status.service');
const orderStatusHistoryService = require('../services/order.status.history.service');
const paymentService = require('../services/payment.service');
const ApiError = require('../utils/ApiError');
const { config } = require('../config/config');

const handleVNPayReturn = catchAsync(async (req, res) => {
	const vnp_HashSecret = config.vnpay.hashSecret;
	const vnp_Params = req.query;
	const secureHash = vnp_Params['vnp_SecureHash'];
	delete vnp_Params['vnp_SecureHash'];
	delete vnp_Params['vnp_SecureHashType'];

	const sortedParams = Object.keys(vnp_Params)
		.sort()
		.reduce((obj, key) => {
			obj[key] = vnp_Params[key];
			return obj;
		}, {});
	const signData = new URLSearchParams(sortedParams).toString();
	const hmac = crypto.createHmac('sha512', vnp_HashSecret);
	const checkSum = hmac.update(signData).digest('hex');

	if (secureHash !== checkSum) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid checksum');
	}

	const orderId = vnp_Params['vnp_TxnRef'].split('_')[1];
	const vnp_ResponseCode = vnp_Params['vnp_ResponseCode'];
	const transactionNo = vnp_Params['vnp_TransactionNo'];
	const payDate = vnp_Params['vnp_PayDate'];

	const t = await db.sequelize.transaction();
	try {
		const order = await db.order.findByPk(orderId, { transaction: t });
		if (!order) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
		}
		let status = 'failed';
		if (vnp_ResponseCode === '00') {
			status = 'success';
			const paidStatus =
				await orderStatusService.getOrderStatusBySortOrder(3, {
					transaction: t,
				});
			await order.update(
				{
					current_status_id: paidStatus.id,
					// transaction_id: transactionId,
				},
				{ transaction: t }
			);
			await orderStatusHistoryService.createOrderStatusHistory(
				{
					orderId: order.id,
					statusId: paidStatus.id,
					userId: order.user_id || 0,
				},
				{ transaction: t }
			);

			await paymentService.createPayment(
				{
					order_id: order.id,
					transaction_code: req.query.vnp_TxnRef,
					amount: order.final_amount,
					gateway_trans_no: transactionNo,
					trans_date: payDate,
					method: 'vnpay',
					status,
					type: '0',
					note: vnp_Params['vnp_OrderInfo'],
					userId: order.user_id || 0,
					del_flag: '0',
				},
				{ transaction: t }
			);
			await t.commit();
			return res.redirect(
				`${
					config.feServerUrl || 'http://localhost:3000'
				}/order/order-success`
			);
		}
		await paymentService.createPayment(
			{
				order_id: order.id,
				transaction_code: req.query.vnp_TxnRef,
				amount: order.final_amount,
				method: 'vnpay',
				status,
				type: '0',
				note: null,
				userId: order.user_id || 0,
			},
			{ transaction: t }
		);
		await t.commit();

		return res.redirect('http://localhost:3000/order/order-fail');
	} catch (err) {
		await t.rollback();
		throw err;
	}
});

const getPaymentsByOrder = catchAsync(async (req, res) => {
	const payments = await paymentService.getPaymentsByOrder(
		req.params.orderId
	);
	res.send({ payments });
});

module.exports = {
	handleVNPayReturn,
	getPaymentsByOrder,
};
