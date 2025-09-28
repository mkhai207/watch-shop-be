const express = require('express');
const validate = require('../../middlewares/validate');
const orderStatusValidation = require('../../validations/order.status.validation');
const orderStatusController = require('../../controllers/order.status.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		grantAccess('readAny', resources.ORDER_STATUS),
		validate(orderStatusValidation.getOrderStatuses),
		orderStatusController.getOrderStatuses
	)
	.post(
		grantAccess('createAny', resources.ORDER_STATUS),
		validate(orderStatusValidation.createOrderStatus),
		orderStatusController.createOrderStatus
	);

router
	.route('/:orderStatusId')
	.get(
		grantAccess('readAny', resources.ORDER_STATUS),
		validate(orderStatusValidation.getOrderStatus),
		orderStatusController.getOrderStatus
	)
	.put(
		grantAccess('updateAny', resources.ORDER_STATUS),
		validate(orderStatusValidation.updateOrderStatus),
		orderStatusController.updateOrderStatus
	)
	.delete(
		grantAccess('deleteAny', resources.ORDER_STATUS),
		validate(orderStatusValidation.deleteOrderStatus),
		orderStatusController.deleteOrderStatus
	);

module.exports = router;
