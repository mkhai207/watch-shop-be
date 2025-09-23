const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { watchService } = require('../services');

const createWatch = catchAsync(async (req, res) => {
	const watch = await watchService.createWatch(req);
	res.send({ watch });
});

const getWatches = catchAsync(async (req, res) => {
	const watches = await watchService.getWatches(req);
	res.send({ watches });
});

const getWatch = catchAsync(async (req, res) => {
	const watch = await watchService.getWatchById(req.params.watchId);

	if (!watch) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Watch not found');
	}

	res.send({ watch });
});

const updateWatch = catchAsync(async (req, res) => {
	const watch = await watchService.updateWatch(req);

	if (!watch) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Watch not found');
	}

	res.send({ watch });
});

const deleteWatch = catchAsync(async (req, res) => {
	const watch = await watchService.getWatchById(req.params.watchId);
	if (!watch) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Watch not found');
	}
	await watchService.deleteWatchById(req);
	res.send({ success: true });
});
module.exports = {
	createWatch,
	getWatches,
	getWatch,
	updateWatch,
	deleteWatch,
};
