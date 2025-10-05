const Joi = require('@hapi/joi');

const createCart = {
	body: Joi.object().keys({
		user_id: Joi.string(),
		session_id: Joi.string(),
		status: Joi.string(),
		variant_id: Joi.number(),
		quantity: Joi.number(),
	}),
};

const getCartMe = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const updateCart = {
	body: Joi.object()
		.keys({
			user_id: Joi.string(),
			session_id: Joi.string(),
			status: Joi.string(),
			total_money: Joi.number(),
		})
		.min(1),
};

const deleteCart = {
	params: Joi.object().keys({
		cartId: Joi.string(),
	}),
};

const deleteCarts = {
	body: Joi.object().keys({
		cartItemIds: Joi.array()
			.items(Joi.number().integer().required())
			.min(1)
			.required(),
	}),
};

module.exports = {
	createCart,
	getCartMe,
	updateCart,
	deleteCart,
	deleteCarts,
};
