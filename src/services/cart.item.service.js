const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');
const watchService = require('./watch.service');
const watchVariantService = require('./watch.variant.service');

async function getCartItemById(cartItemId) {
	const cartItem = await db.cartItem.findOne({
		where: { id: cartItemId, del_flag: '0' },
		include: [
			{
				model: db.cart,
				as: 'cart',
			},
		],
	});
	return cartItem;
}
async function getCartItems(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			cart_id: { type: 'number', op: 'eq' },
			created_at: { type: 'date', op: 'range' },
			del_flag: { type: 'string', op: 'eq', default: '0' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['id', 'created_at']);

	const cartItems = await db.cartItem.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return cartItems;
}

async function getCartItemsByCartId(req, cartId) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const order = buildOrder(req.query.sort, ['id', 'created_at']);

	const cartItems = await db.cartItem.findAndCountAll({
		where: { cart_id: cartId },
		order,
		include: [
			{
				model: db.watchVariant,
				as: 'variant',
				include: [
					{
						model: db.watch,
						as: 'watch',
					},
					{
						model: db.color,
						as: 'color',
						attributes: ['id', 'name'],
					},
					{
						model: db.strapMaterial,
						as: 'strapMaterial',
						attributes: ['id', 'name'],
					},
				],
			},
		],
		limit,
		offset,
	});

	return cartItems;
}

async function updateCartItem(cartItemId, updates, userId) {
	const existedCartItem = await db.cartItem.findOne({
		where: { id: cartItemId, del_flag: '0' },
	});

	if (!existedCartItem) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Cart item not found');
	}

	const updatedCartItem = await existedCartItem.update({
		...updates,
		total_price: updates.quantity * existedCartItem.unit_price,
		updated_at: getCurrentDateYYYYMMDDHHMMSS(),
		updated_by: userId,
	});

	return updatedCartItem.get({ plain: true });
}

async function getCartItem(cartItemId) {
	const cartItem = await db.cartItem.findOne({
		where: { id: cartItemId, del_flag: '0' },
	});
	return cartItem;
}

async function createCartItem(req) {
	const { cart_id, variant_id, quantity } = req.body;
	const variant = await watchVariantService.getVariantById(variant_id);
	if (!variant) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
	}
	const watch = await watchService.getWatchById(variant.watch_id);
	const unitPrice = watch.base_price + variant.price;

	if (variant && variant.stock_quantity < quantity) {
		return { success: false, message: 'Sản phẩm không đủ số lượng' };
	}

	const existedCartItem = await db.cartItem.findOne({
		where: { cart_id, variant_id, del_flag: '0' },
	});

	if (existedCartItem) {
		const newQuantity = existedCartItem.quantity + quantity;

		return updateCartItem(
			existedCartItem.id,
			{
				quantity: newQuantity,
				total_price: existedCartItem.unit_price * newQuantity,
			},
			req.user ? req.user.userId : null
		);
	}

	const createdCartItem = await db.cartItem
		.create({
			...req.body,
			unit_price: unitPrice,
			total_price: unitPrice * quantity,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user ? req.user.userId : null,
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdCartItem;
}

async function deleteCartItem(req) {
	const deletedRow = await db.cartItem.destroy({
		where: { id: req.params.cartItemId },
	});

	return deletedRow;
}

async function deleteCartItems(req) {
	const conditions = [];
	if (req.user.userId) {
		conditions.push({ user_id: req.user.userId });
	}
	if (req.sessionId && !req.user.userId) {
		conditions.push({ session_id: req.sessionId });
	}
	const cart = await db.cart.findOne({
		where: { [Op.or]: conditions, del_flag: '0' },
	});

	const deletedCartItem = await db.cartItem.destroy({
		where: { id: req.body.cartItemIds, cart_id: cart.id },
	});

	return deletedCartItem;
}

module.exports = {
	getCartItems,
	updateCartItem,
	getCartItem,
	createCartItem,
	deleteCartItem,
	getCartItemsByCartId,
	deleteCartItems,
	getCartItemById,
};
