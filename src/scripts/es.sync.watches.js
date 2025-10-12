const { syncAllWatches } = require('../services/watch.sync.service');
const logger = require('../config/logger');

(async () => {
	try {
		logger.info('Bắt đầu đồng bộ toàn bộ đồng hồ lên Elasticsearch...');
		const result = await syncAllWatches();
		logger.info(`Đồng bộ hoàn tất! Đã đẩy ${result.total} document.`);
	} catch (error) {
		logger.error('Lỗi khi đồng bộ:', error);
	} finally {
		process.exit(0);
	}
})();
