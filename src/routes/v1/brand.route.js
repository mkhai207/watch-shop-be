const express = require('express');
const validate = require('../../middlewares/validate');
const brandValidation = require('../../validations/brand.validation');
const brandController = require('../../controllers/brand.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(validate(brandValidation.getBrands), brandController.getBrands)
	.post(
		grantAccess('createAny', resources.BRAND),
		validate(brandValidation.createBrand),
		brandController.createBrand
	);

router
	.route('/:brandId')
	.get(validate(brandValidation.getBrand), brandController.getBrand)
	.put(
		grantAccess('updateAny', resources.BRAND),
		validate(brandValidation.updateBrand),
		brandController.updateBrand
	)
	.delete(
		grantAccess('deleteAny', resources.BRAND),
		validate(brandValidation.deleteBrand),
		brandController.deleteBrand
	);

module.exports = router;
