const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { decryptData } = require('../utils/auth');

async function loginUser(req) {
	const { userName, password } = req.body;
	const user = await userService.getUserByUsername(userName);
	const isPasswordMatch = await decryptData(password, user.password);

	if (!user || !isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Invalid email or password'
		);
	}

	delete user.password;

	return user;
}

module.exports = {
	loginUser,
};
