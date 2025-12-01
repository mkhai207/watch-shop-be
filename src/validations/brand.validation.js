const Joi = require('@hapi/joi');

const filterValue = Joi.alternatives().try(
	Joi.string(),
	Joi.number(),
	Joi.boolean(),
	Joi.array().items(Joi.string())
);

const createBrand = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		logo_url: Joi.string(),
		description: Joi.string(),
	}),
};

const getBrands = {
	query: Joi.object()
		.keys({
			limit: Joi.number().min(1),
			page: Joi.number().min(1),
		})
		.unknown(true)
		.pattern(/^[^.]+(\.[^.]+)?(__\w+)?$/, filterValue),
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
