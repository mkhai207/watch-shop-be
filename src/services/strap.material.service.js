const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getStrapMaterialById(strapMaterialId) {
	const strapMaterial = await db.strapMaterial.findOne({
		where: { id: strapMaterialId, del_flag: '0' },
	});

	return strapMaterial;
}

async function getStrapMaterialByCode(code) {
	const strapMaterial = await db.strapMaterial.findOne({
		where: { code, del_flag: '0' },
	});

	return strapMaterial;
}

async function getStrapMaterials(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const schema = {
		root: {
			code: { type: 'string', op: 'like' },
			name: { type: 'string', op: 'like' },
			created_at: { type: 'date', op: 'range' },
			del_flag: { type: 'string', op: 'eq', default: '0' },
		},
	};

	const { where } = buildFilters(req.query, schema);
	const order = buildOrder(req.query.sort, ['code', 'name', 'id']);

	const strapMaterials = await db.strapMaterial.findAndCountAll({
		where,
		order,
		limit,
		offset,
		raw: true,
	});

	return strapMaterials;
}

async function createStrapMaterial(req) {
	const { code } = req.body;
	const existedStrapMaterial = await getStrapMaterialByCode(code);

	if (existedStrapMaterial) {
		throw new ApiError(
			httpStatus.CONFLICT,
			'This Strap material already exits'
		);
	}

	const createdStrapMaterial = await db.strapMaterial
		.create({
			...req.body,
			created_at: getCurrentDateYYYYMMDDHHMMSS(),
			created_by: req.user.userId,
			del_flag: '0',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdStrapMaterial;
}

async function updateStrapMaterial(req) {
	const updatedStrapMaterial = await db.strapMaterial
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				...req.body,
			},
			{
				where: { id: req.params.strapMaterialId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedStrapMaterial;
}

async function deleteStrapMaterialById(req) {
	const deletedStrapMaterial = await db.strapMaterial
		.update(
			{
				updated_at: getCurrentDateYYYYMMDDHHMMSS(),
				updated_by: req.user.userId,
				del_flag: '1',
			},
			{
				where: { id: req.params.strapMaterialId },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return deletedStrapMaterial;
}
module.exports = {
	getStrapMaterialById,
	getStrapMaterials,
	createStrapMaterial,
	updateStrapMaterial,
	deleteStrapMaterialById,
};
