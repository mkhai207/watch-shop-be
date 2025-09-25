const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');
const watchService = require('./watch.service');
const watchVariantService = require('./watch.variant.service');

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

async function updateCartItem(req) {
	const { quantity } = req.body;
	const existedCartItem = await db.cartItem.findOne({
		where: { id: req.params.cartItemId, del_flag: '0' },
	});

	const newQuantity = existedCartItem
		? existedCartItem.quantity + quantity
		: 0;
	const updatedCartItem = await db.cartItem
		.update(
			{
				quantity: newQuantity,
				total_price: newQuantity * existedCartItem.unit_price,
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
			},
			{
				where: { id: req.params.cartItemId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedCartItem;
}

async function getCartItem(cartItemId) {
	const cartItem = await db.cartItem.findOne({
		where: { id: cartItemId },
	});
	return cartItem;
}

async function createCartItem(req) {
	const { cart_id, variant_id, quantity } = req.body;
	const variant = await watchVariantService.getVariantById(variant_id);
	const watch = await watchService.getWatchById(variant.watch_id);
	const unitPrice = watch.base_price + variant.price;

	if (variant && variant.stock_quantity < quantity) {
		return { success: false };
	}

	const existedCartItem = await db.cartItem.findOne({
		where: { cart_id, variant_id },
	});
	if (existedCartItem) {
		const newQuantity = existedCartItem.quantity + quantity;
		req.body.quantity = newQuantity;
		req.body.total_price = existedCartItem.unit_price * newQuantity;

		await updateCartItem(req);
		const cartItem = await getCartItem(existedCartItem.id);
		return cartItem;
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

module.exports = {
	getCartItems,
	updateCartItem,
	getCartItem,
	createCartItem,
};
