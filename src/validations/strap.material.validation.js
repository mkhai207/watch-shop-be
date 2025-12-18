const Joi = require('@hapi/joi');

const filterValue = Joi.alternatives().try(
	Joi.string(),
	Joi.number(),
	Joi.boolean(),
	Joi.array().items(Joi.string())
);

const createStrapMaterial = {
	body: Joi.object().keys({
		code: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string().allow('').optional(),
		extra_money: Joi.number().required(),
	}),
};

const getStrapMaterials = {
	query: Joi.object()
		.keys({
			limit: Joi.number().min(1),
			page: Joi.number().min(1),
		})
		.unknown(true)
		.pattern(/^[^.]+(\.[^.]+)?(__\w+)?$/, filterValue),
};

const getStrapMaterial = {
	params: Joi.object().keys({
		strapMaterialId: Joi.number().required(),
	}),
};

const updateStrapMaterial = {
	params: Joi.object().keys({
		strapMaterialId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			code: Joi.string().optional(),
			name: Joi.string().optional(),
			description: Joi.string().allow('').optional(),
			extra_money: Joi.number().optional(),
		})
		.min(1),
};

const deleteStrapMaterial = {
	params: Joi.object().keys({
		strapMaterialId: Joi.string(),
	}),
};

module.exports = {
	createStrapMaterial,
	getStrapMaterials,
	getStrapMaterial,
	updateStrapMaterial,
	deleteStrapMaterial,
};
