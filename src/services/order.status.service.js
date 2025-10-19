const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getOrderStatusBySortOrder(sortOrder) {
	const orderStatus = await db.configOrderStatus.findOne({
		where: { sort_order: sortOrder, del_flag: '0' },
	});

	return orderStatus;
}

async function getOrderStatusFirst() {
	const orderStatus = await db.configOrderStatus.findOne({
		where: { sort_order: 1, del_flag: '0' },
	});

	return orderStatus;
}

async function getOrderStatusById(orderStatusId) {
	const orderStatus = await db.configOrderStatus.findOne({
		where: { id: orderStatusId, del_flag: '0' },
	});

	return orderStatus;
}

async function getOrderStatusByCode(code, sort_order) {
	const orderStatus = await db.configOrderStatus.findOne({
		where: { [Op.or]: [{ code }, { sort_order }], del_flag: '0' },
	});

	return orderStatus;
}

async function getOrderStatuses(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			code: { type: 'string', op: 'like' },
			name: { type: 'string', op: 'like' },
			color: { type: 'string', op: 'like' },
			hex_code: { type: 'string', op: 'like' },
			created_at: { type: 'date', op: 'range' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['code', 'name', 'id']);

	const orderStatuses = await db.configOrderStatus.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return orderStatuses;
}

async function createOrderStatus(req) {
	const { code, sort_order } = req.body;
	const existedOrderStatus = await getOrderStatusByCode(code, sort_order);

	if (existedOrderStatus) {
		throw new ApiError(
			httpStatus.CONFLICT,
			'This order status already exits'
		);
	}

	const createdOrderStatus = await db.configOrderStatus
		.create({
			...req.body,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdOrderStatus;
}

async function updateOrderStatus(req) {
	const updatedOrderStatus = await db.configOrderStatus
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.orderStatusId },
				returning: true,
				plain: true,
			}
		)
		.then((data) => data[1]);

	return updatedOrderStatus;
}

async function deleteOrderStatusById(req) {
	const deletedOrderStatus = await db.configOrderStatus
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.orderStatusId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedOrderStatus;
}
module.exports = {
	createOrderStatus,
	getOrderStatuses,
	getOrderStatusById,
	updateOrderStatus,
	deleteOrderStatusById,
	getOrderStatusFirst,
	getOrderStatusBySortOrder,
	getOrderStatusByCode,
};
