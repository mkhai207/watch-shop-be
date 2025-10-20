const httpStatus = require('http-status');
const recommendationService = require('../services/recommendation.service');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const recordInteraction = catchAsync(async (req, res) => {
	const { user_id, watch_id, interaction_type, session_id } = req.body;

	if (!user_id || !watch_id || !interaction_type) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields');
	}

	const validTypes = ['view', 'cart_add', 'purchase'];
	if (!validTypes.includes(interaction_type)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid interaction type');
	}

	const interaction = await recommendationService.recordInteraction({
		user_id,
		watch_id,
		interaction_type,
		session_id,
	});

	res.status(httpStatus.CREATED).json({
		success: true,
		message: 'Interaction recorded successfully',
		data: interaction,
	});
});

const getRecommendations = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const { limit = 10, type = 'hybrid' } = req.query;

	if (!userId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
	}

	const recommendations = await recommendationService.getRecommendations(
		parseInt(userId),
		parseInt(limit),
		type
	);

	res.status(httpStatus.OK).json({
		success: true,
		message: 'Recommendations retrieved successfully',
		data: recommendations,
	});
});

const getUserInteractions = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const { limit = 20 } = req.query;

	if (!userId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
	}

	const interactions = await recommendationService.getUserInteractions(
		parseInt(userId),
		parseInt(limit)
	);

	res.status(httpStatus.OK).json({
		success: true,
		message: 'User interactions retrieved successfully',
		data: interactions,
	});
});

const getSimilarItems = catchAsync(async (req, res) => {
	const { watchId } = req.params;
	const { limit = 10 } = req.query;

	if (!watchId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Watch ID is required');
	}

	const similarItems = await recommendationService.getSimilarItems(
		parseInt(watchId),
		parseInt(limit)
	);

	res.status(httpStatus.OK).json({
		success: true,
		message: 'Similar items retrieved successfully',
		data: similarItems,
	});
});

const updateUserFeatures = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const features = req.body;

	if (!userId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
	}

	const userFeatures = await recommendationService.updateUserFeatures(
		parseInt(userId),
		features
	);

	res.status(httpStatus.OK).json({
		success: true,
		message: 'User features updated successfully',
		data: userFeatures,
	});
});

const updateItemFeatures = catchAsync(async (req, res) => {
	const { watchId } = req.params;
	const features = req.body;

	if (!watchId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Watch ID is required');
	}

	const itemFeatures = await recommendationService.updateItemFeatures(
		parseInt(watchId),
		features
	);

	res.status(httpStatus.OK).json({
		success: true,
		message: 'Item features updated successfully',
		data: itemFeatures,
	});
});

const getRecommendationStats = catchAsync(async (req, res) => {
	const stats = await recommendationService.getRecommendationStats();

	res.status(httpStatus.OK).json({
		success: true,
		message: 'Recommendation statistics retrieved successfully',
		data: stats,
	});
});

module.exports = {
	recordInteraction,
	getRecommendations,
	getUserInteractions,
	getSimilarItems,
	updateUserFeatures,
	updateItemFeatures,
	getRecommendationStats,
};
