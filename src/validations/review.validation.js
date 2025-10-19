const Joi = require('@hapi/joi');

const createReview = {
	body: Joi.object().keys({
		rating: Joi.number().required(),
		comment: Joi.string().required(),
		image_url: Joi.string(),
		user_id: Joi.number().required(),
		order_id: Joi.number().required(),
	}),
};

const updateReview = {
	body: Joi.object().keys({
		rating: Joi.number(),
		comment: Joi.string(),
		image_url: Joi.string(),
	}),
};

const getReviews = {
	params: Joi.object().keys({
		watchId: Joi.number().required(),
	}),
};

const deleteReview = {
	params: Joi.object().keys({
		reviewId: Joi.number().required(),
	}),
};

module.exports = {
	createReview,
	updateReview,
	getReviews,
	deleteReview,
};
