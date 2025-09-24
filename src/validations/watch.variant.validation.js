const Joi = require('@hapi/joi');

const createVariant = {
	body: Joi.object().keys({
		watch_id: Joi.number().required(),
		color_id: Joi.number().required(),
		strap_material_id: Joi.number().required(),
		stock_quantity: Joi.number().required(),
		price: Joi.number().required(),
	}),
};

const getVariants = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getVariant = {
	params: Joi.object().keys({
		variantId: Joi.number().required(),
	}),
};

const updateVariant = {
	params: Joi.object().keys({
		variantId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			watch_id: Joi.number(),
			color_id: Joi.number(),
			strap_material_id: Joi.number(),
			stock_quantity: Joi.number(),
			price: Joi.number(),
		})
		.min(1),
};

const deleteVariant = {
	params: Joi.object().keys({
		variantId: Joi.string(),
	}),
};

module.exports = {
	createVariant,
	getVariants,
	getVariant,
	updateVariant,
	deleteVariant,
};
