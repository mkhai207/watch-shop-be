const { randomUUID } = require('crypto');

function sessionAnchor(options = {}) {
	const {
		cookieName = 'sid',
		maxAgeMs = 1000 * 60 * 60 * 24 * 30, // 30 ngày
		sameSite = 'lax',
		secure = process.env.NODE_ENV === 'production',
		rolling = true,
	} = options;

	return function sessionAnchorMiddleware(req, res, next) {
		let sid = req.cookies?.[cookieName];

		if (typeof sid !== 'string' || sid.length === 0 || sid.length > 128) {
			sid = '';
		}

		const isNew = !sid;
		if (isNew) {
			sid = randomUUID();
		}

		req.sessionId = sid;
		req.session = { id: sid, isNew };

		if (isNew || rolling) {
			res.cookie(cookieName, sid, {
				httpOnly: true,
				secure,
				sameSite,
				maxAge: maxAgeMs,
				path: '/',
			});
		}

		return next();
	};
}

module.exports = sessionAnchor;
