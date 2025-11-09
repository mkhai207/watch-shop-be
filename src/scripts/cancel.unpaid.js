const db = require('../db/models');
const { cancelOrderUnpaid } = require('../services/order.service');

const run = async () => {
	try {
		console.log('Starting cron script: cancelOrderUnpaid...');

		await cancelOrderUnpaid();

		console.log('Cron script finished successfully.');

		await db.sequelize.close();

		process.exit(0);
	} catch (err) {
		console.error('Cron script failed:', err);

		if (db.sequelize) {
			await db.sequelize.close();
		}

		process.exit(1);
	}
};

run();
