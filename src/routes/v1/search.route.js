const express = require('express');
const validate = require('../../middlewares/validate');
const { searchValidation } = require('../../validations');
const { searchController } = require('../../controllers');

const router = express.Router();

router
	.route('/')
	.get(validate(searchValidation.search), searchController.search);

module.exports = router;
