const { Op } = require('sequelize');
const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');
const cartItemService = require('./cart.item.service');

async function getCart(req) {
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
	return cart;
}

async function createCart(req) {
	let createdCart = {};
	createdCart = await getCart(req);
	if (!createdCart)
		createdCart = await db.cart.create({
			user_id: req.user ? req.user.userId : null,
			session_id: req.sessionId ? req.sessionId : null,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			updated_by: req.user.userId,
		});
	if (!createdCart) {
		return { success: false };
	}
	req.body.cart_id = Number(createdCart.id);
	const createdCartItem = await cartItemService.createCartItem(req);

	if (createdCartItem) {
		createdCart = await createdCart
			.update({
				total_money:
					(createdCart.total_money ?? 0) +
					createdCartItem.total_price,
			})
			.then((resultEntity) => resultEntity.get({ plain: true }));
	}

	return { createdCart, createdCartItem };
}

async function getCartMe(req) {
	let cart = {};

	if (req.user) {
		cart = await db.cart.findOne({
			where: { user_id: req.user.userId, del_flag: '0' },
		});
	}

	if (req.sessionId && !req.user) {
		cart = await db.cart.findOne({
			where: { session_id: req.sessionId, del_flag: '0' },
		});
	}

	if (!cart) {
		cart = await createCart(req);
	}

	const cartItems = await cartItemService.getCartItemsByCartId(req, cart.id);

	return { cart, cartItems };
}

async function updateCart(req) {
	const conditions = [];
	if (req.user.userId) {
		conditions.push({ user_id: req.user.userId });
	}
	if (req.sessionId && !req.user) {
		conditions.push({ session_id: req.sessionId });
	}
	const updatedCart = await db.cart
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: {
					[Op.or]: conditions,
				},
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedCart;
}

async function deleteCartMe(req) {
	let cart = {};

	if (req.user) {
		cart = await db.cart.findOne({
			where: { user_id: req.user.userId, del_flag: '0' },
		});
	}

	if (req.sessionId && !req.user) {
		cart = await db.cart.findOne({
			where: { session_id: req.sessionId, del_flag: '0' },
		});
	}

	if (!cart) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Your cart not found');
	}

	const deletedCart = await cart
		.update({
			del_flag: '1',
			updated_at: getCurrentDateYYYYMMDDHHMMSS(),
			updated_by: req.user.userId,
		})
		.then((data) => data[1]);

	return deletedCart;
}
module.exports = {
	getCartMe,
	createCart,
	updateCart,
	deleteCartMe,
	getCart,
};
