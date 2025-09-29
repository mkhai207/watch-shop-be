const Joi = require('@hapi/joi');

const updateCartItem = {
	params: Joi.object().keys({
		cartItemId: Joi.number(),
	}),
	body: Joi.object().keys({
		quantity: Joi.number().min(1),
	}),
};

const deleteCartItem = {
	params: Joi.object().keys({
		cartItemId: Joi.number(),
	}),
};

const getCartItems = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};
module.exports = {
	updateCartItem,
	deleteCartItem,
	getCartItems,
};
