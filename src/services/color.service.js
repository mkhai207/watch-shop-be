const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getColorById(colorId) {
	const color = await db.color.findOne({
		where: { id: colorId, del_flag: '0' },
	});

	return color;
}

async function getColorByName(name) {
	const color = await db.color.findOne({
		where: { name, del_flag: '0' },
	});

	return color;
}

async function getColorByHexCode(code) {
	const color = await db.color.findOne({
		where: { hex_code: code, del_flag: '0' },
	});

	return color;
}

async function getColors(req) {
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

	const { count, rows } = await db.color.findAndCountAll({
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

async function createColor(req) {
	const { name, hex_code } = req.body;
	const existedColor = await getColorByHexCode(hex_code);

	if (existedColor) {
		throw new ApiError(httpStatus.CONFLICT, 'This color already exits');
	}

	const createdColor = await db.color
		.create({
			name,
			hex_code,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdColor;
}

async function updateColor(req) {
	const updatedColor = await db.color
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.colorId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedColor;
}

async function deleteColorById(req) {
	const deletedColor = await db.color
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.colorId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedColor;
}
module.exports = {
	getColorById,
	getColors,
	createColor,
	updateColor,
	deleteColorById,
};
