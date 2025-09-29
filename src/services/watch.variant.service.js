const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getVariantById(variantId) {
	const variant = await db.watchVariant.findOne({
		where: { id: variantId, del_flag: '0' },
	});

	return variant;
}

async function getVariantsByWatchId(watchId) {
	const variants = await db.watchVariant.findAll({
		where: { watch_id: watchId, del_flag: '0' },
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
	});

	return variants;
}

async function getVariants(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			watch_id: { type: 'number', op: 'eq' },
			color_id: { type: 'number', op: 'eq' },
			strap_material_id: { type: 'number', op: 'eq' },
			created_at: { type: 'date', op: 'range' },
			del_flag: { type: 'string', op: 'eq', default: '0' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['created_at', 'id']);

	const variants = await db.watchVariant.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return variants;
}

async function updateVariant(req) {
	const updatedVariant = await db.watchVariant
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.variantId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedVariant;
}

async function createVariant(req) {
	const { watch_id, strap_material_id, color_id, stock_quantity, price } =
		req.body;
	const existedVariant = await db.watchVariant.findOne({
		where: {
			color_id,
			strap_material_id,
			watch_id,
			del_flag: '0',
		},
	});

	if (existedVariant) {
		const res = existedVariant.update({
			stock_quantity: stock_quantity + existedVariant.stock_quantity,
		});
		return res;
	}

	const createdVariant = await db.watchVariant
		.create({
			...req.body,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdVariant;
}

async function deleteVariantById(req) {
	const deletedVariant = await db.watchVariant
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.variantId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedVariant;
}
module.exports = {
	getVariantById,
	getVariants,
	createVariant,
	updateVariant,
	deleteVariantById,
	getVariantsByWatchId,
};
