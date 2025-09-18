const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
	const category = await categoryService.createCategory(req);
	res.send({ category });
});

const getCategorys = catchAsync(async (req, res) => {
	const categorys = await categoryService.getCategorys(req);
	res.send({ categorys });
});

const getCategory = catchAsync(async (req, res) => {
	const category = await categoryService.getCategoryById(
		req.params.categoryId
	);

	if (!category) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
	}

	res.send({ category });
});

const updateCategory = catchAsync(async (req, res) => {
	const category = await categoryService.updateCategory(req);

	if (!category) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
	}

	res.send({ category });
});

const deleteCategory = catchAsync(async (req, res) => {
	const brand = await categoryService.getCategoryById(req.params.categoryId);
	if (!brand || brand.del_flag == '1') {
		throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
	}
	await categoryService.deleteCategoryById(req);
	res.send({ success: true });
});
module.exports = {
	createCategory,
	getCategorys,
	getCategory,
	updateCategory,
	deleteCategory,
};
