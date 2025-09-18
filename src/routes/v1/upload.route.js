const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const upload = require('../../config/multer');

const router = express.Router();

router
	.route('/image')
	.post(upload.single('image'), uploadController.uploadImage);

router
	.route('/images')
	.post(upload.array('images', 10), uploadController.uploadImages);

module.exports = router;
