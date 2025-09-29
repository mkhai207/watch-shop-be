const express = require('express');
const paymentController = require('../../controllers/payment.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/vnpay-payment-return').get(paymentController.handleVNPayReturn);

module.exports = router;
