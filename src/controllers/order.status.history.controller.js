const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderStatusHistoryService } = require('../services');

const getOrderStatusHistorys = catchAsync(async (req, res) => {
	const orderStatusHistorys =
		await orderStatusHistoryService.getOrderStatusHistorys(
			req.params.orderId
		);

	if (!orderStatusHistorys) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Order status not found');
	}

	res.send({ orderStatusHistorys });
});

module.exports = {
	getOrderStatusHistorys,
};
