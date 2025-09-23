const express = require('express');
const validate = require('../../middlewares/validate');
const colorValidation = require('../../validations/color.validation');
const colorController = require('../../controllers/color.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		grantAccess('readAny', resources.COLOR),
		validate(colorValidation.getColors),
		colorController.getColors
	)
	.post(
		grantAccess('createAny', resources.COLOR),
		validate(colorValidation.createColor),
		colorController.createColor
	);

router
	.route('/:colorId')
	.get(
		grantAccess('readAny', resources.COLOR),
		validate(colorValidation.getColor),
		colorController.getColor
	)
	.put(
		grantAccess('updateAny', resources.COLOR),
		validate(colorValidation.updateColor),
		colorController.updateColor
	)
	.delete(
		grantAccess('deleteAny', resources.COLOR),
		validate(colorValidation.deleteColor),
		colorController.deleteColor
	);

module.exports = router;
