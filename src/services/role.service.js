const httpStatus = require('http-status');
const { getOffset, buildOrder } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getRoleById(roleId) {
	const role = await db.role.findOne({
		where: { id: roleId, del_flag: '0' },
	});

	return role;
}

async function getRoleByName(name) {
	const role = await db.role.findOne({
		where: { name, del_flag: '0' },
	});

	return role;
}

async function getRoleByCode(code) {
	const role = await db.role.findOne({
		where: { code, del_flag: '0' },
	});

	return role;
}

async function getRoles(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const order = buildOrder(req.query.sort, ['name', 'code', 'id']);

	const roles = await db.role.findAndCountAll({
		order,
		limit,
		offset,
		raw: true,
	});

	return roles;
}

async function createRole(req) {
	const { code, name, description = '' } = req.body;
	const existedRole = await getRoleByCode(code);

	if (existedRole) {
		throw new ApiError(httpStatus.CONFLICT, 'This role already exits');
	}

	const createdRole = await db.role
		.create({
			code: code.toUpperCase(),
			name,
			description,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdRole;
}

async function updateRole(req) {
	const updatedRole = await db.role
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.roleId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedRole;
}

async function deleteRoleById(req) {
	const deletedRole = await db.role
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.roleId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedRole;
}
module.exports = {
	getRoleById,
	getRoles,
	createRole,
	updateRole,
	deleteRoleById,
};
