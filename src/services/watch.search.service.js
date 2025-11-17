const client = require('../config/elastic.search');
const { getOffset } = require('../utils/query');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const {
	buildElasticQuery,
	buildElasticSort,
} = require('../utils/elasticQuery');

async function search(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const {
		page = defaultPage,
		limit = defaultLimit,
		sort,
		q,
		...filters
	} = req.query;

	const from = getOffset(page, limit);

	const schema = {
		root: {
			base_price: { op: 'range', type: 'number' },
			rating: { op: 'gte', type: 'number' },
			brand_id: { op: 'eq', type: 'number' },
			category_id: { op: 'eq', type: 'number' },
			movement_type_id: { op: 'eq', type: 'number' },
			gender: { op: 'eq', type: 'string' },
			color_id: {
				op: 'eq',
				type: 'number',
				field: 'variants.color_id',
				nestedPath: 'variants',
			},
			strap_material_id: {
				op: 'eq',
				type: 'number',
				field: 'variants.strap_material_id',
				nestedPath: 'variants',
			},
		},
	};

	const query = buildElasticQuery(filters, schema);

	if (q) {
		query.bool.must.push({
			multi_match: {
				query: q,
				fields: [
					'name^3',
					'description',
					'model',
					'brand_name',
					'category_name',
					'movement_type_name',
				],
				fuzziness: 'AUTO',
			},
		});
	}

	const sortDsl = buildElasticSort(sort, [
		'created_at',
		'base_price',
		'rating',
		'sold',
	]);

	const response = await client.search({
		index: 'watch_shop',
		body: {
			from,
			size: Number(limit),
			sort: sortDsl,
			query,
		},
	});

	if (!response.body.hits || !response.body.hits.hits)
		throw new ApiError(500, 'Không nhận được dữ liệu từ Elasticsearch');

	const totalItems =
		(response.body.hits.total && response.body.hits.total.value) || 0;
	const totalPages = Math.ceil(totalItems / limit);
	const items = response.body.hits.hits.map((h) => h._source);

	return {
		page: Number(page),
		limit: Number(limit),
		totalItems,
		totalPages,
		items,
	};
}

module.exports = {
	search,
};
