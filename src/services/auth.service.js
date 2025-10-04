const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const db = require('../db/models');
const { decryptData, verifyToken } = require('../utils/auth');
const tokenService = require('./token.service');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

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

async function refresh(req) {
	const token = req.headers.authorization
		? req.headers.authorization.split(' ')[1]
		: req.query.token;

	const payload = await verifyToken(token);

	const tokenRecord = await db.token.findOne({
		where: {
			user_id: Number(payload.userId),
			token_value: token,
			token_type: '0',
			is_active: '1',
		},
		order: [['expires_at', 'DESC']],
	});

	if (!tokenRecord) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Token not found or revoked'
		);
	}

	if (tokenRecord.expires_at <= getCurrentDateYYYYMMDDHHMMSS()) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
	}

	const accessToken = await tokenService.generateAccessToken({
		userId: payload.userId,
		roleId: payload.roleId,
	});

	return accessToken;
}

async function getMe(req) {
	const token = req.headers.authorization
		? req.headers.authorization.split(' ')[1]
		: req.query.token;

	const payload = await verifyToken(token);

	const user = await userService.getUserById(payload.userId);

	return user;
}

module.exports = {
	loginUser,
	refresh,
	getMe,
};
