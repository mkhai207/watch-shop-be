const client = require('../config/elastic.search');

async function createWatchIndex() {
	const indexName = 'watch_shop';

	try {
		const exists = await client.indices.exists({ index: indexName });
		if (exists) {
			console.log(`Index '${indexName}' đã tồn tại, bỏ qua tạo mới.`);
			return;
		}

		await client.indices.create({
			index: indexName,
			body: {
				settings: {
					analysis: {
						analyzer: {
							autocomplete: {
								tokenizer: 'autocomplete',
								filter: ['lowercase'],
							},
							autocomplete_search: {
								tokenizer: 'lowercase',
							},
						},
						tokenizer: {
							autocomplete: {
								type: 'edge_ngram',
								min_gram: 2,
								max_gram: 15,
								token_chars: ['letter', 'digit'],
							},
						},
					},
				},
				mappings: {
					properties: {
						id: { type: 'keyword' },
						code: { type: 'keyword' },
						name: {
							type: 'text',
							analyzer: 'standard',
							fields: {
								autocomplete: {
									type: 'text',
									analyzer: 'autocomplete',
								},
							},
						},
						description: { type: 'text', analyzer: 'standard' },
						model: { type: 'text', analyzer: 'standard' },
						case_material: { type: 'keyword' },
						case_size: { type: 'double' },
						strap_size: { type: 'double' },
						gender: { type: 'keyword' },
						water_resistance: { type: 'keyword' },
						release_date: {
							type: 'date',
							format: 'yyyy-MM-dd||yyyyMMdd||epoch_millis',
						},
						sold: { type: 'integer' },
						base_price: { type: 'double' },
						rating: { type: 'float' },
						status: { type: 'boolean' },
						thumbnail: { type: 'keyword' },
						slider: { type: 'text' },
						category_id: { type: 'keyword' },
						category_name: {
							type: 'text',
							analyzer: 'standard',
							fields: {
								keyword: { type: 'keyword' },
								autocomplete: {
									type: 'text',
									analyzer: 'autocomplete',
								},
							},
						},
						brand_id: { type: 'keyword' },
						brand_name: {
							type: 'text',
							analyzer: 'standard',
							fields: {
								keyword: { type: 'keyword' },
								autocomplete: {
									type: 'text',
									analyzer: 'autocomplete',
								},
							},
						},
						movement_type_id: { type: 'keyword' },
						movement_type_name: {
							type: 'text',
							analyzer: 'standard',
							fields: {
								keyword: { type: 'keyword' },
								autocomplete: {
									type: 'text',
									analyzer: 'autocomplete',
								},
							},
						},
						created_at: { type: 'date', format: 'yyyyMMddHHmmss' },
						updated_at: { type: 'date', format: 'yyyyMMddHHmmss' },
						variants: {
							type: 'nested',
							properties: {
								color_id: { type: 'keyword' },
								color_name: {
									type: 'text',
									analyzer: 'standard',
									fields: {
										keyword: { type: 'keyword' },
									},
								},
								strap_material_id: { type: 'keyword' },
								strap_material_name: {
									type: 'text',
									analyzer: 'standard',
									fields: {
										keyword: { type: 'keyword' },
									},
								},
							},
						},
					},
				},
			},
		});

		console.log(`🎉 Index '${indexName}' đã được tạo thành công.`);
	} catch (error) {
		console.error('Lỗi khi tạo index:', error);
	}
}

createWatchIndex();

module.exports = createWatchIndex;
