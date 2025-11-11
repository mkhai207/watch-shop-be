const express = require('express');
const validate = require('../../middlewares/validate');
const reportValidation = require('../../validations/report.validation');
const reportController = require('../../controllers/report.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/revenue')
	.get(validate(reportValidation.revenue), reportController.revenue);

router
	.route('/revenue-year')
	.post(
		grantAccess('readAny', resources.REPORT),
		validate(reportValidation.revenueYear),
		reportController.revenueYear
	);

module.exports = router;
