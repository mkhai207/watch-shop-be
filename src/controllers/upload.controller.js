const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const uploadImage = catchAsync(async (req, res) => {
	const uploadedImage = await uploadService.uploadImage(req.file);
	res.send({ uploadedImage });
});

const uploadImages = catchAsync(async (req, res) => {
	const uploadedImages = await uploadService.uploadMultiple(req.files);
	res.send({ uploadedImages });
});

module.exports = {
	uploadImage,
	uploadImages,
};
