const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const createUser = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password),
		username: Joi.string().required(),
		first_name: Joi.string(),
		last_name: Joi.string(),
		phone_number: Joi.string(),
		gender: Joi.string().valid('0', '1', '2'),
		date_of_birth: Joi.string().pattern(/^\d{8}$/),
		address: Joi.string(),
		role_id: Joi.number().required(),
		// ML feature fields
		age_group: Joi.string(),
		gender_preference: Joi.string(),
		price_range_preference: Joi.string(),
		brand_preferences: Joi.array().items(Joi.string()),
		category_preferences: Joi.array().items(Joi.string()),
		style_preferences: Joi.array().items(Joi.string()),
	}),
};

const getUsers = {
	query: Joi.object().keys({
		username: Joi.string(),
		email: Joi.string().email(),
		first_name: Joi.string(),
		last_name: Joi.string(),
		phone_number: Joi.string(),
		gender: Joi.string().valid('0', '1', '2'),
		status: Joi.string().valid('0', '1'),
		role_id: Joi.number(),
		age_group: Joi.string(),
		gender_preference: Joi.string(),
		price_range_preference: Joi.string(),
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getUser = {
	params: Joi.object().keys({
		userId: Joi.string(),
	}),
};

const updateUser = {
	params: Joi.object().keys({
		userId: Joi.required(),
	}),
	body: Joi.object()
		.keys({
			email: Joi.string().email(),
			password: Joi.string().custom(password),
			username: Joi.string(),
			first_name: Joi.string(),
			last_name: Joi.string(),
			phone_number: Joi.string(),
			gender: Joi.string().valid('0', '1', '2'),
			date_of_birth: Joi.string().pattern(/^\d{8}$/),
			address: Joi.string(),
			status: Joi.string().valid('0', '1'),
			role_id: Joi.number(),
			del_flag: Joi.string().valid('0', '1'),
			// ML feature fields
			age_group: Joi.string(),
			gender_preference: Joi.string(),
			price_range_preference: Joi.string(),
			brand_preferences: Joi.array().items(Joi.string()),
			category_preferences: Joi.array().items(Joi.string()),
			style_preferences: Joi.array().items(Joi.string()),
		})
		.min(1),
};

const deleteUser = {
	params: Joi.object().keys({
		userId: Joi.string(),
	}),
};

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
