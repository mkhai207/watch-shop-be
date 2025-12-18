const Joi = require('@hapi/joi');

const filterValue = Joi.alternatives().try(
	Joi.string(),
	Joi.number(),
	Joi.boolean(),
	Joi.array().items(Joi.string())
);

const createOrderStatus = {
	body: Joi.object().keys({
		code: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string().allow('').optional(),
		hex_code: Joi.string().required(),
		color: Joi.string().allow('').optional(),
		sort_order: Joi.number().optional(),
	}),
};

const getOrderStatus = {
	params: Joi.object().keys({
		orderStatusId: Joi.number().required(),
	}),
};

const getOrderStatuses = {
	query: Joi.object()
		.keys({
			limit: Joi.number().min(1),
			page: Joi.number().min(1),
		})
		.unknown(true)
		.pattern(/^[^.]+(\.[^.]+)?(__\w+)?$/, filterValue),
};

const updateOrderStatus = {
	params: Joi.object().keys({
		orderStatusId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		code: Joi.string().optional(),
		name: Joi.string().optional(),
		description: Joi.string().allow('').optional(),
		hex_code: Joi.string().optional(),
		color: Joi.string().allow('').optional(),
		sort_order: Joi.number().optional(),
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
