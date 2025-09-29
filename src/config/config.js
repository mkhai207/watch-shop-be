const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string()
			.valid('production', 'development', 'test')
			.required(),
		PORT: Joi.number().default(3000),

		JWT_SECRET: Joi.string().required().description('JWT secret key'),
		JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
			.default(30)
			.description('minutes after which access tokens expire'),
		JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
			.default(30)
			.description('days after which refresh tokens expire'),

		COOKIE_EXPIRATION_HOURS: Joi.number()
			.default(24)
			.description('hours after which httpOnly cookie expire'),

		DATABASE_URL: Joi.string()
			.uri({ scheme: ['postgres', 'postgresql'] })
			// .required()
			.description('Full Postgres connection string'),

		SQL_USERNAME: Joi.string().description('sqldb username'),
		SQL_HOST: Joi.string().description('sqldb host'),
		SQL_DATABASE_NAME: Joi.string().description('sqldb database name'),
		SQL_PASSWORD: Joi.string().description('sqldb password'),
		SQL_PORT: Joi.number().default(5432).description('sqldb port'),
		SQL_SSL: Joi.boolean()
			.truthy('true')
			.falsy('false')
			.default(false)
			.description('enable SSL/TLS for sqldb connection'),
		SQL_SSL_REJECT_UNAUTHORIZED: Joi.boolean()
			.truthy('true')
			.falsy('false')
			.default(false)
			.description('reject unauthorized SSL certs'),
		SQL_DIALECT: Joi.string()
			.default('postgres')
			.description('type of sqldb'),
		SQL_MAX_POOL: Joi.number()
			.default(10)
			.min(5)
			.description('sqldb max pool connection'),
		SQL_MIN_POOL: Joi.number()
			.default(0)
			.min(0)
			.description('sqldb min pool connection'),
		SQL_IDLE: Joi.number()
			.default(10000)
			.description('sqldb max pool idle time in miliseconds'),

		SMTP_HOST: Joi.string().description('server that will send the emails'),
		SMTP_PORT: Joi.number().description(
			'port to connect to the email server'
		),
		SMTP_USERNAME: Joi.string().description('username for email server'),
		SMTP_PASSWORD: Joi.string().description('password for email server'),
		EMAIL_FROM: Joi.string().description(
			'the from field in the emails sent by the app'
		),
		CLOUDINARY_CLOUD_NAME: Joi.string()
			.required()
			.description('Cloudinary cloud name'),
		CLOUDINARY_API_KEY: Joi.string()
			.required()
			.description('Cloudinary API key'),
		CLOUDINARY_API_SECRET: Joi.string()
			.required()
			.description('Cloudinary API secret'),

		VNPAY_TMNCODE: Joi.string().required().description('VNPAY TmnCode'),
		VNPAY_HASH_SECRET: Joi.string()
			.required()
			.description('VNPAY Hash Secret'),
		VNPAY_URL: Joi.string()
			.uri()
			.required()
			.description('VNPAY Payment URL'),
		VNPAY_RETURN_URL: Joi.string()
			.uri()
			.required()
			.description('VNPAY Return URL'),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	pagination: {
		limit: 10,
		page: 1,
	},
	jwt: {
		secret: envVars.JWT_SECRET,
		accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
		resetPasswordExpirationMinutes: 10,
	},
	cookie: {
		cookieExpirationHours: envVars.COOKIE_EXPIRATION_HOURS,
	},
	sqlDB: {
		connectionString: envVars.DATABASE_URL, // connection string dùng cho supabase db
		user: envVars.SQL_USERNAME,
		host: envVars.SQL_HOST,
		database: envVars.SQL_DATABASE_NAME,
		password: envVars.SQL_PASSWORD,
		port: envVars.SQL_PORT,
		dialect: envVars.SQL_DIALECT,
		ssl: envVars.SQL_SSL
			? { rejectUnauthorized: envVars.SQL_SSL_REJECT_UNAUTHORIZED }
			: false,
		pool: {
			max: envVars.SQL_MAX_POOL,
			min: envVars.SQL_MIN_POOL,
			idle: envVars.SQL_IDLE,
		},
		define: {
			/**
			 * All tables won't have "createdAt" and "updatedAt" Auto fields.
			 * References: https://sequelize.org/master/manual/model-basics.html#timestamps
			 */
			timestamps: false,
			// Table names won't be pluralized.
			freezeTableName: true,
			// Column names will be underscored.
			underscored: true,
		},
		dialectOptions: envVars.SQL_SSL
			? {
					ssl: {
						require: true,
						rejectUnauthorized: envVars.SQL_SSL_REJECT_UNAUTHORIZED,
					},
			  }
			: {},
	},
	email: {
		smtp: {
			host: envVars.SMTP_HOST,
			port: envVars.SMTP_PORT,
			auth: {
				user: envVars.SMTP_USERNAME,
				pass: envVars.SMTP_PASSWORD,
			},
		},
		from: envVars.EMAIL_FROM,
	},
	cloudinary: {
		cloudName: envVars.CLOUDINARY_CLOUD_NAME,
		apiKey: envVars.CLOUDINARY_API_KEY,
		apiSecret: envVars.CLOUDINARY_API_SECRET,
	},
	vnpay: {
		tmnCode: envVars.VNPAY_TMNCODE,
		hashSecret: envVars.VNPAY_HASH_SECRET,
		url: envVars.VNPAY_URL,
		returnUrl: envVars.VNPAY_RETURN_URL,
	},
};
