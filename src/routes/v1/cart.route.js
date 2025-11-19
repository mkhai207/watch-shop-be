const express = require('express');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.post(
		// grantAccess('createAny', resources.CART),
		validate(cartValidation.createCart),
		cartController.createCart
	)
	.get(
		// grantAccess('readAny', resources.CART),
		validate(cartValidation.getCartMe),
		cartController.getCartMe
	)
	.put(
		// grantAccess('updateAny', resources.CART),
		validate(cartValidation.updateCart),
		cartController.updateCart
	)
	.delete(
		// grantAccess('deleteAny', resources.CART),
		validate(cartValidation.deleteCarts),
		cartController.deleteCarts
	);

router.route('/:cartId');

module.exports = router;
