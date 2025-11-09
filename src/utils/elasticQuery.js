function parseKeyForOp(key) {
	const idx = key.indexOf('__');
	return idx === -1
		? { fieldKey: key, opOverride: null }
		: { fieldKey: key.slice(0, idx), opOverride: key.slice(idx + 2) };
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

/**
 * Chuyển query params sang query DSL của Elasticsearch
 */
function buildElasticQuery(queryParams, schema = {}) {
	const { root = {} } = schema;
	const bool = { must: [], filter: [] };

	Object.entries(queryParams).forEach(([rawKey, rawVal]) => {
		if (!rawVal) return;

		const { fieldKey, opOverride } = parseKeyForOp(rawKey);
		const allowed = root[fieldKey];
		if (!allowed) return;

		const op = (opOverride || allowed.op || 'eq').trim();
		const field = allowed.field || fieldKey;
		const type = allowed.type || 'string';
		const nestedPath = allowed.nestedPath; // nestesd field

		let value = rawVal;
		if (type === 'number' && !['range', 'between', 'in'].includes(op))
			value = Number(value);
		if (type === 'boolean')
			value = ['true', '1', 'yes'].includes(String(value).toLowerCase());

		let queryPart = null;
		switch (op) {
			case 'eq':
				queryPart = { term: { [field]: value } };
				// bool.filter.push({ term: { [field]: value } });
				break;
			case 'like':
				queryPart = { match_phrase: { [field]: value } };
				// bool.must.push({ match_phrase: { [field]: value } });
				break;
			case 'in': {
				let arrayValue = toArray(value);
				if (type === 'number') {
					arrayValue = arrayValue
						.map((v) => Number(v))
						.filter((v) => !Number.isNaN(v));
				}
				queryPart = { terms: { [field]: arrayValue } };
				break;
			}
			case 'gte':
			case 'lte':
			case 'gt':
			case 'lt':
				queryPart = { range: { [field]: { [op]: value } } };
				// bool.filter.push({ range: { [field]: { [op]: value } } });
				break;
			case 'between':
			case 'range': {
				const [from, to] = String(value)
					.split(':')
					.map((v) => Number(v));
				const range = {};
				if (from !== undefined && from !== null && !Number.isNaN(from))
					range.gte = from;
				if (to !== undefined && to !== null && !Number.isNaN(to))
					range.lte = to;
				queryPart = { range: { [field]: range } };
				// bool.filter.push({ range: { [field]: range } });
				break;
			}
			default:
				queryPart = { match: { [field]: value } };
			// bool.must.push({ match: { [field]: value } });
		}

		if (nestedPath) {
			queryPart = {
				nested: {
					path: nestedPath,
					query: queryPart,
				},
			};
		}

		bool.filter.push(queryPart);
	});

	// bool.filter.push({ term: { del_flag: '0' } });

	return { bool };
}

/**
 * Build sort từ query param
 */
function buildElasticSort(sortParam, allowedFields = []) {
	if (!sortParam) return [{ created_at: { order: 'desc' } }];

	return sortParam
		.split(',')
		.map((item) => {
			const [field, direction] = item.split(':');
			const col = field.trim();
			const dir = (direction || 'asc').toLowerCase();
			if (allowedFields.length && !allowedFields.includes(col))
				return null;
			return { [col]: { order: dir === 'desc' ? 'desc' : 'asc' } };
		})
		.filter(Boolean);
}

module.exports = {
	buildElasticQuery,
	buildElasticSort,
};
