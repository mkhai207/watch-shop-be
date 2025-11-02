const client = require('../config/elastic.search');
const db = require('../db/models');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');

async function syncOneWatch(watchId) {
	const watch = await db.watch.findOne({
		where: { id: watchId, del_flag: '0' },
		include: [
			{ model: db.brand, as: 'brand', attributes: ['id', 'name'] },
			{
				model: db.category,
				as: 'category',
				attributes: ['id', 'name'],
			},
			{
				model: db.movementType,
				as: 'movementType',
				attributes: ['id', 'name'],
			},
		],
	});

	if (!watch) {
		throw new ApiError(404, `This watch not found`);
	}

	const variants = await db.watchVariant.findAll({
		where: { watch_id: watchId, del_flag: '0' },
		include: [
			{ model: db.color, as: 'color', attributes: ['id', 'name'] },
			{
				model: db.strapMaterial,
				as: 'strapMaterial',
				attributes: ['id', 'name'],
			},
		],
	});

	const variantDocuments = variants.map((variant) => ({
		color_id: variant.color_id,
		color_name: variant.color?.name,
		strap_material_id: variant.strap_material_id,
		strap_material_name: variant.strapMaterial?.name,
	}));

	const document = {
		id: watch.id,
		code: watch.code,
		name: watch.name,
		description: watch.description,
		model: watch.model,
		case_material: watch.case_material,
		case_size: watch.case_size,
		strap_size: watch.strap_size,
		gender: watch.gender,
		water_resistance: watch.water_resistance,
		release_date: watch.release_date,
		sold: watch.sold,
		base_price: watch.base_price,
		rating: watch.rating,
		status: watch.status,
		thumbnail: watch.thumbnail,
		slider: watch.slider,
		category_id: watch.category?.id,
		category_name: watch.category?.name,
		brand_id: watch.brand?.id,
		brand_name: watch.brand?.name,
		movement_type_id: watch.movementType?.id,
		movement_type_name: watch.movementType?.name,
		created_at: watch.created_at,
		updated_at: watch.updated_at,
		variants: variantDocuments || [],
	};

	const response = await client.index({
		index: 'watch_shop',
		id: String(watch.id),
		document,
		refresh: true,
	});

	if (response._shards?.failed > 0) {
		throw new ApiError(
			500,
			`Một số shard bị lỗi khi index đồng hồ ID=${watch.id}`
		);
	}

	console.log(
		`Đồng bộ đồng hồ ID=${watch.id} sang Elasticsearch (${response.result})`
	);
	return response;
}

async function syncAllWatches() {
	const watches = await db.watch.findAll({
		where: { del_flag: '0' },
		include: [
			{ model: db.brand, as: 'brand', attributes: ['id', 'name'] },
			{ model: db.category, as: 'category', attributes: ['id', 'name'] },
			{
				model: db.movementType,
				as: 'movementType',
				attributes: ['id', 'name'],
			},
			{
				model: db.watchVariant,
				as: 'variants',
				required: false,
				include: [
					{
						model: db.color,
						as: 'color',
						attributes: ['id', 'name'],
					},
					{
						model: db.strapMaterial,
						as: 'strapMaterial',
						attributes: ['id', 'name'],
					},
				],
			},
		],
	});

	if (!watches.length) {
		throw new ApiError(404, 'Không có đồng hồ nào để đồng bộ.');
	}

	const body = watches.flatMap((w) => {
		const variants = (w.variants || []).map((v) => ({
			color_id: String(v.color_id || ''),
			color_name: v.color?.name || null,
			strap_material_id: String(v.strap_material_id || ''),
			strap_material_name: v.strapMaterial?.name || null,
		}));
		return [
			{ index: { _index: 'watch_shop', _id: String(w.id) } },
			{
				id: w.id,
				code: w.code,
				name: w.name,
				description: w.description,
				model: w.model,
				case_material: w.case_material,
				case_size: w.case_size,
				strap_size: w.strap_size,
				gender: w.gender,
				water_resistance: w.water_resistance,
				release_date: w.release_date,
				sold: w.sold,
				base_price: w.base_price,
				rating: w.rating,
				status: w.status,
				thumbnail: w.thumbnail,
				slider: w.slider,
				category_id: w.category?.id,
				category_name: w.category?.name,
				brand_id: w.brand?.id,
				brand_name: w.brand?.name,
				movement_type_id: w.movementType?.id,
				movement_type_name: w.movementType?.name,
				created_at: w.created_at,
				updated_at: w.updated_at,
				variants,
			},
		];
	});

	const response = await client.bulk({
		refresh: true,
		body,
	});

	if (response.errors) {
		const failedItems = response.items.filter(
			(item) => item.index && item.index.error
		);
		const successCount = response.items.length - failedItems.length;

		console.error(
			`Có ${failedItems.length} / ${response.items.length} document bị lỗi.`
		);
		failedItems.slice(0, 5).forEach((item) => {
			console.error('→ Lỗi:', item.index.error);
		});

		throw new ApiError(
			500,
			`Một số document đồng bộ thất bại (${failedItems.length} lỗi).`
		);
	}

	console.log(
		`🎉 Đồng bộ thành công ${response.items.length} document sang Elasticsearch.`
	);

	return {
		total: response.items.length,
		took: response.took,
		errors: response.errors,
	};
}

async function syncDeleteOneWatch(watchId) {
	const response = await client.delete({
		index: 'watchshop_watches',
		id: String(watchId),
	});

	if (response._shards?.failed > 0) {
		throw new ApiError(
			500,
			`Một số shard bị lỗi khi xóa document ID=${watchId} trong Elasticsearch`
		);
	}

	console.log(
		`Đã xóa document ID=${watchId} khỏi Elasticsearch (${response.result})`
	);
	return response;
}

module.exports = {
	syncOneWatch,
	syncAllWatches,
	syncDeleteOneWatch,
};
