const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getBrandById(brandId) {
	const brand = await db.brand.findOne({
		where: { id: brandId, del_flag: '0' },
	});

	return brand;
}

async function getBrandByName(name) {
	const brand = await db.brand.findOne({
		where: { name, del_flag: '0' },
	});

	return brand;
}

async function getBrands(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			name: { type: 'string', op: 'like' },
			created_at: { type: 'date', op: 'range' },
			del_flag: { type: 'string', op: 'eq', default: '0' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['name', 'id']);

	const { count, rows } = await db.brand.findAndCountAll({
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

async function createBrand(req) {
	const { name, logo_url, description = '' } = req.body;
	const existedBrand = await getBrandByName(name);

	if (existedBrand) {
		throw new ApiError(httpStatus.CONFLICT, 'This brand already exits');
	}

	const createdBrand = await db.brand
		.create({
			name,
			logo_url,
			description,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdBrand;
}

async function updateBrand(req) {
	const updatedBrand = await db.brand
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.brandId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedBrand;
}

async function deleteBrandById(req) {
	const deletedBrand = await db.brand
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.brandId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedBrand;
}
module.exports = {
	getBrandById,
	getBrands,
	createBrand,
	updateBrand,
	deleteBrandById,
};
