const Joi = require('@hapi/joi');

const filterValue = Joi.alternatives().try(
	Joi.string(),
	Joi.number(),
	Joi.boolean(),
	Joi.array().items(Joi.string())
);

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
		// ML feature fields
		price_tier: Joi.string(),
		gender_target: Joi.string(),
		size_category: Joi.string(),
		style_tags: Joi.array().items(Joi.string()),
		material_tags: Joi.array().items(Joi.string()),
		color_tags: Joi.array().items(Joi.string()),
		movement_type_tags: Joi.array().items(Joi.string()),
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
				})
			)
			.required(),
	}),
};

const getWatches = {
	query: Joi.object()
		.keys({
			limit: Joi.number().min(1),
			page: Joi.number().min(1),
		})
		.unknown(true)
		.pattern(/^[^.]+(\.[^.]+)?(__\w+)?$/, filterValue),
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
			// ML feature fields
			price_tier: Joi.string(),
			gender_target: Joi.string(),
			size_category: Joi.string(),
			style_tags: Joi.array().items(Joi.string()),
			material_tags: Joi.array().items(Joi.string()),
			color_tags: Joi.array().items(Joi.string()),
			movement_type_tags: Joi.array().items(Joi.string()),
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
