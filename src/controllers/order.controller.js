const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
	const order = await orderService.createOrder(req);
	res.send({ order });
});

const getOrders = catchAsync(async (req, res) => {
	const orders = await orderService.getOrders(req);
	res.send({ orders });
});

const getOrder = catchAsync(async (req, res) => {
	const order = await orderService.getOrderById(req.params.orderId);

	if (!order)
		throw new ApiError(httpStatus.NOT_FOUND, 'This order not found');

	res.send({ order });
});

const changeOrderStatus = catchAsync(async (req, res) => {
	const order = await orderService.changeOrderStatus(req);
	res.send({ success: order });
});

const deleteOrder = catchAsync(async (req, res) => {
	const order = await orderService.getOrderById(req.params.orderId);
	if (!order)
		throw new ApiError(httpStatus.NOT_FOUND, 'This order not found');

	const deletedOrder = await orderService.deleteOrder(req);
	res.send({ success: Boolean(deletedOrder) });
});

const cancelOrder = catchAsync(async (req, res) => {
	const order = await orderService.getOrderById(req.params.orderId);
	if (!order)
		throw new ApiError(httpStatus.NOT_FOUND, 'This order not found');

	const canceledOrder = await orderService.cancelOrder(req);
	res.send({ success: Boolean(canceledOrder) });
});

const retryPayment = catchAsync(async (req, res) => {
	const order = await orderService.getOrderById(req.params.orderId);
	if (!order)
		throw new ApiError(httpStatus.NOT_FOUND, 'This order not found');
	const rePaymentUrl = await orderService.retryPayment(req);
	res.send({ rePaymentUrl });
});

module.exports = {
	createOrder,
	getOrders,
	getOrder,
	changeOrderStatus,
	deleteOrder,
	cancelOrder,
	retryPayment,
};
