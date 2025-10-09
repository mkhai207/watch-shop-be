const Joi = require('@hapi/joi');

const createOrder = {
	body: Joi.object().keys({
		shipping_address: Joi.string().required(),
		shipping_fee: Joi.number().min(0).required(),
		discount_code: Joi.string().allow(null, ''),
		note: Joi.string().max(255).allow(null, ''),
		guess_name: Joi.string().max(50).required(),
		guess_email: Joi.string().email().max(100).required(),
		guess_phone: Joi.string().max(15).required(),
		payment_method: Joi.string(),
		discount_amount: Joi.number().min(0).default(0),
		variants: Joi.array()
			.items(
				Joi.object().keys({
					variant_id: Joi.number().required(),
					quantity: Joi.number().integer().min(1).required(),
				})
			)
			.min(1)
			.required(),
	}),
};

const getOrders = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getOrder = {
	params: Joi.object().keys({
		orderId: Joi.number().required(),
	}),
};

const deleteOrder = {
	params: Joi.object().keys({
		orderId: Joi.number().required(),
	}),
};

const changeOrderStatus = {
	params: Joi.object().keys({
		orderId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		order_status_id: Joi.number().required(),
		note: Joi.string(),
	}),
};

const cancelOrder = {
	params: Joi.object().keys({
		orderId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		reason: Joi.string().required(),
	}),
};

const retryPayment = {
	params: Joi.object().keys({
		orderId: Joi.number().required(),
	}),
};

module.exports = {
	createOrder,
	getOrders,
	getOrder,
	deleteOrder,
	changeOrderStatus,
	cancelOrder,
	retryPayment,
};
