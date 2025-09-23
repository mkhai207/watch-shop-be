const Joi = require('@hapi/joi');

const createWatch = {
	body: Joi.object().keys({
		code: Joi.string().required(),
		name: Joi.string().required(),
		description: Joi.string().required(),
		model: Joi.string(),
		case_material: Joi.string(),
		case_size: Joi.number(),
		strap_size: Joi.number(),
		gender: Joi.string(),
		water_resistance: Joi.string(),
		release_date: Joi.string(),
		sold: Joi.number(),
		base_price: Joi.number().required(),
		rating: Joi.number(),
		status: Joi.string(),
		thumbnail: Joi.string(),
		slider: Joi.string(),
		category_id: Joi.number(),
		brand_id: Joi.number(),
		movement_type_id: Joi.number(),
		variants: Joi.array()
			.min(1)
			.items(
				Joi.object({
					color_id: Joi.number().integer().required(),
					strap_material_id: Joi.number().integer().required(),
					stock_quantity: Joi.number().integer().min(0).default(0),
					price: Joi.number().min(0).required(),
				})
			)
			.required(),
	}),
};

const getWatches = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getWatch = {
	params: Joi.object().keys({
		watchId: Joi.number().required(),
	}),
};

const updateWatch = {
	params: Joi.object().keys({
		watchId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			code: Joi.string(),
			name: Joi.string(),
			description: Joi.string(),
			model: Joi.string(),
			case_material: Joi.string(),
			case_size: Joi.number(),
			strap_size: Joi.number(),
			gender: Joi.string(),
			water_resistance: Joi.string(),
			release_date: Joi.string(),
			sold: Joi.number(),
			base_price: Joi.number(),
			rating: Joi.number(),
			status: Joi.string(),
			thumbnail: Joi.string(),
			slider: Joi.string(),
			category_id: Joi.number(),
			brand_id: Joi.number(),
			movement_type_id: Joi.number(),
			variants: Joi.array()
				.min(1)
				.items(
					Joi.object({
						color_id: Joi.number().integer().required(),
						strap_material_id: Joi.number().integer().required(),
						stock_quantity: Joi.number()
							.integer()
							.min(0)
							.default(0),
						price: Joi.number().min(0).required(),
					})
				),
		})
		.min(1),
};

const deleteWatch = {
	params: Joi.object().keys({
		watchId: Joi.string(),
	}),
};

module.exports = {
	createWatch,
	getWatches,
	getWatch,
	updateWatch,
	deleteWatch,
};
