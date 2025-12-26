const httpStatus = require('http-status');
const { Op } = require('sequelize');
const config = require('../config/config');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { generateToken, generateExpires } = require('../utils/auth');
const db = require('../db/models');
const {
	unixToYYYYMMDDHHMMSS,
	getCurrentDateYYYYMMDDHHMMSS,
} = require('../utils/datetime');

async function generateResetPasswordToken(email) {
	const user = await userService.getUserByEmail(email);
	if (!user || !user.id) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'User not found with this email'
		);
	}

	const expiresMs = generateExpires(
		config.jwt.resetPasswordExpirationMinutes / 60
	);
	const resetPasswordToken = generateToken({ id: user.id }, expiresMs);

	return {
		token: resetPasswordToken,
		expiresAt: expiresMs,
	};
}

async function generateAuthTokens({ userId, roleId }) {
	const refreshTokenExpires = generateExpires(
		config.jwt.refreshExpirationDays * 24
	);

	const refreshToken = generateToken({ userId, roleId }, refreshTokenExpires);

	const accessTokenExpires = generateExpires(
		config.jwt.accessExpirationMinutes / 60
	);
	const accessToken = generateToken({ userId, roleId }, accessTokenExpires);

	return {
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires,
		},
		access: {
			token: accessToken,
			expires: accessTokenExpires,
		},
	};
}

async function generateAccessToken({ userId, roleId }) {
	const accessTokenExpires = generateExpires(
		config.jwt.accessExpirationMinutes / 60
	);
	const accessToken = generateToken({ userId, roleId }, accessTokenExpires);

	return accessToken;
}

// async function insertToken(tokenData, id) {
// 	const {
// 		ownerType,
// 		userId,
// 		tokenType,
// 		tokenValue,
// 		expiresAt,
// 		deviceInfo,
// 		ipAddress,
// 	} = tokenData;
// 	let createdToken;

// 	// 0: refresh token
// 	if (tokenType == '0') {
// 		createdToken = await db.token
// 			.create({
// 				owner_type: ownerType,
// 				user_id: userId,
// 				token_type: tokenType,
// 				token_value: tokenValue,
// 				device_info: deviceInfo,
// 				ip_address: ipAddress,
// 				is_active: '1',
// 				expires_at: unixToYYYYMMDDHHMMSS(expiresAt),
// 				created_at: unixToYYYYMMDDHHMMSS(expiresAt),
// 				created_by: id,
// 			})
// 			.then((resultEntity) => resultEntity.get({ plain: true }));

// 		return createdToken;
// 	}

// 	const existToken = await db.token.findOne({
// 		where: { user_id: userId, token_type: tokenType, is_active: '1' },
// 	});

// 	if (existToken && existToken.expires_at > getCurrentDateYYYYMMDDHHMMSS()) {
// 		await existToken.update({
// 			is_active: '0',
// 			revoked_at: getCurrentDateYYYYMMDDHHMMSS(),
// 		});
// 	}

// 	createdToken = await db.token
// 		.create({
// 			owner_type: ownerType,
// 			user_id: userId,
// 			token_type: tokenType,
// 			token_value: tokenValue,
// 			is_active: '1',
// 			expires_at: unixToYYYYMMDDHHMMSS(expiresAt),
// 			created_at: unixToYYYYMMDDHHMMSS(expiresAt),
// 			created_by: id,
// 		})
// 		.then((resultEntity) => resultEntity.get({ plain: true }));

// 	return createdToken;
// }

async function getOtherTokenUser(userId, tokenValue, tokenType, ipAddress) {
	const existedToken = await db.token.findAll({
		where: {
			user_id: userId,
			token_value: tokenValue,
			is_active: '1',
			token_type: tokenType,
			ip_address: {
				[Op.ne]: ipAddress,
			},
		},
	});

	if (!existedToken) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
	}

	return existedToken;
}

async function getCurrentTokenLogging(userId) {
	const existedToken = await db.token.findOne({
		where: {
			user_id: userId,
			is_active: '1',
			token_type: '0',
		},
	});

	if (!existedToken) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
	}

	return existedToken;
}

async function insertToken(tokenData, id) {
	const {
		ownerType,
		userId,
		tokenType,
		tokenValue,
		expiresAt,
		deviceInfo,
		ipAddress,
	} = tokenData;

	await db.token.update(
		{
			is_active: '0',
			revoked_at: getCurrentDateYYYYMMDDHHMMSS(),
		},
		{
			where: {
				user_id: userId,
				is_active: '1',
				token_type: tokenType,
			},
		}
	);

	const createdToken = await db.token
		.create({
			owner_type: ownerType,
			user_id: userId,
			token_type: tokenType,
			token_value: tokenValue,
			device_info: deviceInfo,
			ip_address: ipAddress,
			is_active: '1',
			expires_at: unixToYYYYMMDDHHMMSS(expiresAt),
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: id,
		})
		.then((e) => e.get({ plain: true }));

	return createdToken;
}

module.exports = {
	generateResetPasswordToken,
	generateAuthTokens,
	insertToken,
	generateAccessToken,
	getOtherTokenUser,
	getCurrentTokenLogging,
};
