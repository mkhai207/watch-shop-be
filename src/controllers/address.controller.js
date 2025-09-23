const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { addressService } = require('../services');

const createAddress = catchAsync(async (req, res) => {
	const address = await addressService.createAddress(req);
	res.send({ address });
});

const getAddresses = catchAsync(async (req, res) => {
	const addresses = await addressService.getAddresses(req);
	res.send({ addresses });
});

const getAddress = catchAsync(async (req, res) => {
	const address = await addressService.getAddressById(req.params.addressId);

	if (!address) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
	}

	res.send({ address });
});

const getAddressDefault = catchAsync(async (req, res) => {
	const address = await addressService.getAddressDefault(req);

	if (!address) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
	}

	res.send({ address });
});

const updateAddress = catchAsync(async (req, res) => {
	const address = await addressService.updateAddress(req);

	if (!address) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
	}

	res.send({ address });
});

const deleteAddress = catchAsync(async (req, res) => {
	const address = await addressService.getAddressById(req.params.addressId);
	if (!address) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
	}

	if (address.is_default === '1')
		throw new ApiError(
			httpStatus.FORBIDDEN,
			"Can't delete address default"
		);
	await addressService.deleteAddressById(req);
	res.send({ success: true });
});
module.exports = {
	createAddress,
	getAddresses,
	getAddress,
	getAddressDefault,
	updateAddress,
	deleteAddress,
};
