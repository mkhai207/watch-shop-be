const express = require('express');
const validate = require('../../middlewares/validate');
const variantValidation = require('../../validations/watch.variant.validation');
const variantController = require('../../controllers/watch.variant.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		grantAccess('readAny', resources.WATCH_VARIANT),
		validate(variantValidation.getVariants),
		variantController.getVariants
	)
	.post(
		grantAccess('createAny', resources.WATCH_VARIANT),
		validate(variantValidation.createVariant),
		variantController.createVariant
	);

router
	.route('/:watchId')
	.get(
		grantAccess('readAny', resources.WATCH_VARIANT),
		validate(variantValidation.getVariantsByWatchId),
		variantController.getVariantsByWatchId
	);

router
	.route('/:variantId')
	.get(
		grantAccess('readAny', resources.WATCH_VARIANT),
		validate(variantValidation.getVariant),
		variantController.getVariant
	)
	.put(
		grantAccess('updateAny', resources.WATCH_VARIANT),
		validate(variantValidation.updateVariant),
		variantController.updateVariant
	)
	.delete(
		grantAccess('deleteAny', resources.WATCH_VARIANT),
		validate(variantValidation.deleteVariant),
		variantController.deleteVariant
	);

module.exports = router;
