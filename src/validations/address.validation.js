const Joi = require('@hapi/joi');

const createAddress = {
	body: Joi.object().keys({
		city: Joi.string().required(),
		district: Joi.string().required(),
		is_default: Joi.string().required(),
		phone_number: Joi.string().required(),
		recipient_name: Joi.string().required(),
		street: Joi.string().required(),
		ward: Joi.string().required(),
	}),
};

const getAddressesMe = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getAddress = {
	params: Joi.object().keys({
		addressId: Joi.number().required(),
	}),
};

const updateAddress = {
	params: Joi.object().keys({
		addressId: Joi.number().required(),
	}),
	body: Joi.object()
		.keys({
			city: Joi.string(),
			district: Joi.string(),
			is_default: Joi.string(),
			phone_number: Joi.string(),
			recipient_name: Joi.string(),
			street: Joi.string(),
			ward: Joi.string(),
		})
		.min(1),
};

const deleteAddress = {
	params: Joi.object().keys({
		addressId: Joi.string(),
	}),
};

module.exports = {
	createAddress,
	getAddressesMe,
	getAddress,
	updateAddress,
	deleteAddress,
};
