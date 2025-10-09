const express = require('express');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.route('/vnpay-payment-return').get(paymentController.handleVNPayReturn);

module.exports = router;
