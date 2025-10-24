const express = require('express');
const recommendationController = require('../../controllers/recommendation.controller');
const recommendationValidation = require('../../validations/recommendation.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

// Record user interaction
router.post(
	'/interactions',
	validate(recommendationValidation.recordInteraction),
	recommendationController.recordInteraction
);

// Get recommendation statistics
router.get('/stats', recommendationController.getRecommendationStats);

// AI server health check
router.get('/ai/health', recommendationController.getAIHealth);

// AI server statistics
router.get('/ai/stats', recommendationController.getAIStats);

// Get user interaction history
router.get(
	'/interactions/:userId',
	validate(recommendationValidation.getUserInteractions),
	recommendationController.getUserInteractions
);

// Get similar items
router.get(
	'/similar/:watchId',
	validate(recommendationValidation.getSimilarItems),
	recommendationController.getSimilarItems
);

// Update user features
router.put(
	'/user-features/:userId',
	validate(recommendationValidation.updateUserFeatures),
	recommendationController.updateUserFeatures
);

// Update item features
router.put(
	'/item-features/:watchId',
	validate(recommendationValidation.updateItemFeatures),
	recommendationController.updateItemFeatures
);

// Get public recommendations (no token required)
router.get(
	'/public',
	validate(recommendationValidation.getSmartRecommendations),
	recommendationController.getPublicRecommendations
);

// Get recommendations for current user (requires token)
router.get(
	'/',
	validate(recommendationValidation.getSmartRecommendations),
	recommendationController.getSmartRecommendations
);

// Get recommendations for a specific user (should be after all other GET routes)
router.get(
	'/:userId',
	validate(recommendationValidation.getRecommendations),
	recommendationController.getRecommendations
);

module.exports = router;
