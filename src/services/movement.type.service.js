const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getMovementTypeById(movementTypeId) {
	const movementType = await db.movementType.findOne({
		where: { id: movementTypeId, del_flag: '0' },
	});

	return movementType;
}

async function getMovementTypeByCode(code) {
	const movementType = await db.movementType.findOne({
		where: { code: code.toUpperCase(), del_flag: '0' },
	});

	return movementType;
}

async function getMovementTypes(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			code: { type: 'string', op: 'like' },
			name: { type: 'string', op: 'like' },
			created_at: { type: 'date', op: 'range' },
			del_flag: { type: 'string', op: 'eq', default: '0' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, [
		'name',
		'id',
		'code',
		'created_at',
	]);

	order.push(['created_at', 'DESC']);

	const { count, rows } = await db.movementType.findAndCountAll({
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

async function createMovementType(req) {
	const { name, code, description = '' } = req.body;
	const existedMovementType = await getMovementTypeByCode(code);

	if (existedMovementType) {
		throw new ApiError(
			httpStatus.CONFLICT,
			'This movement type already exits'
		);
	}

	const createdMovementType = await db.movementType
		.create({
			name,
			code: code.toUpperCase(),
			description,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdMovementType;
}

async function updateMovementType(req) {
	const updatedMovementType = await db.movementType
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.movementTypeId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedMovementType;
}

async function deleteMovementType(req) {
	const deletedMovementType = await db.movementType
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.movementTypeId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedMovementType;
}
module.exports = {
	deleteMovementType,
	updateMovementType,
	createMovementType,
	getMovementTypes,
	getMovementTypeById,
};
