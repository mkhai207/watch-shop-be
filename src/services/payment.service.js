const axios = require('axios');
const crypto = require('crypto');
const https = require('https');
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

	// Validate required fields
	if (!payment.transaction_code) {
		throw new Error('Payment transaction_code is required');
	}
	if (!payment.gateway_trans_no) {
		throw new Error('Payment gateway_trans_no is required');
	}
	if (!payment.amount) {
		throw new Error('Payment amount is required');
	}

	const vnp_RequestId = Date.now().toString();
	const vnp_CreateDate = getVNPayDateFormat();

	// Format transaction date correctly - this is critical for signature
	let vnp_TransactionDate;
	if (payment.trans_date) {
		// Clean and format the transaction date
		const cleanDate = payment.trans_date.replace(/\D/g, '');
		if (cleanDate.length >= 14) {
			vnp_TransactionDate = cleanDate.slice(0, 14);
		} else if (cleanDate.length >= 8) {
			// If only date part, pad with time
			vnp_TransactionDate = cleanDate.padEnd(14, '0');
		} else {
			vnp_TransactionDate = vnp_CreateDate;
		}
	} else {
		vnp_TransactionDate = vnp_CreateDate;
	}

	// Build params according to VNPay refund API specification
	const params = {
		vnp_RequestId,
		vnp_Version: '2.1.0',
		vnp_Command: 'refund',
		vnp_TmnCode: tmnCode,
		vnp_TransactionType: '02', // 02 = full refund, 03 = partial refund
		vnp_TxnRef: payment.transaction_code,
		vnp_Amount: String(Math.round(payment.amount * 100)), // Convert to VND cents
		vnp_OrderInfo: removeVietnameseTones(
			reason || `Hoan tien don hang ${payment.order_id}`
		).substring(0, 255), // Limit to 255 characters
		vnp_TransactionNo: payment.gateway_trans_no,
		vnp_TransactionDate,
		vnp_CreateBy: String(userId || 'system'),
		vnp_CreateDate,
		vnp_IpAddr: '127.0.0.1',
		vnp_Locale: 'vn',
	};

	// Filter out null/undefined/empty values but keep zeros
	const filteredParams = {};
	Object.entries(params).forEach(([key, value]) => {
		if (value !== null && value !== undefined && value !== '') {
			filteredParams[key] = String(value); // Ensure all values are strings
		}
	});

	// Create signature string - VNPay requires specific sorting
	const sortedKeys = Object.keys(filteredParams).sort();
	const signatureData = sortedKeys
		.map((key) => `${key}=${filteredParams[key]}`)
		.join('&');

	// Create HMAC SHA512 signature
	const vnp_SecureHash = crypto
		.createHmac('sha512', hashSecret)
		.update(signatureData, 'utf-8')
		.digest('hex');

	filteredParams.vnp_SecureHash = vnp_SecureHash;

	console.log('👉 VNPay Refund Request Details:');
	console.log('  - Payment ID:', payment.id);
	console.log('  - Transaction Code:', payment.transaction_code);
	console.log('  - Gateway Trans No:', payment.gateway_trans_no);
	console.log(
		'  - Amount:',
		payment.amount,
		'-> VND cents:',
		Math.round(payment.amount * 100)
	);
	console.log('  - Original Trans Date:', payment.trans_date);
	console.log('  - Formatted Trans Date:', vnp_TransactionDate);
	console.log('👉 Signature Data:', signatureData);
	console.log('👉 Request Params:', JSON.stringify(filteredParams, null, 2));

	const agent = new https.Agent({
		rejectUnauthorized: false,
	});

	try {
		const res = await axios.post(
			'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
			filteredParams,
			{
				headers: { 'Content-Type': 'application/json' },
				httpsAgent: agent,
			}
		);

		console.log('✅ VNPay Refund Response:', res.data);

		// Check response
		if (res.data.vnp_ResponseCode !== '00') {
			throw new Error(
				`VNPay refund failed: ${
					res.data.vnp_Message || 'Unknown error'
				}`
			);
		}

		return res.data;
	} catch (error) {
		const errorData =
			error.response && error.response.data ? error.response.data : null;
		const errorMessage =
			errorData && errorData.vnp_Message
				? errorData.vnp_Message
				: error.message;

		console.error('❌ VNPay Refund Error Details:');
		console.error('  - Error response:', errorData);
		console.error('  - Error message:', errorMessage);
		console.error(
			'  - Request params were:',
			JSON.stringify(filteredParams, null, 2)
		);

		throw new Error(`Invalid signature`);
	}
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
