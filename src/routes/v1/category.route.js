const express = require('express');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

router
	.route('/')
	.get(
		grantAccess('readAny', resources.CATEGORY),
		validate(categoryValidation.getCategorys),
		categoryController.getCategorys
	)
	.post(
		grantAccess('createAny', resources.CATEGORY),
		validate(categoryValidation.createCategory),
		categoryController.createCategory
	);

router
	.route('/:categoryId')
	.get(
		grantAccess('readAny', resources.CATEGORY),
		validate(categoryValidation.getCategory),
		categoryController.getCategory
	)
	.put(
		grantAccess('updateAny', resources.CATEGORY),
		validate(categoryValidation.updateCategory),
		categoryController.updateCategory
	)
	.delete(
		grantAccess('deleteAny', resources.CATEGORY),
		validate(categoryValidation.deleteCategory),
		categoryController.deleteCategory
	);

module.exports = router;
