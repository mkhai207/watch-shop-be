const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderStatusService } = require('../services');

const createOrderStatus = catchAsync(async (req, res) => {
	const orderStatus = await orderStatusService.createOrderStatus(req);
	res.send({ orderStatus });
});

const getOrderStatuses = catchAsync(async (req, res) => {
	const orderStatuses = await orderStatusService.getOrderStatuses(req);
	res.send({ orderStatuses });
});

const getOrderStatus = catchAsync(async (req, res) => {
	const orderStatus = await orderStatusService.getOrderStatusById(
		req.params.orderStatusId
	);

	if (!orderStatus) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Order status not found');
	}

	res.send({ orderStatus });
});

const updateOrderStatus = catchAsync(async (req, res) => {
	const orderStatus = await orderStatusService.updateOrderStatus(req);

	if (!orderStatus) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Order status not found');
	}

	res.send({ orderStatus });
});

const deleteOrderStatus = catchAsync(async (req, res) => {
	const orderStatus = await orderStatusService.getOrderStatusById(
		req.params.orderStatusId
	);
	if (!orderStatus) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Order status not found');
	}
	await orderStatusService.deleteOrderStatusById(req);
	res.send({ success: true });
});
module.exports = {
	createOrderStatus,
	getOrderStatuses,
	getOrderStatus,
	updateOrderStatus,
	deleteOrderStatus,
};
