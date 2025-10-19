const express = require('express');
const validate = require('../../middlewares/validate');
const orderStatusHistoryValidation = require('../../validations/order.status.history.validation');
const orderStatusHistoryController = require('../../controllers/order.status.history.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/');

router
	.route('/:orderId')
	.get(
		grantAccess('readAny', resources.ORDER_STATUS_HISTORY),
		validate(orderStatusHistoryValidation.getOrderStatusHistorys),
		orderStatusHistoryController.getOrderStatusHistorys
	);

module.exports = router;
