const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { colorService } = require('../services');

const createColor = catchAsync(async (req, res) => {
	const color = await colorService.createColor(req);
	res.send({ color });
});

const getColors = catchAsync(async (req, res) => {
	const colors = await colorService.getColors(req);
	res.send({ colors });
});

const getColor = catchAsync(async (req, res) => {
	const color = await colorService.getColorById(req.params.colorId);

	if (!color) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
	}

	res.send({ color });
});

const updateColor = catchAsync(async (req, res) => {
	const color = await colorService.updateColor(req);

	if (!color) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
	}

	res.send({ color });
});

const deleteColor = catchAsync(async (req, res) => {
	const brand = await colorService.getColorById(req.params.colorId);
	if (!brand) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
	}
	await colorService.deleteColorById(req);
	res.send({ success: true });
});
module.exports = {
	createColor,
	getColors,
	getColor,
	updateColor,
	deleteColor,
};
