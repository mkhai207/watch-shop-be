const express = require('express');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/');
// .get(
// 	grantAccess('readAny', resources.BRAND),
// 	validate(brandValidation.getBrands),
// 	brandController.getBrands
// )
// .post(
// 	grantAccess('createAny', resources.ORDER),
// 	validate(orderValidation.createOrder),
// 	orderController.createOrder
// );

router.route('/:brandId');

module.exports = router;
