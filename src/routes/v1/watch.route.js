const express = require('express');
const validate = require('../../middlewares/validate');
const watchValidation = require('../../validations/watch.validation');
const watchController = require('../../controllers/watch.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(validate(watchValidation.getWatches), watchController.getWatches)
	.post(
		grantAccess('createAny', resources.WATCH),
		validate(watchValidation.createWatch),
		watchController.createWatch
	);

router
	.route('/:watchId')
	.get(validate(watchValidation.getWatch), watchController.getWatch)
	.put(
		grantAccess('updateAny', resources.WATCH),
		validate(watchValidation.updateWatch),
		watchController.updateWatch
	)
	.delete(
		grantAccess('deleteAny', resources.WATCH),
		validate(watchValidation.deleteWatch),
		watchController.deleteWatch
	);

module.exports = router;
