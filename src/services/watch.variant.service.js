const httpStatus = require('http-status');
const { getOffset, buildOrder, buildFilters } = require('../utils/query');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const db = require('../db/models');
const { getCurrentDateYYYYMMDDHHMMSS } = require('../utils/datetime');

async function getVariantById(brandId) {
	const brand = await db.brand.findOne({
		where: { id: brandId, del_flag: '0' },
	});

	return brand;
}
module.exports = {
	getVariantById,
};
