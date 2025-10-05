const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function createOrderStatusHistory(data, options = {}) {
	const orderStatusHistory = await db.orderStatusHistory.create(
		{
			order_id: data.orderId,
			status_id: data.statusId,
			note: data.note ? data.note : '',
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: data.userId ? data.userId : 0,
		},
		options
	);

	return orderStatusHistory;
}

async function getOrderStatusHistorys(orderId) {
	const orderStatuses = await db.orderStatusHistory.findAll({
		where: { order_id: orderId, del_flag: '0' },
		include: [
			{
				model: db.configOrderStatus,
				as: 'status',
				attributes: ['id', 'name', 'code', 'description'],
			},
		],
	});

	return orderStatuses;
}

module.exports = {
	createOrderStatusHistory,
	getOrderStatusHistorys,
};
