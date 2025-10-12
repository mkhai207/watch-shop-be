const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { watchService } = require('../services');
const watchSyncService = require('../services/watch.sync.service');

const createWatch = catchAsync(async (req, res) => {
	const watch = await watchService.createWatch(req);

	if (!watch) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Create watch failed');
	}

	await watchSyncService.syncOneWatch(watch.id);

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

	await watchSyncService.syncOneWatch(watch.id);

	res.send({ watch });
});

const deleteWatch = catchAsync(async (req, res) => {
	const watch = await watchService.getWatchById(req.params.watchId);
	if (!watch) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Watch not found');
	}
	const deletedWatch = await watchService.deleteWatchById(req);
	if (deletedWatch) await watchSyncService.syncDeleteOneWatch(watch.id);
	res.send({ success: true });
});
module.exports = {
	createWatch,
	getWatches,
	getWatch,
	updateWatch,
	deleteWatch,
};
