const httpStatus = require('http-status');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const orderService = require('./order.service');

async function revenue(req) {
	const { count: countOrder, rows: rowOrders } =
		await db.order.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
				del_flag: '0',
			},
		});

	const totalRevenue = rowOrders.reduce((sum, order) => {
		const amt = Number(order.final_amount);
		return sum + (Number.isFinite(amt) ? amt : 0);
	}, 0);

	const { count: countWatch, rows: rowWatchs } =
		await db.watch.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
				del_flag: '0',
			},
		});

	const { count: countUser, rows: rowUsers } = await db.user.findAndCountAll({
		where: {
			created_at: {
				[Op.gte]: req.query.startDate,
				[Op.lte]: req.query.endDate,
			},
			del_flag: '0',
		},
	});

	const { count: countBrand, rows: rowBrands } =
		await db.brand.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
				del_flag: '0',
			},
		});

	const { count: countCategory, rows: rowCategories } =
		await db.category.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
				del_flag: '0',
			},
		});

	const { count: countDiscount, rows: rowDiscounts } =
		await db.discount.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
				del_flag: '0',
			},
		});

	const { count: countReview, rows: rowReviews } =
		await db.review.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
				del_flag: '0',
			},
		});

	const topWatches = await db.watch.findAll({
		where: { del_flag: '0' },
		order: [['sold', 'DESC']],
		limit: 3,
	});

	const orderRecently = await db.order.findAll({
		where: { del_flag: '0' },
		order: [['created_at', 'DESC']],
		limit: 3,
	});
	return {
		totalRevenue,
		countOrder,
		countWatch,
		countUser,
		countBrand,
		countCategory,
		countDiscount,
		countReview,
		topWatches,
		orderRecently,
	};
}

async function revenueYear(year) {
	if (!year || !year.match(/^\d{4}$/)) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Year must be in YYYY format'
		);
	}

	const chartData = [];
	const monthNames = [
		'T1',
		'T2',
		'T3',
		'T4',
		'T5',
		'T6',
		'T7',
		'T8',
		'T9',
		'T10',
		'T11',
		'T12',
	];

	const monthPromises = [];
	for (let month = 1; month <= 12; month += 1) {
		const monthStr = month.toString().padStart(2, '0');

		const startDateStr = `${year}${monthStr}01000000`;
		const lastDay = new Date(year, month, 0).getDate();
		const lastDayStr = lastDay.toString().padStart(2, '0');
		const endDateStr = `${year}${monthStr}${lastDayStr}235959`;

		const monthPromise = db.order.findAll({
			where: {
				created_at: {
					[Op.gte]: startDateStr,
					[Op.lte]: endDateStr,
				},
				del_flag: '0',
			},
			attributes: ['final_amount'],
		});

		monthPromises.push(monthPromise);
	}

	const monthResults = await Promise.all(monthPromises);

	monthResults.forEach((orders, index) => {
		const monthRevenue = orders.reduce((sum, order) => {
			const amt = Number(order.final_amount);
			return sum + (Number.isFinite(amt) ? amt : 0);
		}, 0);

		const orderCount = orders.length;

		chartData.push({
			month: monthNames[index],
			revenue: monthRevenue,
			orderCount,
		});
	});

	return chartData;
}

module.exports = {
	revenue,
	revenueYear,
};
