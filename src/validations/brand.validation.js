const Joi = require('@hapi/joi');

const createBrand = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		logo_url: Joi.string(),
		description: Joi.string(),
	}),
};

const getBrands = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getBrand = {
	params: Joi.object().keys({
		brandId: Joi.number().required(),
	}),
};

const updateBrand = {
	params: Joi.object().keys({
		brandId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string(),
			logo_url: Joi.string(),
			description: Joi.string(),
		})
		.min(1),
};

const deleteBrand = {
	params: Joi.object().keys({
		brandId: Joi.string(),
	}),
};

module.exports = {
	createBrand,
	getBrands,
	getBrand,
	updateBrand,
	deleteBrand,
};
