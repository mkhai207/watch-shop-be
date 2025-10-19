const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');
const orderService = require('./order.service');
const orderStatusService = require('./order.status.service');
const watchSyncService = require('./watch.sync.service');

async function createReview(req) {
	const { rating, comment, image_url, user_id, order_id } = req.body;

	const order = await orderService.getOrderById(order_id);
	const watch_ids = [
		...new Set(order.details.map((item) => item.variant.watch.id)),
	];
	if (!order) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
	}
	const currStatus = await orderStatusService.getOrderStatusById(
		order.current_status_id
	);
	if (!currStatus || currStatus.code.toLowerCase() !== 'completed') {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Order is not completed');
	}

	const existedReview = await db.review.findOne({
		where: { user_id, order_id, del_flag: '0' },
	});
	if (existedReview) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'You have already reviewed this product in this order'
		);
	}

	const reviewDatas = watch_ids.map((watch_id) => ({
		rating,
		comment,
		image_url,
		user_id,
		order_id,
		watch_id,
		created_at: getCurrentDateYYYYMMDDHHMMSS(),
		created_by: req.user.userId || 0,
		del_flag: '0',
	}));

	const createdReviews = await db.review.bulkCreate(reviewDatas, {
		returning: true,
	});

	if (!createdReviews || createdReviews.length === 0) {
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Failed to create review'
		);
	}

	await order.update({
		review_flag: '1',
		updated_at: getCurrentDateYYYYMMDDHHMMSS(),
		updated_by: req.user.userId || 0,
	});

	watch_ids.forEach(async (watch_id) => {
		const reviews = await db.review.findAll({
			where: { watch_id, del_flag: '0' },
			attributes: ['rating'],
		});
		const avgRating =
			reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
		await db.watch.update(
			{
				rating: avgRating,
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId || 0,
			},
			{ where: { id: watch_id } }
		);

		await watchSyncService.syncOneWatch(watch_id);
	});

	return createdReviews;
}

async function getReviews(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			rating: { type: 'number', op: 'range' },
			user_id: { type: 'number', op: 'eq' },
			order_id: { type: 'number', op: 'eq' },
			watch_id: { type: 'number', op: 'eq' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['rating']);

	const { count, rows } = await db.review.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return {
		page,
		limit,
		totalItems: count,
		totalPages: Math.ceil(count / limit),
		items: rows,
	};
}

async function updateReview(req) {
	const { reviewId } = req.params;

	const review = await db.review.findOne({
		where: { id: reviewId, del_flag: '0' },
	});
	if (!review) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
	}

	const updatedReview = await review.update(
		{
			...req.body,
			updated_at: getCurrentDateYYYYMMDDHHMMSS(),
			updated_by: req.user.userId || 0,
		},
		{ where: { id: reviewId, del_flag: '0' } }
	);

	return updatedReview;
}

async function deleteReview(req) {
	const { reviewId } = req.params;
	const review = await db.review.findOne({
		where: { id: reviewId, del_flag: '0' },
	});
	if (!review) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
	}
	const deletedReview = await review.update(
		{
			del_flag: '1',
			updated_at: getCurrentDateYYYYMMDDHHMMSS(),
			updated_by: req.user.userId || 0,
		},
		{ where: { id: reviewId, del_flag: '0' } }
	);
	return deletedReview;
}

module.exports = {
	createReview,
	getReviews,
	updateReview,
	deleteReview,
};
