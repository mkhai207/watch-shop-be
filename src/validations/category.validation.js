const Joi = require('@hapi/joi');

const filterValue = Joi.alternatives().try(
	Joi.string(),
	Joi.number(),
	Joi.boolean(),
	Joi.array().items(Joi.string())
);

const createCategory = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		image_url: Joi.string(),
		description: Joi.string(),
	}),
};

const getCategorys = {
	query: Joi.object()
		.keys({
			limit: Joi.number().min(1),
			page: Joi.number().min(1),
		})
		.unknown(true)
		.pattern(/^[^.]+(\.[^.]+)?(__\w+)?$/, filterValue),
};

const getCategory = {
	params: Joi.object().keys({
		categoryId: Joi.number().required(),
	}),
};

const updateCategory = {
	params: Joi.object().keys({
		categoryId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string(),
			image_url: Joi.string(),
			description: Joi.string(),
		})
		.min(1),
};

const deleteCategory = {
	params: Joi.object().keys({
		categoryId: Joi.string(),
	}),
};

module.exports = {
	createCategory,
	getCategorys,
	getCategory,
	updateCategory,
	deleteCategory,
};
