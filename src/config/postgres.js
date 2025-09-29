const { Client } = require('pg');
const dns = require('dns');
const config = require('./config');
const logger = require('./logger');

let client;

const toSafeConfig = () => {
	const { connectionString, host, port, database, user } = config.sqlDB;

	return {
		host,
		port,
		database,
		user,
		hasConnectionString: Boolean(connectionString),
	};
};

(async function initPostgresClient() {
	const { connectionString, user, password, host, port, database } =
		config.sqlDB;

	const useConnectionString = Boolean(connectionString);

	const baseConfig = useConnectionString
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
		ssl:
			config.env === 'production'
				? { require: true, rejectUnauthorized: false }
				: undefined,
		lookup: (hostname, options, callback) => {
			dns.lookup(hostname, { ...(options || {}), family: 4 }, callback);
		},
	});

	try {
		await client.connect();
		logger.info('Connect to postgress sucessfully');
	} catch (error) {
		logger.error('Connect to postgress error');
		logger.error(`pg config snapshot: ${JSON.stringify(toSafeConfig())}`);
		logger.error(error.stack || error);
		process.exit(1);
	}
})();

module.exports = {
	postgres: () => client,
};
