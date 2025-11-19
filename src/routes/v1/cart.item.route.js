const express = require('express');
const validate = require('../../middlewares/validate');
const cartItemValidation = require('../../validations/cart.item.validation');
const cartItemController = require('../../controllers/cart.item.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/').get(
	// grantAccess('readAny', resources.CART_ITEM),
	validate(cartItemValidation.getCartItems),
	cartItemController.getCartItems
);

router
	.route('/:cartItemId')
	.put(
		// grantAccess('updateAny', resources.CART_ITEM),
		validate(cartItemValidation.updateCartItem),
		cartItemController.updateCartItem
	)
	.delete(
		// grantAccess('deleteAny', resources.CART_ITEM),
		validate(cartItemValidation.deleteCartItem),
		cartItemController.deleteCartItem
	);

module.exports = router;
