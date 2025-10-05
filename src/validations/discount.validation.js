const Joi = require('@hapi/joi');

const createDiscount = {
	body: Joi.object().keys({
		code: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string(),
		min_order_value: Joi.number(),
		max_discount_amount: Joi.number(),
		discount_type: Joi.string().valid('0', '1').required(),
		discount_value: Joi.number().required(),
		effective_date: Joi.string().length(14).required(),
		valid_until: Joi.string().length(14),
	}),
};

const updateDiscount = {
	body: Joi.object().keys({
		name: Joi.string(),
		description: Joi.string(),
		min_order_value: Joi.number(),
		max_discount_amount: Joi.number(),
		discount_type: Joi.string().valid('0', '1'),
		discount_value: Joi.number(),
		effective_date: Joi.string().length(14),
		valid_until: Joi.string().length(14),
	}),
};

const getDiscounts = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const deleteDiscount = {
	params: Joi.object().keys({
		discountId: Joi.number().required(),
	}),
};

const getDiscountsValid = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

module.exports = {
	createDiscount,
	updateDiscount,
	getDiscounts,
	deleteDiscount,
	getDiscountsValid,
};
