const { Op } = require('sequelize');
const config = require('../config/config');

async function generateQuery(req, query) {
	const result = await req.postgres
		.query(query)
		.then((res) => res.rows)
		.catch((err) => {
			throw new Error(err.stack);
		});
	return result;
}

function getOffset(
	page = config.pagination.page,
	limit = config.pagination.limit
) {
	return (page - 1) * limit;
}

function buildOrder(sort, allowedFields = []) {
	if (!sort) return [['created_at', 'DESC']];

	return sort
		.split(',')
		.map((item) => {
			const [field, direction] = item.split(':');
			const col = field.trim();
			const dir = (direction || 'ASC').toUpperCase();

			if (!allowedFields.includes(col)) return null;

			return [col, dir === 'DESC' ? 'DESC' : 'ASC'];
		})
		.filter(Boolean);
}

function toArray(val) {
	if (Array.isArray(val)) return val;
	if (typeof val === 'string')
		return val
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
	return [val];
}

function parseValueByType(raw, type) {
	if (raw === undefined || raw === null) return undefined;
	if (type === 'number') {
		const n = Number(raw);
		return Number.isNaN(n) ? undefined : n;
	}
	if (type === 'boolean') {
		const s = String(raw).toLowerCase();
		if (['true', '1', 'yes', 'y'].includes(s)) return true;
		if (['false', '0', 'no', 'n'].includes(s)) return false;
		return undefined;
	}
	return raw;
}

function buildOpCondition(op, value, type) {
	if (value === undefined || value === '' || value === null) return undefined;
	const v = parseValueByType(value, type);

	const ops = {
		eq: v,
		like: { [Op.like]: `%${v}%` },
		startsWith: { [Op.like]: `${v}%` },
		endsWith: { [Op.like]: `%${v}` },
		in: { [Op.in]: toArray(value).map((i) => parseValueByType(i, type)) },
		gte: { [Op.gte]: v },
		lte: { [Op.lte]: v },
		gt: { [Op.gt]: v },
		lt: { [Op.lt]: v },
	};

	if (op === 'between') {
		const [min, max] = String(value)
			.split(':')
			.map((s) => parseValueByType(s.trim(), type));
		if (min !== undefined && max !== undefined)
			return { [Op.between]: [min, max] };
		return undefined;
	}

	if (op === 'range') {
		const [from, to] = String(value)
			.split(':')
			.map((s) => parseValueByType(s.trim(), type));
		const obj = {};
		if (from !== undefined) obj[Op.gte] = from;
		if (to !== undefined) obj[Op.lte] = to;
		return Object.keys(obj).length ? obj : undefined;
	}

	return ops[op] || undefined;
}

function parseKeyForOp(key) {
	const idx = key.indexOf('__');
	return idx === -1
		? { fieldKey: key, opOverride: null }
		: { fieldKey: key.slice(0, idx), opOverride: key.slice(idx + 2) };
}

function buildFilters(query, schema) {
	const { root = {}, include = {} } = schema || {};

	const rootWhere = {};
	const includeMap = {};

	// Xử lý root fields
	Object.entries(query).forEach(([rawKey, rawVal]) => {
		if (!rawVal) return;

		if (!rawKey.includes('.')) {
			const { fieldKey, opOverride } = parseKeyForOp(rawKey);
			const allowed = root[fieldKey];
			if (!allowed) return;

			const op = (opOverride || allowed.op || 'eq').trim();
			const cond = buildOpCondition(op, rawVal, allowed.type || 'string');
			if (cond) rootWhere[fieldKey] = cond;
		}
	});

	// Xử lý include fields (dot notation)
	Object.entries(query).forEach(([rawKey, rawVal]) => {
		if (!rawVal || !rawKey.includes('.')) return;

		const [alias, fieldFull] = rawKey.split('.');
		const { fieldKey, opOverride } = parseKeyForOp(fieldFull);

		const incCfg = include[alias];
		if (!incCfg || !incCfg.fields || !incCfg.fields[fieldKey]) return;

		const allowed = incCfg.fields[fieldKey];
		const op = (opOverride || allowed.op || 'eq').trim();
		const cond = buildOpCondition(op, rawVal, allowed.type || 'string');
		if (!cond) return;

		if (!includeMap[alias]) {
			includeMap[alias] = {
				model: incCfg.model,
				as: incCfg.as || alias,
				required: incCfg.defaultRequired || false,
				attributes: incCfg.attributes,
				where: {},
			};
		}

		includeMap[alias].where[fieldKey] = cond;
		includeMap[alias].required = true;
	});
	rootWhere.del_flag = '0'; // filter mặc định không lấy các đồng hồ có trường del_flag = '1': đã xóa

	const resultIncludes = Object.values(includeMap);

	return { where: rootWhere, include: resultIncludes };
}

module.exports = {
	generateQuery,
	getOffset,
	buildOrder,
	buildFilters,
};
