const Joi = require('@hapi/joi');

const createOrderStatus = {
	body: Joi.object().keys({
		code: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string(),
		hex_code: Joi.string(),
		color: Joi.string(),
		sort_order: Joi.number(),
	}),
};

const getOrderStatus = {
	params: Joi.object().keys({
		orderStatusId: Joi.number().required(),
	}),
};

const getOrderStatuses = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const updateOrderStatus = {
	params: Joi.object().keys({
		orderStatusId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		code: Joi.string(),
		name: Joi.string(),
		description: Joi.string(),
		hex_code: Joi.string(),
		color: Joi.string(),
		sort_order: Joi.number(),
	}),
};

const deleteOrderStatus = {
	params: Joi.object().keys({
		orderStatusId: Joi.number().required(),
	}),
};

module.exports = {
	createOrderStatus,
	getOrderStatus,
	getOrderStatuses,
	updateOrderStatus,
	deleteOrderStatus,
};
