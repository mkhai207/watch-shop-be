const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const filterValue = Joi.alternatives().try(
	Joi.string(),
	Joi.number(),
	Joi.boolean(),
	Joi.array().items(Joi.string())
);

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
		age_group: Joi.string().optional(),
		gender_preference: Joi.string().optional(),
		price_range_preference: Joi.string().optional(),
		brand_preferences: Joi.array().items(Joi.string()).optional(),
		category_preferences: Joi.array().items(Joi.string()).optional(),
		style_preferences: Joi.array().items(Joi.string()).optional(),
	}),
};

const getUsers = {
	// query: Joi.object().keys({
	// 	username: Joi.string(),
	// 	email: Joi.string().email(),
	// 	first_name: Joi.string(),
	// 	last_name: Joi.string(),
	// 	phone_number: Joi.string(),
	// 	gender: Joi.string().valid('0', '1', '2'),
	// 	status: Joi.string().valid('0', '1'),
	// 	role_id: Joi.number(),
	// 	age_group: Joi.string(),
	// 	gender_preference: Joi.string(),
	// 	price_range_preference: Joi.string(),
	// 	limit: Joi.number().min(1),
	// 	page: Joi.number().min(1),
	// }),
	query: Joi.object()
		.keys({
			limit: Joi.number().min(1),
			page: Joi.number().min(1),
		})
		.unknown(true)
		.pattern(/^[^.]+(\.[^.]+)?(__\w+)?$/, filterValue),
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
			email: Joi.string().optional().email(),
			password: Joi.string().optional().custom(password),
			username: Joi.string().optional(),
			first_name: Joi.string().optional(),
			last_name: Joi.string().optional(),
			phone_number: Joi.string().optional(),
			gender: Joi.string().valid('0', '1', '2').optional(),
			date_of_birth: Joi.string()
				.pattern(/^\d{8}$/)
				.optional(),
			address: Joi.string().optional(),
			status: Joi.string().valid('0', '1').optional(),
			role_id: Joi.number().optional(),
			del_flag: Joi.string().valid('0', '1').optional(),
			// ML feature fields
			age_group: Joi.string().optional(),
			gender_preference: Joi.string().optional(),
			price_range_preference: Joi.string().optional(),
			brand_preferences: Joi.array().items(Joi.string()).optional(),
			category_preferences: Joi.array().items(Joi.string()).optional(),
			style_preferences: Joi.array().items(Joi.string()).optional(),
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
