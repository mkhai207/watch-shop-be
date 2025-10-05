const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { discountService } = require('../services');

const createDiscount = catchAsync(async (req, res) => {
	const discount = await discountService.createDiscount(req);
	res.send({ discount });
});

const getDiscounts = catchAsync(async (req, res) => {
	const discounts = await discountService.getDiscounts(req);
	res.send({ discounts });
});

const getDiscountsValid = catchAsync(async (req, res) => {
	const discounts = await discountService.getDiscountsValid(req);
	res.send({ discounts });
});

const updateDiscount = catchAsync(async (req, res) => {
	const discount = await discountService.updateDiscount(req);
	res.send({ success: Boolean(discount) });
});

const deleteDiscount = catchAsync(async (req, res) => {
	const discount = await discountService.deleteDiscount(req);
	res.send({ success: Boolean(discount) });
});

module.exports = {
	createDiscount,
	getDiscounts,
	updateDiscount,
	deleteDiscount,
	getDiscountsValid,
};
