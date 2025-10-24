const Joi = require('@hapi/joi');

const recordInteraction = {
	body: Joi.object().keys({
		user_id: Joi.number().integer().required(),
		watch_id: Joi.number().integer().required(),
		interaction_type: Joi.string()
			.valid('view', 'cart_add', 'purchase')
			.required(),
		session_id: Joi.string().optional(),
	}),
};

const getRecommendations = {
	params: Joi.object().keys({
		userId: Joi.number().integer().required(),
	}),
	query: Joi.object().keys({
		limit: Joi.number().integer().min(1).max(50).optional(),
		type: Joi.string()
			.valid('collaborative', 'content_based', 'hybrid')
			.optional(),
	}),
};

const getSmartRecommendations = {
	query: Joi.object().keys({
		limit: Joi.number().integer().min(1).max(50).optional(),
		exclude_interactions: Joi.boolean().optional(),
		profile: Joi.string()
			.valid(
				'general',
				'young_male',
				'young_female',
				'mature_male',
				'mature_female',
				'luxury'
			)
			.optional(),
	}),
};

const getUserInteractions = {
	params: Joi.object().keys({
		userId: Joi.number().integer().required(),
	}),
	query: Joi.object().keys({
		limit: Joi.number().integer().min(1).max(100).optional(),
	}),
};

const getSimilarItems = {
	params: Joi.object().keys({
		watchId: Joi.number().integer().required(),
	}),
	query: Joi.object().keys({
		limit: Joi.number().integer().min(1).max(50).optional(),
	}),
};

const updateUserFeatures = {
	params: Joi.object().keys({
		userId: Joi.number().integer().required(),
	}),
	body: Joi.object().keys({
		age_group: Joi.string()
			.valid('18-25', '26-35', '36-45', '46+')
			.optional(),
		gender_preference: Joi.string().valid('M', 'F', 'U').optional(),
		price_range_preference: Joi.string()
			.valid('budget', 'mid', 'premium', 'luxury')
			.optional(),
		brand_preferences: Joi.alternatives()
			.try(Joi.array(), Joi.string())
			.optional(),
		category_preferences: Joi.alternatives()
			.try(Joi.array(), Joi.string())
			.optional(),
		style_preferences: Joi.alternatives()
			.try(Joi.array(), Joi.string())
			.optional(),
	}),
};

const updateItemFeatures = {
	params: Joi.object().keys({
		watchId: Joi.number().integer().required(),
	}),
	body: Joi.object().keys({
		price_tier: Joi.string()
			.valid('budget', 'mid', 'premium', 'luxury')
			.optional(),
		gender_target: Joi.string().valid('M', 'F', 'U').optional(),
		style_tags: Joi.alternatives()
			.try(Joi.array(), Joi.string())
			.optional(),
		material_tags: Joi.alternatives()
			.try(Joi.array(), Joi.string())
			.optional(),
		color_tags: Joi.alternatives()
			.try(Joi.array(), Joi.string())
			.optional(),
		size_category: Joi.string()
			.valid('small', 'medium', 'large')
			.optional(),
		movement_type_tags: Joi.alternatives()
			.try(Joi.array(), Joi.string())
			.optional(),
	}),
};

module.exports = {
	recordInteraction,
	getRecommendations,
	getSmartRecommendations,
	getUserInteractions,
	getSimilarItems,
	updateUserFeatures,
	updateItemFeatures,
};
