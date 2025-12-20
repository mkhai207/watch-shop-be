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

// function getCurrentDateYYYYMMDDHHMMSS() {
// 	const date = new Date();
// 	const pad = (n) => n.toString().padStart(2, '0');

// 	return (
// 		date.getFullYear().toString() +
// 		pad(date.getMonth() + 1) +
// 		pad(date.getDate()) +
// 		pad(date.getHours()) +
// 		pad(date.getMinutes()) +
// 		pad(date.getSeconds())
// 	);
// }

function getCurrentDateYYYYMMDDHHMMSS() {
	const now = new Date();

	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Ho_Chi_Minh',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	}).formatToParts(now);

	const get = (type) => parts.find((p) => p.type === type).value;

	return (
		get('year') +
		get('month') +
		get('day') +
		get('hour') +
		get('minute') +
		get('second')
	);
}

function parseChar14ToDDMMYYYY(str) {
	if (!str || str.length < 8) return null;

	const year = str.substring(0, 4);
	const month = str.substring(4, 6);
	const day = str.substring(6, 8);

	return `${day}/${month}/${year}`;
}

// Convert YYYY-MM-DD to YYYYMMDDHHMMSS (with 000000 for time)
function convertYYYYMMDDtoYYYYMMDDHHMMSS(dateStr) {
	if (!dateStr || dateStr === '') return null;

	// Handle YYYY-MM-DD format
	const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (match) {
		return `${match[1]}${match[2]}${match[3]}000000`;
	}

	return null;
}

// Convert YYYYMMDDHHMMSS to YYYY-MM-DD
// function convertYYYYMMDDHHMMSStoYYYYMMDD(dateStr) {
// 	if (!dateStr || dateStr.length < 8) return null;

// 	const year = dateStr.substring(0, 4);
// 	const month = dateStr.substring(4, 6);
// 	const day = dateStr.substring(6, 8);

// 	return `${year}-${month}-${day}`;
// }

function convertYYYYMMDDHHMMSStoYYYYMMDD(input) {
	if (!input) return null;

	// Nếu là number (yyyyMMddHHmmss hoặc timestamp)
	if (typeof input === 'number') {
		const str = String(input);
		if (str.length >= 8) {
			return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
		}
		return null;
	}

	// Nếu là string
	if (typeof input === 'string') {
		// yyyyMMddHHmmss
		if (/^\d{14}$/.test(input)) {
			return `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(
				6,
				8
			)}`;
		}

		// yyyyMMdd
		if (/^\d{8}$/.test(input)) {
			return `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(
				6,
				8
			)}`;
		}

		// yyyy-MM-dd → giữ nguyên
		if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
			return input;
		}
	}

	return null;
}

module.exports = {
	parseChar14ToDDMMYYYY,
	unixToYYYYMMDDHHMMSS,
	yyyymmddhhmmssToUnix,
	getCurrentDateYYYYMMDDHHMMSS,
	convertYYYYMMDDtoYYYYMMDDHHMMSS,
	convertYYYYMMDDHHMMSStoYYYYMMDD,
};
