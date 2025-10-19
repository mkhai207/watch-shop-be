const express = require('express');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		grantAccess('readAny', resources.ORDER),
		validate(orderValidation.getOrders),
		orderController.getOrders
	)
	.post(
		grantAccess('createAny', resources.ORDER),
		validate(orderValidation.createOrder),
		orderController.createOrder
	);

router
	.route('/all')
	.get(
		grantAccess('readAny', resources.ORDER),
		validate(orderValidation.getOrders),
		orderController.getAllOrders
	);

router
	.route('/:orderId')
	.get(
		grantAccess('readAny', resources.ORDER),
		validate(orderValidation.getOrder),
		orderController.getOrder
	)
	.delete(
		grantAccess('deleteAny', resources.ORDER),
		validate(orderValidation.deleteOrder),
		orderController.deleteOrder
	);
router
	.route('/:orderId/retry-payment')
	.get(
		grantAccess('updateAny', resources.ORDER),
		validate(orderValidation.retryPayment),
		orderController.retryPayment
	);
router
	.route('/:orderId/change-status')
	.put(
		grantAccess('updateAny', resources.ORDER),
		validate(orderValidation.changeOrderStatus),
		orderController.changeOrderStatus
	);

router
	.route('/:orderId/cancel')
	.put(
		grantAccess('updateAny', resources.ORDER),
		validate(orderValidation.cancelOrder),
		orderController.cancelOrder
	);

module.exports = router;
