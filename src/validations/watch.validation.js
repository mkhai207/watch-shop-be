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
		model: Joi.string().required(),
		case_material: Joi.string().allow('').optional(),
		case_size: Joi.number().optional(),
		strap_size: Joi.number().optional(),
		gender: Joi.string().allow('').optional(),
		// ML feature fields
		price_tier: Joi.string().allow('').optional(),
		gender_target: Joi.string().allow('').optional(),
		size_category: Joi.string().allow('').optional(),
		style_tags: Joi.array().items(Joi.string()).optional(),
		material_tags: Joi.array().items(Joi.string()).optional(),
		color_tags: Joi.array().items(Joi.string()).optional(),
		movement_type_tags: Joi.array().items(Joi.string()).optional(),
		water_resistance: Joi.string().allow('').optional(),
		release_date: Joi.string().allow('').optional(),
		sold: Joi.number().optional(),
		base_price: Joi.number().required(),
		rating: Joi.number().optional(),
		status: Joi.boolean().optional(),
		thumbnail: Joi.string().allow('').optional(),
		slider: Joi.string().allow('').optional(),
		category_id: Joi.number().optional(),
		brand_id: Joi.number().optional(),
		movement_type_id: Joi.number().optional(),
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
			code: Joi.string().optional(),
			name: Joi.string().optional(),
			description: Joi.string().optional(),
			model: Joi.string().optional(),
			case_material: Joi.string().allow('').optional(),
			case_size: Joi.number().optional(),
			strap_size: Joi.number().optional(),
			gender: Joi.string().allow('').optional(),
			// ML feature fields
			price_tier: Joi.string().allow('').optional(),
			gender_target: Joi.string().allow('').optional(),
			size_category: Joi.string().allow('').optional(),
			style_tags: Joi.array().items(Joi.string()).optional(),
			material_tags: Joi.array().items(Joi.string()).optional(),
			color_tags: Joi.array().items(Joi.string()).optional(),
			movement_type_tags: Joi.array().items(Joi.string()).optional(),
			water_resistance: Joi.string().allow('').optional(),
			release_date: Joi.string().allow('').optional(),
			sold: Joi.number().optional(),
			base_price: Joi.number().optional(),
			rating: Joi.number().optional(),
			status: Joi.boolean().optional(),
			thumbnail: Joi.string().allow('').optional(),
			slider: Joi.string().allow('').optional(),
			category_id: Joi.number().optional(),
			brand_id: Joi.number().optional(),
			movement_type_id: Joi.number().optional(),
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
