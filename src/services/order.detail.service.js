const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function createOrderDetail(data) {
	const orderDetail = await db.orderDetail.create({
		...data,
		created_at: getCurrentDateYYYYMMDDHHMMSS(),
		created_by: data.userId ? data.userId : 0,
	});

	return orderDetail;
}

async function createOrderDetails(listData, userId) {
	const now = getCurrentDateYYYYMMDDHHMMSS();

	const payload = listData.map((item) => ({
		...item,
		created_at: now,
		created_by: userId || 0,
	}));

	const orderDetails = await db.orderDetail.bulkCreate(payload, {
		returning: true,
	});

	return orderDetails;
}

module.exports = {
	createOrderDetail,
	createOrderDetails,
};
