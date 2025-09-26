const { Client } = require('pg');
const dns = require('dns');
const { parse } = require('pg-connection-string');
const config = require('./config');
const logger = require('./logger');

let client;

// (async function name() {
// 	client = new Client(config.sqlDB);
// 	try {
// 		await client.connect();
// 		logger.info('Connect to postgress sucessfully');
// 		return client;
// 	} catch (error) {
// 		logger.error('Connect to postgress error');
// 		process.exit(1);
// 	}
// })();

(async function name() {
	const configObj = parse(config.sqlDB.connectionString);

	client = new Client({
		user: configObj.user,
		password: configObj.password,
		host: configObj.host,
		port: parseInt(configObj.port, 10),
		database: configObj.database,
		ssl: { rejectUnauthorized: false },
		lookup: (hostname, opts, cb) => {
			dns.lookup(hostname, { family: 4 }, cb);
		},
	});
	try {
		await client.connect();
		logger.info('Connect to postgress sucessfully');
		return client;
	} catch (error) {
		logger.error('Connect to postgress error');
		logger.error(error);
		process.exit(1);
	}
})();

module.exports = {
	postgres: client,
};
