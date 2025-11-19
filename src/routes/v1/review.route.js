const express = require('express');
const validate = require('../../middlewares/validate');
const reviewValidation = require('../../validations/review.validation');
const reviewController = require('../../controllers/review.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router.route('/').post(
	// grantAccess('createAny', resources.REVIEW),
	validate(reviewValidation.createReview),
	reviewController.createReview
);

router
	.route('/:watchId')
	.get(validate(reviewValidation.getReviews), reviewController.getReviews);

router
	.route('/:reviewId')
	.put(
		// grantAccess('updateAny', resources.REVIEW),
		validate(reviewValidation.updateReview),
		reviewController.updateReview
	)
	.delete(
		// grantAccess('deleteAny', resources.REVIEW),
		validate(reviewValidation.deleteReview),
		reviewController.deleteReview
	);

module.exports = router;
