const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
	authService,
	userService,
	emailService,
	tokenService,
} = require('../services');
const { verifyToken } = require('../utils/auth');
const { getClientIp, getDeviceInfo } = require('../utils/requestInfo');

const register = catchAsync(async (req, res) => {
	const user = await userService.createUser(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
		roleId: user.role_id,
	});
	if (tokens) {
		await tokenService.insertToken(
			{
				ownerType: 'user',
				userId: user.id,
				tokenType: '0',
				tokenValue: tokens.refresh.token,
				expiresAt: tokens.refresh.expires,
				deviceInfo: getDeviceInfo(req),
				ipAddress: getClientIp(req),
			},
			user.id
		);
	}
	delete user.password;
	res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
	const user = await authService.loginUser(req);
	const tokens = await tokenService.generateAuthTokens({
		userId: user.id,
		roleId: user.role_id,
	});
	if (tokens) {
		await tokenService.insertToken(
			{
				ownerType: 'user',
				userId: user.id,
				tokenType: '0',
				tokenValue: tokens.refresh.token,
				expiresAt: tokens.refresh.expires,
				deviceInfo: getDeviceInfo(req),
				ipAddress: getClientIp(req),
			},
			user.id
		);
	}
	res.send({ user, tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
	const resetPasswordToken = await tokenService.generateResetPasswordToken(
		req.body.email
	);

	const user = await userService.getUserByEmail(req.body.email);

	if (resetPasswordToken) {
		await tokenService.insertToken(
			{
				ownerType: 'user',
				userId: user.id,
				tokenType: '1',
				tokenValue: resetPasswordToken.token,
				expiresAt: resetPasswordToken.expiresAt,
				deviceInfo: getDeviceInfo(req),
				ipAddress: getClientIp(req),
			},
			user.id
		);
	}
	await emailService.sendResetPasswordEmail(
		req.body.email,
		resetPasswordToken
	);
	res.send({ success: true });
});

const resetPassword = catchAsync(async (req, res) => {
	const { id } = await verifyToken(req.query.token);
	req.body.id = id;
	await userService.updateUser(req);
	res.send({ success: true });
});

module.exports = {
	register,
	login,
	forgotPassword,
	resetPassword,
};
