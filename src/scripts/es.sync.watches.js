const { syncAllWatches } = require('../services/watch.sync.service');
const createWatchIndex = require('../services/watch.index.service');
const client = require('../config/elastic.search');
const logger = require('../config/logger');

(async () => {
	const indexName = 'watch_shop';
	try {
		logger.info('Chuẩn bị đồng bộ toàn bộ đồng hồ lên Elasticsearch...');

		// Xóa index cũ (nếu có) để đảm bảo mapping chuẩn
		const exists = await client.indices.exists({ index: indexName });
		if (exists) {
			logger.warn(
				`Index '${indexName}' đã tồn tại. Tiến hành xóa để khởi tạo lại mapping...`
			);
			await client.indices.delete({ index: indexName });
			logger.info(`Đã xóa index '${indexName}'.`);
		}

		// Tạo lại index với mapping đúng
		await createWatchIndex();

		// Đồng bộ dữ liệu
		const result = await syncAllWatches();
		logger.info(`Đồng bộ hoàn tất! Đã đẩy ${result.total} document.`);
	} catch (error) {
		logger.error('Lỗi khi đồng bộ:', error);
		process.exitCode = 1;
	} finally {
		process.exit();
	}
})();
