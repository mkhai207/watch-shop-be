const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { discountService } = require('../services');

const getDiscount = catchAsync(async (req, res) => {
	const discount = await discountService.getDiscountById(
		req.params.discountId
	);
	if (!discount) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found');
	}
	res.send({ discount });
});

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

const checkApplyDiscount = catchAsync(async (req, res) => {
	const discountCheck = await discountService.checkApplyDiscount(req);
	res.send(discountCheck);
});

module.exports = {
	createDiscount,
	getDiscounts,
	updateDiscount,
	deleteDiscount,
	getDiscountsValid,
	checkApplyDiscount,
	getDiscount,
};
