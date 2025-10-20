const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getCategoryById(categoryId) {
	const category = await db.category.findOne({
		where: { id: categoryId, del_flag: '0' },
	});

	return category;
}

async function getCategoryByName(name) {
	const category = await db.category.findOne({
		where: { name, del_flag: '0' },
	});

	return category;
}

async function getCategorys(req) {
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

	const { count, rows } = await db.category.findAndCountAll({
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

async function createCategory(req) {
	const { name, image_url, description = '' } = req.body;
	const existedCategory = await getCategoryByName(name);

	if (existedCategory) {
		throw new ApiError(httpStatus.CONFLICT, 'This category already exits');
	}

	const createdCategory = await db.category
		.create({
			name,
			image_url,
			description,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdCategory;
}

async function updateCategory(req) {
	const updatedCategory = await db.category
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.categoryId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedCategory;
}

async function deleteCategoryById(req) {
	const deletedBrand = await db.category
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.categoryId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedBrand;
}
module.exports = {
	getCategoryById,
	getCategorys,
	createCategory,
	updateCategory,
	deleteCategoryById,
};
