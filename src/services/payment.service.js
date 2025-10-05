const axios = require('axios');
const crypto = require('crypto');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');
const { removeVietnameseTones } = require('../utils/normalizeVie');

dayjs.extend(utc);
dayjs.extend(timezone);

function getVNPayDateFormat(date = new Date()) {
	return dayjs(date).tz('Asia/Ho_Chi_Minh').format('YYYYMMDDHHmmss');
}

const createVNPayUrl = (order, amount, ipAddr = '127.0.0.1') => {
	const { tmnCode, hashSecret, url, returnUrl } = config.vnpay;
	const vnp_TmnCode = tmnCode;
	const vnp_HashSecret = hashSecret;
	const vnp_Url = url;
	const vnp_ReturnUrl = returnUrl;

	const createDate = dayjs().tz('Asia/Ho_Chi_Minh');
	const expireDate = createDate.add(15, 'minute');

	const params = new URLSearchParams();
	params.append('vnp_Version', '2.1.0');
	params.append('vnp_Command', 'pay');
	params.append('vnp_TmnCode', vnp_TmnCode);
	params.append('vnp_Amount', String(amount * 100));
	params.append('vnp_CurrCode', 'VND');
	params.append('vnp_TxnRef', `ORDER_${order.id}_${Date.now()}`);
	params.append('vnp_OrderInfo', `Thanh toan don hang ${order.id}`);
	params.append('vnp_OrderType', 'order-type');
	params.append('vnp_Locale', 'vn');
	params.append('vnp_ReturnUrl', vnp_ReturnUrl);
	params.append('vnp_IpAddr', ipAddr);
	params.append('vnp_CreateDate', createDate.format('YYYYMMDDHHmmss'));
	params.append('vnp_ExpireDate', expireDate.format('YYYYMMDDHHmmss'));

	const sortedParams = Array.from(params.entries()).sort(([a], [b]) =>
		a.localeCompare(b)
	);
	const queryString = sortedParams
		.map(
			([key, value]) =>
				`${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`
		)
		.join('&');

	const hmac = crypto.createHmac('sha512', vnp_HashSecret);
	const vnp_SecureHash = hmac.update(queryString).digest('hex');
	params.append('vnp_SecureHash', vnp_SecureHash);

	const finalUrl = `${vnp_Url}?${params.toString()}`;

	return finalUrl;
};

async function refundVNPay({ payment, reason, userId }) {
	const { tmnCode, hashSecret } = config.vnpay;
	const vnp_TmnCode = tmnCode;
	const vnp_HashSecret = hashSecret;

	// --- Tạo các giá trị thời gian chuẩn GMT+7 ---
	const vnp_RequestId = Date.now().toString();
	const vnp_CreateDate = getVNPayDateFormat();
	const vnp_TransactionDate = payment.trans_date
		? payment.trans_date.replace(/\D/g, '').slice(0, 14)
		: getVNPayDateFormat();

	// --- Tạo params theo tài liệu VNPay ---
	let params = {
		vnp_RequestId,
		vnp_Version: '2.1.0',
		vnp_Command: 'refund',
		vnp_TmnCode: vnp_TmnCode,
		vnp_TransactionType: '02', // 02 = hoàn toàn bộ, 03 = hoàn 1 phần
		vnp_TxnRef: payment.transaction_code,
		vnp_Amount: payment.amount * 100,
		vnp_OrderInfo: removeVietnameseTones(
			reason || `Hoan tien don hang ${payment.order_id}`
		),
		vnp_TransactionNo: payment.gateway_trans_no,
		vnp_TransactionDate,
		vnp_CreateBy: String(userId || 'system'),
		vnp_CreateDate: vnp_CreateDate,
		vnp_IpAddr: '127.0.0.1',
		vnp_Locale: 'vn', // hoặc 'en'
		vnp_SecureHashType: 'SHA512',
	};

	// --- Xóa field null/undefined ---
	params = Object.fromEntries(
		Object.entries(params).filter(
			([_, v]) => v !== null && v !== undefined && v !== ''
		)
	);

	// --- Sắp xếp tham số theo thứ tự A→Z và nối chuỗi ---
	const toSign = Object.entries(params)
		.filter(([k]) => k !== 'vnp_SecureHash') // đảm bảo không ký chính hash
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([k, v]) => `${k}=${v}`)
		.join('&');

	// --- Tạo chữ ký bảo mật (HMAC SHA512) ---
	const vnp_SecureHash = crypto
		.createHmac('sha512', Buffer.from(vnp_HashSecret, 'utf-8'))
		.update(Buffer.from(toSign, 'utf-8'))
		.digest('hex');

	params.vnp_SecureHash = vnp_SecureHash;

	console.log('👉 Refund VNPay request:', params);
	console.log('👉 String to sign:', toSign);

	// --- Gửi request tới VNPay sandbox ---
	const res = await axios.post(
		'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
		params,
		{ headers: { 'Content-Type': 'application/json' } } // nên gửi JSON
	);

	console.log('✅ Refund VNPay response:', res.data);
	return res.data;
}

async function createPayment(data, options = {}) {
	const {
		order_id,
		transaction_code,
		amount,
		gateway_trans_no,
		trans_date,
		method = 'vnpay',
		status = 'pending',
		type = '0', // thanh toán , 1: hoàn tiền
		note = null,
		userId = null,
	} = data;

	const transaction = options.transaction || null;

	const createdPayment = await db.payment.create(
		{
			order_id,
			transaction_code,
			amount,
			gateway_trans_no,
			trans_date,
			method,
			status,
			type,
			note,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: userId,
			del_flag: '0',
		},
		{ transaction }
	);

	return createdPayment;
}

async function getPaymentByOrderCode(orderCode) {
	const payment = await db.payment.findOne({
		where: {
			transaction_code: orderCode,
			status: 'success',
			type: '0',
			del_flag: '0',
		},
	});

	return payment;
}

async function getPaymentByOrderId(orderId) {
	const payment = await db.payment.findOne({
		where: {
			order_id: orderId,
			status: 'success',
			type: '0',
			del_flag: '0',
		},
	});

	return payment;
}

module.exports = {
	createVNPayUrl,
	createPayment,
	refundVNPay,
	getPaymentByOrderCode,
	getPaymentByOrderId,
};
