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
			},
		});

	const { count: countUser, rows: rowUsers } = await db.user.findAndCountAll({
		where: {
			created_at: {
				[Op.gte]: req.query.startDate,
				[Op.lte]: req.query.endDate,
			},
		},
	});

	const { count: countBrand, rows: rowBrands } =
		await db.brand.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
			},
		});

	const { count: countCategory, rows: rowCategories } =
		await db.category.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
			},
		});

	const { count: countDiscount, rows: rowDiscounts } =
		await db.discount.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
			},
		});

	const { count: countReview, rows: rowReviews } =
		await db.review.findAndCountAll({
			where: {
				created_at: {
					[Op.gte]: req.query.startDate,
					[Op.lte]: req.query.endDate,
				},
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

module.exports = {
	revenue,
};
