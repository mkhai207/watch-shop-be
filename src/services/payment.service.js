const axios = require('axios');
const crypto = require('crypto');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

dayjs.extend(utc);
dayjs.extend(timezone);

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

	const vnp_RequestId = Date.now().toString();
	const vnp_CreateDate = new Date()
		.toISOString()
		.replace(/[-T:.Z]/g, '')
		.slice(0, 14);

	const params = {
		vnp_RequestId,
		vnp_Version: '2.1.0',
		vnp_Command: 'refund',
		vnp_TmnCode,
		vnp_TransactionType: '02', // 02 = hoàn toàn bộ, 03 = hoàn một phần
		vnp_TxnRef: payment.transaction_code,
		vnp_Amount: payment.amount * 100,
		vnp_OrderInfo: reason,
		vnp_TransactionNo: payment.gateway_trans_no, // lấy từ payment gốc
		vnp_CreateBy: userId || 'system',
		vnp_CreateDate,
		vnp_IpAddr: '127.0.0.1',
	};

	const sortedParams = Object.entries(params)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([k, v]) => `${k}=${v}`)
		.join('&');

	const vnp_SecureHash = crypto
		.createHmac('sha512', vnp_HashSecret)
		.update(sortedParams)
		.digest('hex');

	params.vnp_SecureHash = vnp_SecureHash;

	console.log('Refund VNPay request:', params);

	// Gửi request tới VNPay
	const res = await axios.post(
		'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
		params
	);

	console.log('Refund VNPay response:', res.data);
	return res.data;
}

async function createPayment(data) {
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

	const createdPayment = await db.payment.create({
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
	});

	return createdPayment;
}

module.exports = { createVNPayUrl, createPayment, refundVNPay };
