const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { movementTypeService } = require('../services');

const createMovementType = catchAsync(async (req, res) => {
	const movementType = await movementTypeService.createMovementType(req);
	res.send({ movementType });
});

const getMovementTypes = catchAsync(async (req, res) => {
	const movementTypes = await movementTypeService.getMovementTypes(req);
	res.send({ movementTypes });
});

const getMovementType = catchAsync(async (req, res) => {
	const movementType = await movementTypeService.getMovementTypeById(
		req.params.movementTypeId
	);

	if (!movementType) {
		throw new ApiError(httpStatus.NOT_FOUND, 'MovementType not found');
	}

	res.send({ movementType });
});

const updateMovementType = catchAsync(async (req, res) => {
	const movementType = await movementTypeService.updateMovementType(req);

	if (!movementType) {
		throw new ApiError(httpStatus.NOT_FOUND, 'MovementType not found');
	}

	res.send({ movementType });
});

const deleteMovementType = catchAsync(async (req, res) => {
	const movementType = await movementTypeService.getMovementTypeById(
		req.params.movementTypeId
	);
	if (!movementType) {
		throw new ApiError(httpStatus.NOT_FOUND, 'MovementType not found');
	}
	await movementTypeService.deleteMovementType(req);
	res.send({ success: true });
});
module.exports = {
	deleteMovementType,
	updateMovementType,
	getMovementType,
	getMovementTypes,
	createMovementType,
};
