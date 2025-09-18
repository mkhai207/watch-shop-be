function unixToYYYYMMDDHHMMSS(unixSeconds) {
	const date = new Date(unixSeconds);
	const pad = (n) => n.toString().padStart(2, '0');

	return (
		date.getFullYear().toString() +
		pad(date.getMonth() + 1) +
		pad(date.getDate()) +
		pad(date.getHours()) +
		pad(date.getMinutes()) +
		pad(date.getSeconds())
	);
}

function yyyymmddhhmmssToUnix(str) {
	if (!/^\d{14}$/.test(str)) {
		throw new Error('Invalid format, must be yyyymmddhhmmss');
	}

	const year = parseInt(str.slice(0, 4), 10);
	const month = parseInt(str.slice(4, 6), 10) - 1;
	const day = parseInt(str.slice(6, 8), 10);
	const hour = parseInt(str.slice(8, 10), 10);
	const minute = parseInt(str.slice(10, 12), 10);
	const second = parseInt(str.slice(12, 14), 10);

	const date = new Date(year, month, day, hour, minute, second);
	return Math.floor(date.getTime() / 1000);
}

function getCurrentDateYYYYMMDDHHMMSS() {
	const date = new Date();
	const pad = (n) => n.toString().padStart(2, '0');

	return (
		date.getFullYear().toString() +
		pad(date.getMonth() + 1) +
		pad(date.getDate()) +
		pad(date.getHours()) +
		pad(date.getMinutes()) +
		pad(date.getSeconds())
	);
}

module.exports = {
	getCurrentDateYYYYMMDDHHMMSS,
};

module.exports = {
	unixToYYYYMMDDHHMMSS,
	yyyymmddhhmmssToUnix,
	getCurrentDateYYYYMMDDHHMMSS,
};
