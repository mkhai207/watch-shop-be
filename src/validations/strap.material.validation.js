const Joi = require('@hapi/joi');

const createStrapMaterial = {
	body: Joi.object().keys({
		code: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string(),
		extra_money: Joi.number().required(),
	}),
};

const getStrapMaterials = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
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
			code: Joi.string(),
			name: Joi.string(),
			description: Joi.string(),
			extra_money: Joi.number(),
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
