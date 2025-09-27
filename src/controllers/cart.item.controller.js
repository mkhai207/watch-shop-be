const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartItemService } = require('../services');

const updateCartItem = catchAsync(async (req, res) => {
	const cartItem = await cartItemService.updateCartItem(
		req.params.cartItemId,
		req.body,
		req.user.userId || 0
	);

	res.send({ cartItem });
});

const deleteCartItem = catchAsync(async (req, res) => {
	const cartItem = await cartItemService.getCartItem(req.params.cartItemId);
	if (!cartItem) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Cart item not found');
	}
	const deletedCartItem = await cartItemService.deleteCartItem(req);
	res.send({ success: Boolean(deletedCartItem) });
});

const getCartItems = catchAsync(async (req, res) => {
	const cartItems = await cartItemService.getCartItems(req);

	res.send({ cartItems });
});
module.exports = {
	updateCartItem,
	deleteCartItem,
	getCartItems,
};
