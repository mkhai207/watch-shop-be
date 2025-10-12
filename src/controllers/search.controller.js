const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { watchSearchService } = require('../services');

const search = catchAsync(async (req, res) => {
	const watches = await watchSearchService.search(req);
	res.send({ watches });
});

module.exports = {
	search,
};
