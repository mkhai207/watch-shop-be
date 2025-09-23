const Joi = require('@hapi/joi');

const createMovementType = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		code: Joi.string().required(),
		description: Joi.string(),
	}),
};

const getMovementTypes = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getMovementType = {
	params: Joi.object().keys({
		movementTypeId: Joi.number().required(),
	}),
};

const updateMovementType = {
	params: Joi.object().keys({
		movementTypeId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string(),
			code: Joi.string(),
			description: Joi.string(),
		})
		.min(1),
};

const deleteMovementType = {
	params: Joi.object().keys({
		movementTypeId: Joi.string(),
	}),
};

module.exports = {
	deleteMovementType,
	updateMovementType,
	getMovementType,
	getMovementTypes,
	createMovementType,
};
