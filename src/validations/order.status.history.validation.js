const Joi = require('@hapi/joi');

const getOrderStatusHistorys = {
	params: Joi.object().keys({
		orderId: Joi.number().required(),
	}),
};

module.exports = {
	getOrderStatusHistorys,
};
