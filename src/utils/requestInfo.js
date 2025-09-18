const UAParser = require('ua-parser-js');

function getClientIp(req) {
	const xForwardedFor = req.headers['x-forwarded-for'];
	if (xForwardedFor) {
		return xForwardedFor.split(',')[0].trim();
	}
	return req.ip || req.connection.remoteAddress;
}

function getDeviceInfo(req) {
	const uaString = req.headers['user-agent'] || '';
	const parser = new UAParser(uaString);
	const result = parser.getResult();

	if (!result.os.name && !result.browser.name) {
		return uaString || 'Unknown device';
	}

	return `${result.os.name || 'Unknown OS'} ${result.os.version || ''} - ${
		result.browser.name || 'Unknown Browser'
	} ${result.browser.version || ''}`;
}

module.exports = {
	getClientIp,
	getDeviceInfo,
};
