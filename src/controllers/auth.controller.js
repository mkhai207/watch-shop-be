const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
	authService,
	userService,
	emailService,
	tokenService,
} = require('../services');
const { verifyToken, decryptData } = require('../utils/auth');
const { getClientIp, getDeviceInfo } = require('../utils/requestInfo');
const ApiError = require('../utils/ApiError');

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
	const checkStatusToken = await authService.checkResetPasswordToken(
		req.query.token
	);

	if (!checkStatusToken) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Token not found or revoked'
		);
	}
	const { id } = await verifyToken(req.query.token);
	await userService.changePassword(req.body.password, id);
	res.send({ success: true });
});

const refresh = catchAsync(async (req, res) => {
	const accessToken = await authService.refresh(req);
	res.send({ accessToken });
});

const getMe = catchAsync(async (req, res) => {
	const user = await userService.getMe(req);

	if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

	res.send({ user });
});

const loginByGoogle = catchAsync(async (req, res) => {
	const user = await authService.loginByGoogle(req);
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

const changePassword = catchAsync(async (req, res) => {
	const user = await userService.getUserById(req.user.userId);

	const isPasswordMatch = await decryptData(
		req.body.current_password,
		user.password
	);
	if (!isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Current password is incorrect'
		);
	}

	const updatedUser = await userService.changePassword(
		req.body.new_password,
		req.user.userId
	);
	if (!updatedUser) {
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Failed to change password'
		);
	}
	res.send({ success: true });
});

module.exports = {
	register,
	login,
	forgotPassword,
	resetPassword,
	refresh,
	getMe,
	loginByGoogle,
	changePassword,
};
