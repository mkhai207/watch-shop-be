const Joi = require('@hapi/joi');

const getPaymentsByOrder = {
	params: Joi.object().keys({
		orderId: Joi.number().required(),
	}),
};

module.exports = {
	getPaymentsByOrder,
};
