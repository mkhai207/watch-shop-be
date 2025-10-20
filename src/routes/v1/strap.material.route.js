const express = require('express');
const validate = require('../../middlewares/validate');
const strapMaterialValidation = require('../../validations/strap.material.validation');
const strapMaterialController = require('../../controllers/strap.material.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		validate(strapMaterialValidation.getStrapMaterials),
		strapMaterialController.getStrapMaterials
	)
	.post(
		grantAccess('createAny', resources.STRAP_MATERIAL),
		validate(strapMaterialValidation.createStrapMaterial),
		strapMaterialController.createStrapMaterial
	);

router
	.route('/:strapMaterialId')
	.get(
		validate(strapMaterialValidation.getStrapMaterial),
		strapMaterialController.getStrapMaterial
	)
	.put(
		grantAccess('updateAny', resources.STRAP_MATERIAL),
		validate(strapMaterialValidation.updateStrapMaterial),
		strapMaterialController.updateStrapMaterial
	)
	.delete(
		grantAccess('deleteAny', resources.STRAP_MATERIAL),
		validate(strapMaterialValidation.deleteStrapMaterial),
		strapMaterialController.deleteStrapMaterial
	);

module.exports = router;
