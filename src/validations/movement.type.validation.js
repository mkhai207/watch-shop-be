const Joi = require('@hapi/joi');

const filterValue = Joi.alternatives().try(
	Joi.string(),
	Joi.number(),
	Joi.boolean(),
	Joi.array().items(Joi.string())
);

const createMovementType = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		code: Joi.string().required(),
		description: Joi.string().allow('').optional(),
	}),
};

const getMovementTypes = {
	query: Joi.object()
		.keys({
			limit: Joi.number().min(1),
			page: Joi.number().min(1),
		})
		.unknown(true)
		.pattern(/^[^.]+(\.[^.]+)?(__\w+)?$/, filterValue),
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
			name: Joi.string().optional(),
			code: Joi.string().optional(),
			description: Joi.string().allow('').optional(),
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
