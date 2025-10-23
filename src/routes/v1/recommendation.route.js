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

// Get recommendations for a user
router.get(
	'/recommendations/:userId',
	validate(recommendationValidation.getRecommendations),
	recommendationController.getRecommendations
);

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

// Get recommendation statistics
router.get('/stats', recommendationController.getRecommendationStats);

// AI server health check
router.get('/ai/health', recommendationController.getAIHealth);

// AI server statistics
router.get('/ai/stats', recommendationController.getAIStats);

module.exports = router;
