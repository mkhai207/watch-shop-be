const httpStatus = require('http-status');
const { roles } = require('../config/roles');
const ApiError = require('../utils/ApiError');

function grantAccess(action, resource) {
	return async (req, _res, next) => {
		try {
			// if (!req.user) {
			// 	if (action === 'readAny') {
			// 		return next();
			// 	}
			// 	throw new ApiError(
			// 		httpStatus.UNAUTHORIZED,
			// 		'Authentication required for this action'
			// 	);
			// }

			// eslint-disable-next-line eqeqeq
			const isOwnedUser = req.user.userId == req.params.userId;
			const modifiedAction = isOwnedUser
				? action.replace('Any', 'Own')
				: action;

			const permission = roles
				.can(JSON.stringify(req.user.roleId))
				[modifiedAction](resource);

			if (!permission.granted) {
				throw new ApiError(
					httpStatus.FORBIDDEN,
					"You don't have enough permission to perform this action"
				);
			}
			next();
		} catch (error) {
			next(error);
		}
	};
}

module.exports = { grantAccess };
