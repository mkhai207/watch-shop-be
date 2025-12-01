const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');
const { getCategoryById } = require('./category.service');
const { getBrandById } = require('./brand.service');
const { getMovementTypeById } = require('./movement.type.service');
const strapMaterialService = require('./strap.material.service');
const watchVariantService = require('./watch.variant.service');

async function getWatchByVariantId(variantId) {
	const watch = await db.watch.findOne({
		where: { id: variantId, del_flag: '0' },
	});

	if (!watch) {
		throw new ApiError(500, 'Watch not be found');
	}

	return watch;
}

async function getWatchById(watchId) {
	const watch = await db.watch.findOne({
		where: { id: watchId, del_flag: '0' },
		include: [
			{
				model: db.category,
				as: 'category',
				attributes: ['id', 'name'],
			},
			{
				model: db.brand,
				as: 'brand',
				attributes: ['id', 'name'],
			},
			{
				model: db.movementType,
				as: 'movementType',
				attributes: ['id', 'name'],
			},
			{
				model: db.watchVariant,
				as: 'variants',
				include: [
					{
						model: db.color,
						as: 'color',
					},
					{
						model: db.strapMaterial,
						as: 'strapMaterial',
					},
				],
			},
		],
	});

	return watch;
}

async function getWatchByCode(code) {
	const watch = await db.watch.findOne({
		where: { code, del_flag: '0' },
	});

	return watch;
}

async function getWatches(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			name: { type: 'string', op: 'like' },
			code: { type: 'string', op: 'like' },
			model: { type: 'string', op: 'like' },
			case_material: {
				type: 'string',
				op: 'like',
			},
			base_price: { type: 'number', op: 'range' },
			case_size: { type: 'string', op: 'like' },
			strap_size: { type: 'string', op: 'like' },
			gender: { type: 'string', op: 'like' },
			sold: { type: 'number', op: 'range' },
			rating: { type: 'number', op: 'range' },
			category_id: { type: 'number', op: 'eq' },
			brand_id: { type: 'number', op: 'eq' },
			movement_type_id: { type: 'number', op: 'eq' },
			created_at: { type: 'date', op: 'range' },
			del_flag: { type: 'string', op: 'eq', default: '0' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['name', 'id']);

	const { count, rows } = await db.watch.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return {
		page,
		limit,
		totalItems: count,
		totalPages: Math.ceil(count / limit),
		items: rows,
	};
}

async function createWatch(req) {
	const { code, variants, category_id, brand_id, movement_type_id } =
		req.body;
	const existedWatch = await getWatchByCode(code);

	if (existedWatch) {
		throw new ApiError(httpStatus.CONFLICT, 'This watch already exits');
	}

	const existedCategory = await getCategoryById(category_id);
	if (!existedCategory) {
		throw new ApiError(httpStatus.NOT_FOUND, 'This category not found');
	}

	const existedBrand = await getBrandById(brand_id);
	if (!existedBrand) {
		throw new ApiError(httpStatus.NOT_FOUND, 'This brand not found');
	}

	const existedMovement = await getMovementTypeById(movement_type_id);
	if (!existedMovement) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'This movement type not found'
		);
	}

	const createdWatch = await db.watch
		.create({
			...req.body,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	if (!createdWatch) {
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Failed to create watch'
		);
	}

	const variantsData = await Promise.all(
		variants.map(async (data) => {
			const strapMaterial =
				await strapMaterialService.getStrapMaterialById(
					data.strap_material_id
				);

			return {
				watch_id: createdWatch.id,
				color_id: data.color_id,
				strap_material_id: data.strap_material_id,
				stock_quantity: data.stock_quantity,
				price: createdWatch.base_price + strapMaterial.extra_money,
				created_at: getCurrentDateYYYYMMDDHHMMSS(),
				created_by: req.user.userId,
				del_flag: '0',
			};
		})
	);

	const createdVariants = await db.watchVariant.bulkCreate(variantsData);

	return {
		watch: createdWatch,
		variants: createdVariants,
	};
}

async function updateWatch(req) {
	const { code, category_id, brand_id, movement_type_id } = req.body;
	const existedWatch = await getWatchByCode(code);
	if (
		existedWatch &&
		String(existedWatch.id) !== String(req.params.watchId)
	) {
		throw new ApiError(httpStatus.CONFLICT, 'This watch code existed');
	}

	const existedCategory = await getCategoryById(category_id);
	if (!existedCategory) {
		throw new ApiError(httpStatus.NOT_FOUND, 'This category not found');
	}

	const existedBrand = await getBrandById(brand_id);
	if (!existedBrand) {
		throw new ApiError(httpStatus.NOT_FOUND, 'This brand not found');
	}

	const existedMovement = await getMovementTypeById(movement_type_id);
	if (!existedMovement) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			'This movement type not found'
		);
	}

	const updatedWatch = await db.watch
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.watchId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	if (updatedWatch) {
		const variants = await watchVariantService.getVariantsByWatchId(
			updatedWatch.id
		);
		const updatePromises = variants.map((variant) => {
			const extraPrice = variant.strapMaterial
				? variant.strapMaterial.extra_money
				: 0;

			const newPrice = updatedWatch.base_price + extraPrice;

			return db.watchVariant.update(
				{
					price: newPrice,
				},
				{
					where: { id: variant.id },
				}
			);
		});

		await Promise.all(updatePromises);
	}

	return updatedWatch;
}

async function deleteWatchById(req) {
	const deletedWatch = await db.watch
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.watchId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedWatch;
}

async function incrementWatchSoldCount(watchId, quantity = 1) {
	const watch = await getWatchById(watchId);
	if (!watch) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Watch not found');
	}
	await watch.increment({ sold: quantity });
}

module.exports = {
	createWatch,
	getWatchById,
	getWatches,
	updateWatch,
	deleteWatchById,
	incrementWatchSoldCount,
	getWatchByVariantId,
};
