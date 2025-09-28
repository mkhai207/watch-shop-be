const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { brandService } = require('../services');

const createBrand = catchAsync(async (req, res) => {
	const brand = await brandService.createBrand(req);
	res.send({ brand });
});

const getBrands = catchAsync(async (req, res) => {
	const brands = await brandService.getBrands(req);
	res.send({ brands });
});

const getBrand = catchAsync(async (req, res) => {
	const brand = await brandService.getBrandById(req.params.brandId);

	if (!brand) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
	}

	res.send({ brand });
});

const updateBrand = catchAsync(async (req, res) => {
	const brand = await brandService.updateBrand(req);

	if (!brand) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
	}

	res.send({ brand });
});

const deleteBrand = catchAsync(async (req, res) => {
	const brand = await brandService.getBrandById(req.params.brandId);
	if (!brand || brand.del_flag == '1') {
		throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
	}
	await brandService.deleteBrandById(req);
	res.send({ success: true });
});
module.exports = {
	createBrand,
	getBrands,
	getBrand,
	updateBrand,
	deleteBrand,
};
