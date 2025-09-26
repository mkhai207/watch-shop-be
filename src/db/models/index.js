/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require(`${__dirname}/../../config/config`);

const basename = path.basename(module.filename);

const db = {};

const {
	connectionString,
	database,
	user,
	password,
	host,
	dialect,
	pool,
	define,
} = config.sqlDB;

const baseOptions = {
	dialect,
	pool,
	define,
	logging: false,
};

let sequelize;

if (connectionString) {
	baseOptions.dialectOptions = {
		...baseOptions.dialectOptions,
		ssl: { require: true, rejectUnauthorized: false },
	};
	sequelize = new Sequelize(connectionString, baseOptions);
} else {
	sequelize = new Sequelize(database, user, password, {
		...baseOptions,
		host,
	});
}

fs.readdirSync(__dirname)
	.filter(
		(file) =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-9) === '.model.js'
	)
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
