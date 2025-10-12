const client = require('../config/elastic.search');
const { getOffset } = require('../utils/query');
const config = require('../config/config');
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
			rating: { op: 'range', type: 'number' },
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
		index: 'watchshop_watches',
		from,
		size: Number(limit),
		sort: sortDsl,
		query,
	});

	if (!response.hits?.hits)
		throw new ApiError(500, 'Không nhận được dữ liệu từ Elasticsearch');

	const totalItems = response.hits.total?.value || 0;
	const totalPages = Math.ceil(totalItems / limit);
	const items = response.hits.hits.map((h) => h._source);

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
