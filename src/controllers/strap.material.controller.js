const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { strapMaterialService } = require('../services');

const createStrapMaterial = catchAsync(async (req, res) => {
	const strapMaterial = await strapMaterialService.createStrapMaterial(req);
	res.send({ strapMaterial });
});

const getStrapMaterials = catchAsync(async (req, res) => {
	const strapMaterials = await strapMaterialService.getStrapMaterials(req);
	res.send({ strapMaterials });
});

const getStrapMaterial = catchAsync(async (req, res) => {
	const strapMaterial = await strapMaterialService.getStrapMaterialById(
		req.params.strapMaterialId
	);

	if (!strapMaterial) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Strap Material not found');
	}

	res.send({ strapMaterial });
});

const updateStrapMaterial = catchAsync(async (req, res) => {
	const strapMaterial = await strapMaterialService.updateStrapMaterial(req);

	if (!strapMaterial) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Strap material not found');
	}

	res.send({ strapMaterial });
});

const deleteStrapMaterial = catchAsync(async (req, res) => {
	const strapMaterial = await strapMaterialService.getStrapMaterialById(
		req.params.strapMaterialId
	);
	if (!strapMaterial) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Strap material not found');
	}
	await strapMaterialService.deleteStrapMaterialById(req);
	res.send({ success: true });
});
module.exports = {
	getStrapMaterials,
	createStrapMaterial,
	getStrapMaterial,
	updateStrapMaterial,
	deleteStrapMaterial,
};
