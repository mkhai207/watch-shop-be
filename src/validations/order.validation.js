const Joi = require('@hapi/joi');

const createOrder = {
	body: Joi.object().keys({
		user_id: Joi.number(),
		total_amount: Joi.number(),
		discount_code: Joi.string(),
		discount_amount: Joi.number(),
		final_amount: Joi.number(),
		status_id: Joi.number(),
		payment_status: Joi.string(),
		payment_method: Joi.string(),
	}),
};

module.exports = {
	createOrder,
};
