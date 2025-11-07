const { Op } = require('sequelize');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getAddressById(addressId) {
	const address = await db.address.findOne({
		where: { id: addressId, del_flag: '0' },
	});

	return address;
}

async function getAddressDefault(req) {
	const address = await db.address.findOne({
		where: { user_id: req.user.userId, is_default: '1', del_flag: '0' },
	});

	return address;
}

async function getAddresses(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	req.query.user_id = req.user.userId;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			created_at: { type: 'date', op: 'range' },
			del_flag: { type: 'string', op: 'eq', default: '0' },
			user_id: { type: 'number', op: 'eq' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['id', 'created_at']);

	const addresses = await db.address.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return addresses;
}

async function createAddress(req) {
	let { is_default } = req.body;

	const count = await db.address.count({ where: { del_flag: '0' } });

	if (count === 0) {
		is_default = '1';
	}

	if (count > 0 && is_default === '1') {
		await db.address.update(
			{ is_default: '0' },
			{ where: { del_flag: '0' } }
		);
	}

	const createdAddress = await db.address
		.create({
			...req.body,
			is_default,
			user_id: req.user.userId,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdAddress;
}

async function updateAddress(req) {
	const { is_default } = req.body;
	if (is_default === '1') {
		await db.address.update(
			{ is_default: '0' },
			{ where: { id: { [Op.ne]: req.params.addressId } } }
		);
	}
	const updatedAddress = await db.address
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.addressId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedAddress;
}

async function deleteAddressById(req) {
	const deletedAddress = await db.address
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.addressId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedAddress;
}
module.exports = {
	getAddressById,
	getAddressDefault,
	createAddress,
	getAddresses,
	deleteAddressById,
	updateAddress,
};
