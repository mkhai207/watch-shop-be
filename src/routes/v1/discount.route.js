const express = require('express');
const validate = require('../../middlewares/validate');
const discountValidation = require('../../validations/discount.validation');
const discountController = require('../../controllers/discount.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.post(
		grantAccess('createAny', resources.DISCOUNT),
		validate(discountValidation.createDiscount),
		discountController.createDiscount
	)
	.get(
		grantAccess('readAny', resources.DISCOUNT),
		validate(discountValidation.getDiscounts),
		discountController.getDiscounts
	)
	.get(
		grantAccess('readAny', resources.DISCOUNT),
		validate(discountValidation.getDiscountsValid),
		discountController.getDiscountsValid
	);

router
	.route('/:discountId')
	.put(
		grantAccess('updateAny', resources.DISCOUNT),
		validate(discountValidation.updateDiscount),
		discountController.updateDiscount
	)
	.delete(
		grantAccess('deleteAny', resources.DISCOUNT),
		validate(discountValidation.deleteDiscount),
		discountController.deleteDiscount
	);

module.exports = router;
