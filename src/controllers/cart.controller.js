const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');

const createCart = catchAsync(async (req, res) => {
	const cart = await cartService.createCart(req);
	res.send({ cart });
});

const getCartMe = catchAsync(async (req, res) => {
	const cart = await cartService.getCartMe(req);

	if (!cart) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
	}

	res.send({ cart });
});

const updateCart = catchAsync(async (req, res) => {
	const cart = await cartService.updateCart(req);

	if (!cart) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
	}

	res.send({ cart });
});

const deleteCart = catchAsync(async (req, res) => {
	const cart = await cartService.getCartMe(req);
	if (!cart) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
	}
	await cartService.deleteCartMe(req);
	res.send({ success: true });
});
module.exports = {
	createCart,
	getCartMe,
	updateCart,
	deleteCart,
};
