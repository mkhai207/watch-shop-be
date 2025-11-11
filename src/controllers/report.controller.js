const catchAsync = require('../utils/catchAsync');
const { reportService } = require('../services');

const revenue = catchAsync(async (req, res) => {
	const revenueReport = await reportService.revenue(req);

	res.send(revenueReport);
});

const revenueYear = catchAsync(async (req, res) => {
	const { year } = req.body;
	const revenueYearReport = await reportService.revenueYear(year);

	res.send(revenueYearReport);
});

module.exports = {
	revenue,
	revenueYear,
};
