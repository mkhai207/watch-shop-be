const { cancelOrderUnpaid } = require('../services/order.service');

const run = async () => {
	try {
		console.log('[CRON] cancelOrderUnpaid started');
		await cancelOrderUnpaid();
		console.log('[CRON] cancelOrderUnpaid finished');
		process.exit(0);
	} catch (err) {
		console.error('[CRON] cancelOrderUnpaid failed:', err);
		process.exit(1);
	}
};

run();
