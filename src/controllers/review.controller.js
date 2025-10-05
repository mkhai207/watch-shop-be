const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');

const createReview = catchAsync(async (req, res) => {
	const review = await reviewService.createReview(req);
	res.send({ review });
});

const getReviews = catchAsync(async (req, res) => {
	const reviews = await reviewService.getReviews(req);
	res.send({ reviews });
});

const updateReview = catchAsync(async (req, res) => {
	const review = await reviewService.updateReview(req);
	res.send({ success: Boolean(review) });
});

const deleteReview = catchAsync(async (req, res) => {
	const review = await reviewService.deleteReview(req);
	res.send({ success: Boolean(review) });
});

module.exports = {
	createReview,
	getReviews,
	updateReview,
	deleteReview,
};
