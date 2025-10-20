const catchAsync = require('../utils/catchAsync');
const { reportService } = require('../services');

const revenue = catchAsync(async (req, res) => {
	const revenueReport = await reportService.revenue(req);

	res.send(revenueReport);
});

module.exports = {
	revenue,
};
