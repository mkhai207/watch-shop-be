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

		let value = rawVal;
		if (type === 'number') value = Number(value);
		if (type === 'boolean')
			value = ['true', '1', 'yes'].includes(String(value).toLowerCase());

		switch (op) {
			case 'eq':
				bool.filter.push({ term: { [field]: value } });
				break;
			case 'like':
				bool.must.push({ match_phrase: { [field]: value } });
				break;
			case 'in':
				bool.filter.push({ terms: { [field]: toArray(value) } });
				break;
			case 'gte':
			case 'lte':
			case 'gt':
			case 'lt':
				bool.filter.push({ range: { [field]: { [op]: value } } });
				break;
			case 'between':
			case 'range': {
				const [from, to] = String(value)
					.split(':')
					.map((v) => Number(v));
				const range = {};
				if (from) range.gte = from;
				if (to) range.lte = to;
				bool.filter.push({ range: { [field]: range } });
				break;
			}
			default:
				bool.must.push({ match: { [field]: value } });
		}
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
