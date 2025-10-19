const httpStatus = require('http-status');
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

dayjs.extend(customParseFormat);

async function getDiscountById(discountId) {
	const discount = await db.discount.findOne({
		where: {
			id: discountId,
			del_flag: '0',
		},
	});
	return discount;
}

async function getDiscountByCode(code) {
	const discount = await db.discount.findOne({
		where: {
			code,
			del_flag: '0',
		},
	});
	return discount;
}

async function createDiscount(req) {
	const {
		code,
		name,
		description = null,
		min_order_value = null,
		max_discount_amount = null,
		discount_type,
		discount_value,
		effective_date,
		valid_until = null,
	} = req.body;

	if (
		dayjs(effective_date, 'YYYYMMDDHHmmss').isAfter(
			dayjs(valid_until, 'YYYYMMDDHHmmss')
		)
	) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Effective date must be before valid until date'
		);
	}

	if (discount_type === '1') {
		if (discount_value < 0 || discount_value > 100) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				'For percentage discount type, discount value must be between 0 and 100'
			);
		}
	}

	const existedDiscount = await getDiscountByCode(req.body.code);
	if (existedDiscount) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Discount code already exists'
		);
	}

	const newDiscount = await db.discount.create({
		code,
		name,
		description,
		min_order_value,
		max_discount_amount,
		discount_type,
		discount_value,
		effective_date,
		valid_until,
		created_at: getCurrentDateYYYYMMDDHHMMSS(),
		created_by: req.user.userId || 0,
	});

	return newDiscount;
}

async function getDiscounts(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			code: { type: 'string', op: 'like' },
			name: { type: 'string', op: 'like' },
			discount_type: { type: 'string', op: 'eq' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, [
		'code',
		'name',
		'min_order_value',
		'max_discount_amount',
		'discount_value',
		'effective_date',
		'valid_until',
		'created_at',
	]);

	const { count, rows } = await db.discount.findAndCountAll({
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

async function getDiscountsValid(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			code: { type: 'string', op: 'like' },
		},
	};

	const { where } = buildFilters(req.query, schema);

	const now = dayjs().format('YYYYMMDDHHmmss');
	where.effective_date = { [Op.lte]: now };
	where.valid_until = { [Op.gte]: now };

	const order = buildOrder(req.query.sort, [
		'code',
		'name',
		'min_order_value',
		'max_discount_amount',
		'discount_value',
		'effective_date',
		'valid_until',
		'created_at',
	]);

	const { count, rows } = await db.discount.findAndCountAll({
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

async function updateDiscount(req) {
	const { discountId } = req.params;
	const discount = await db.discount.findOne({
		where: { id: discountId, del_flag: '0' },
	});
	if (!discount) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found');
	}

	if (req.body.discount_type === '1') {
		if (req.body.discount_value < 0 || req.body.discount_value > 100) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				'For percentage discount type, discount value must be between 0 and 100'
			);
		}
	}

	const updatedDiscount = await discount.update({
		...req.body,
		updated_at: getCurrentDateYYYYMMDDHHMMSS(),
		updated_by: req.user.userId || 0,
	});
	return updatedDiscount;
}

async function deleteDiscount(req) {
	const { discountId } = req.params;
	const discount = await db.discount.findOne({
		where: { id: discountId, del_flag: '0' },
	});
	if (!discount) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found');
	}
	const deletedDiscount = await discount.update({
		del_flag: '1',
		updated_at: getCurrentDateYYYYMMDDHHMMSS(),
		updated_by: req.user.userId || 0,
	});
	return deletedDiscount;
}

async function checkApplyDiscount(req) {
	const discount = await getDiscountByCode(req.body.discount_code);
	if (!discount) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Discount code not found');
	}
	const currentDate = new Date();
	const effectiveDate = dayjs(
		discount.effective_date,
		'YYYYMMDDHHmmss'
	).toDate();
	if (currentDate < effectiveDate) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Discount code is not yet effective'
		);
	}
	if (discount.valid_until) {
		const validUntil = dayjs(
			discount.valid_until,
			'YYYYMMDDHHmmss'
		).toDate();
		if (currentDate > validUntil) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				'Discount code has expired'
			);
		}
	}
	if (
		discount.min_order_value &&
		req.body.order_value < discount.min_order_value
	) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			`Order value must be at least ${discount.min_order_value} to apply this discount`
		);
	}

	let discountAmount = 0;
	if (discount.discount_type === '0') {
		// fixed
		if (discount.discount_value) {
			discountAmount = Math.min(
				discount.discount_value,
				discount.max_discount_amount || discount.discount_value
			);
		}
	}
	// percentage
	if (discount.discount_value) {
		discountAmount = Math.floor(
			(req.body.order_value * discount.discount_value) / 100
		);
		if (discount.max_discount_amount) {
			discountAmount = Math.min(
				discountAmount,
				discount.max_discount_amount
			);
		}
	}

	return {
		success: true,
		discount_value: discountAmount,
	};
}
module.exports = {
	createDiscount,
	getDiscounts,
	getDiscountByCode,
	checkApplyDiscount,
	updateDiscount,
	deleteDiscount,
	getDiscountsValid,
	getDiscountById,
};
