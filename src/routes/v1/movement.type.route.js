const express = require('express');
const validate = require('../../middlewares/validate');
const movementValidation = require('../../validations/movement.type.validation');
const movementController = require('../../controllers/movement.type.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		grantAccess('readAny', resources.MOVEMENT_TYPE),
		validate(movementValidation.getMovementTypes),
		movementController.getMovementTypes
	)
	.post(
		grantAccess('createAny', resources.MOVEMENT_TYPE),
		validate(movementValidation.createMovementType),
		movementController.createMovementType
	);

router
	.route('/:movementTypeId')
	.get(
		grantAccess('readAny', resources.MOVEMENT_TYPE),
		validate(movementValidation.getMovementType),
		movementController.getMovementType
	)
	.put(
		grantAccess('updateAny', resources.MOVEMENT_TYPE),
		validate(movementValidation.updateMovementType),
		movementController.updateMovementType
	)
	.delete(
		grantAccess('deleteAny', resources.MOVEMENT_TYPE),
		validate(movementValidation.deleteMovementType),
		movementController.deleteMovementType
	);

module.exports = router;
