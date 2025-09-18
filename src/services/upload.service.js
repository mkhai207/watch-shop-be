const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

async function uploadImage(file) {
	if (!file) throw new ApiError(httpStatus.NOT_FOUND, 'No image be found');
	return {
		url: file.path,
		filename: file.filename,
	};
}

const uploadMultiple = async (files) => {
	if (!files || files.length === 0)
		throw new ApiError(httpStatus.NOT_FOUND, 'No image be found');
	return files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
};
module.exports = {
	uploadImage,
	uploadMultiple,
};
