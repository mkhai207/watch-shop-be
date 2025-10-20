const expressJwt = require('express-jwt');
const config = require('./config');

async function isRevoked(_req, _payload, done) {
	done();
}

function jwt() {
	const { secret } = config.jwt;
	return expressJwt({
		secret,
		getToken: function fromHeaderOrQuerystring(req) {
			const token = req.headers.authorization
				? req.headers.authorization.split(' ')[1]
				: req.query.token;
			if (token) return token;
			return null;
		},
		algorithms: ['HS256'],
		isRevoked,
	}).unless({
		custom: (req) => {
			const publicGetModules = [
				'watches',
				'brands',
				'categorys',
				'watch-variants',
				'reviews',
				'colors',
				'strap-materials',
				'movement-type',
				'discounts',
			];

			if (req.method === 'GET') {
				const isPublicGet = publicGetModules.some((module) =>
					new RegExp(`^/v[1-9]\\d*/${module}(/.*)?$`).test(req.path)
				);
				if (isPublicGet) return true;
			}

			return (
				/\/v[1-9]\d*\/auth\/(login|register|refresh|forgot-password|reset-password)/.test(
					req.path
				) ||
				/\/v[1-9]\d*\/docs\/.*/.test(req.path) ||
				/\/v[1-9]\d*\/payments\/vnpay-payment-return/.test(req.path) ||
				/^\/v[1-9]\d*\/search($|\/.*)/.test(req.path)
			);
		},
	});
}

module.exports = jwt;
