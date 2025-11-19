const express = require('express');
const validate = require('../../middlewares/validate');
const addressValidation = require('../../validations/address.validation');
const addressController = require('../../controllers/address.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		// grantAccess('readAny', resources.ADDRESS),
		validate(addressValidation.getAddresses),
		addressController.getAddresses
	)
	.post(
		// grantAccess('createAny', resources.ADDRESS),
		validate(addressValidation.createAddress),
		addressController.createAddress
	);

router.route('/default').get(
	// grantAccess('readAny', resources.ADDRESS),
	addressController.getAddressDefault
);

router
	.route('/:addressId')
	.get(
		// grantAccess('readAny', resources.ADDRESS),
		validate(addressValidation.getAddress),
		addressController.getAddress
	)
	.put(
		// grantAccess('updateAny', resources.ADDRESS),
		validate(addressValidation.updateAddress),
		addressController.updateAddress
	)
	.delete(
		// grantAccess('deleteAny', resources.ADDRESS),
		validate(addressValidation.deleteAddress),
		addressController.deleteAddress
	);

module.exports = router;
