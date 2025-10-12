const express = require('express');
const paymentController = require('../../controllers/payment.controller');
const paymentValidation = require('../../validations/payment.validation');
const validate = require('../../middlewares/validate');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/vnpay-payment-return').get(paymentController.handleVNPayReturn);

router
	.route('/:orderId')
	.get(
		grantAccess('readAny', resources.PAYMENT),
		validate(paymentValidation.getPaymentsByOrder),
		paymentController.getPaymentsByOrder
	);

module.exports = router;
