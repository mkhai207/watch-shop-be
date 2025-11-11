const Joi = require('@hapi/joi');

const revenueYear = {
	body: Joi.object().keys({
		year: Joi.string()
			.pattern(/^\d{4}$/)
			.required()
			.messages({
				'string.pattern.base': 'Year must be in YYYY format',
			}),
	}),
};

module.exports = {
	revenueYear,
};
