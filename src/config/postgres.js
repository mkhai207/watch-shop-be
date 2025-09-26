const { Client } = require('pg');
const dns = require('dns');

const config = require('./config');
const logger = require('./logger');

let client;

const forceIPv4Lookup = (hostname, options, callback) => {
	const lookupOptions = {
		...(options || {}),
		family: 4,
		all: false,
	};
	dns.lookup(hostname, lookupOptions, callback);
};

(async function initPostgresClient() {
	const { connectionString, user, password, host, port, database } =
		config.sqlDB;

	const baseConfig = connectionString
		? { connectionString }
		: {
				user,
				password,
				host,
				port,
				database,
		  };

	client = new Client({
		...baseConfig,
		// Supabase (v� h?u h?t managed Postgres) y�u c?u SSL trong production.
		ssl:
			config.env === 'production'
				? { require: true, rejectUnauthorized: false }
				: undefined,
		lookup: forceIPv4Lookup,
	});

	try {
		await client.connect();
		logger.info('Connect to postgress sucessfully');
		return client;
	} catch (error) {
		logger.error('Connect to postgress error');
		logger.error(error.stack || error);
		process.exit(1);
	}
})();

module.exports = {
	postgres: () => client,
};
