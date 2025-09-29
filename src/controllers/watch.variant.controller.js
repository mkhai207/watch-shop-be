const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { watchVariantService } = require('../services');

const getVariantsByWatchId = catchAsync(async (req, res) => {
	const variants = await watchVariantService.getVariantsByWatchId(
		req.params.watchId
	);

	res.send({ variants });
});

const createVariant = catchAsync(async (req, res) => {
	const variant = await watchVariantService.createVariant(req);
	res.send({ variant });
});

const getVariants = catchAsync(async (req, res) => {
	const variants = await watchVariantService.getVariants(req);
	res.send({ variants });
});

const getVariant = catchAsync(async (req, res) => {
	const variant = await watchVariantService.getVariantById(
		req.params.variantId
	);

	if (!variant) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
	}

	res.send({ variant });
});

const updateVariant = catchAsync(async (req, res) => {
	const variant = await watchVariantService.updateVariant(req);

	if (!variant) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
	}

	res.send({ variant });
});

const deleteVariant = catchAsync(async (req, res) => {
	const variant = await watchVariantService.getVariantById(
		req.params.variantId
	);
	if (!variant) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
	}
	await watchVariantService.deleteVariantById(req);
	res.send({ success: true });
});
module.exports = {
	createVariant,
	getVariants,
	getVariant,
	updateVariant,
	deleteVariant,
	getVariantsByWatchId,
};
