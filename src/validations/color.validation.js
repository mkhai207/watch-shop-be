const Joi = require('@hapi/joi');

const createColor = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		hex_code: Joi.string().required(),
	}),
};

const getColors = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getColor = {
	params: Joi.object().keys({
		colorId: Joi.number().required(),
	}),
};

const updateColor = {
	params: Joi.object().keys({
		colorId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string(),
			hex_code: Joi.string(),
		})
		.min(1),
};

const deleteColor = {
	params: Joi.object().keys({
		colorId: Joi.string(),
	}),
};

module.exports = {
	createColor,
	getColors,
	getColor,
	updateColor,
	deleteColor,
};
