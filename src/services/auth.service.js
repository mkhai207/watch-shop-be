const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const db = require('../db/models');
const { decryptData, verifyToken, encryptData } = require('../utils/auth');
const tokenService = require('./token.service');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');
const { OAuth2Client } = require('google-auth-library');
const config = require('../config/config');

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

async function loginByGoogle(req) {
	try {
		const { credential } = req.body;
		const client = new OAuth2Client(config.google.clientId);
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: config.google.clientId,
		});

		const payload = ticket.getPayload();

		const {
			sub,
			email,
			name,
			picture,
			email_verified,
			given_name,
			family_name,
		} = payload;

		if (!email_verified) {
			throw new ApiError(
				httpStatus.UNAUTHORIZED,
				'Google account email must be verified'
			);
		}

		if (!email) {
			throw new ApiError(
				httpStatus.UNAUTHORIZED,
				'Google account must have an email'
			);
		}
		let user = await userService.getUserByEmail(email);

		if (user) {
			let needUpdate = false;

			if (!user.avatar && picture) {
				user.avatar = picture;
				needUpdate = true;
			}

			if (user.email !== email) {
				user.email = email;
				needUpdate = true;
			}

			if (user.full_name !== name && name) {
				user.full_name = name;
				needUpdate = true;
			}

			if (needUpdate) {
				await db.user.update(
					{ avatar: picture, full_name: name },
					{ where: { email } }
				);
			}
		} else {
			user = await userService.createUserOther({
				email,
				userName: email,
				password: await encryptData(`google_auth_${sub}`),
				firstName: given_name || name,
				lastName: family_name || '',
				roleId: 1,
			});
		}

		return user;
	} catch (error) {
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			`Google login failed: ${error.message}`
		);
	}
}

module.exports = {
	loginUser,
	refresh,
	getMe,
	loginByGoogle,
};
