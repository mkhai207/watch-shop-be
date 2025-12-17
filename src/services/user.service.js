const httpStatus = require('http-status');
const { getOffset, buildFilters, buildOrder } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const { encryptData } = require('../utils/auth');
const config = require('../config/config');
const db = require('../db/models');
const roleService = require('./role.service');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getMe(req) {
	const user = await db.user.findOne({
		where: { id: req.user.userId, del_flag: '0' },
		include: [
			{
				model: db.role,
				as: 'role',
				require: true,
				attributes: ['id', 'name', 'code'],
			},
		],
	});

	return user;
}

async function getUserByEmail(email) {
	const user = await db.user.findOne({
		where: { email, del_flag: '0' },
		include: [
			{
				model: db.role,
				as: 'role',
				require: true,
				attributes: ['id', 'name'],
			},
		],
		raw: true,
	});

	return user;
}

async function getUserByUsername(userName) {
	const user = await db.user.findOne({
		where: { username: userName, del_flag: '0', status: '0' },
		include: [
			{
				model: db.role,
				as: 'role',
				require: true,
				attributes: ['id', 'name', 'code'],
			},
		],
	});

	return user;
}

async function getUserById(id) {
	const user = await db.user.findOne({
		where: { id },
		include: [
			{
				model: db.role,
				as: 'role',
				require: true,
				attributes: ['id', 'name'],
			},
		],
		raw: true,
	});

	return user;
}

async function createUser(req) {
	const { email, fistName, lastName, userName, password, roleId } = req.body;
	const hashedPassword = await encryptData(password);
	const user = await getUserByEmail(email);

	if (user) {
		throw new ApiError(httpStatus.CONFLICT, 'This email already exits');
	}

	const role = await roleService.getRoleById(roleId);

	if (!role) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
	}

	const createdUser = await db.user
		.create({
			first_name: fistName,
			last_name: lastName,
			username: userName,
			email,
			role_id: roleId,
			password: hashedPassword,
			status: '0',
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdUser;
}

async function createUserOther(userData) {
	const { email, fistName, lastName, userName, password, roleId } = userData;
	const hashedPassword = await encryptData(password);
	const user = await getUserByEmail(email);

	if (user) {
		throw new ApiError(httpStatus.CONFLICT, 'This email already exits');
	}

	const role = await roleService.getRoleById(roleId);

	if (!role) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
	}

	const createdUser = await db.user
		.create({
			first_name: fistName,
			last_name: lastName,
			username: userName,
			email,
			role_id: roleId,
			password: hashedPassword,
			status: '0',
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdUser;
}

async function getUsers(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			name: { type: 'string', op: 'like' },
			email: { type: 'string', op: 'like' },
			status: { type: 'exact', op: 'eq' },
			created_at: { type: 'date', op: 'range' },
		},
		include: {
			role: {
				model: db.role,
				as: 'role',
				attributes: ['id', 'name'],
				fields: {
					id: { type: 'number', op: 'eq' },
					name: { type: 'string', op: 'like' },
					status: { type: 'string', op: 'eq' },
				},
			},
		},
	};

	const { where, include } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['name', 'created_at', 'id']);
	const { count, rows } = await db.user.findAndCountAll({
		where,
		order,
		include,
		attributes: [
			'id',
			'code',
			'username',
			'email',
			'phone_number',
			'first_name',
			'last_name',
			'gender',
			'date_of_birth',
			'address',
			'status',
			'created_at',
			'created_by',
			'updated_at',
			'updated_by',
			'role_id',
		],
		offset,
		limit,
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

async function deleteUserById(userId) {
	const updatedUser = await db.user.update(
		{ del_flag: '1' },
		{ where: { id: userId } }
	);

	return updatedUser;
}

async function updateUser(req) {
	const { password, email } = req.body;

	if (password) {
		const hashedPassword = await encryptData(password);

		if (!hashedPassword) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				'Internal Server Error'
			);
		}

		req.body.password = hashedPassword;
	}

	if (email) {
		const existedUser = await getUserByEmail(email);

		if (existedUser) {
			throw new ApiError(
				httpStatus.CONFLICT,
				'This email is already exist'
			);
		}
	}

	const updatedUser = await db.user
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.userId || req.body.id },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedUser;
}

async function changePassword(password, id) {
	if (!id) return;
	let newPassword = password;
	if (password) {
		const hashedPassword = await encryptData(password);

		if (!hashedPassword) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				'Internal Server Error'
			);
		}

		newPassword = hashedPassword;
	}

	const updatedUser = await db.user
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: id || 0,
				password: newPassword,
			},
			{
				where: { id: id || 0 },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedUser;
}

module.exports = {
	getUserByEmail,
	getUserByUsername,
	getUserById,
	createUser,
	updateUser,
	getUsers,
	deleteUserById,
	getMe,
	createUserOther,
	changePassword,
};
