const { Client } = require('@elastic/elasticsearch');
const config = require('./config');

const { node, username, password } = config.elasticSearch;

const client = new Client({
	node,
	...(username && password ? { auth: { username, password } } : {}),
	sniffOnStart: false,
	sniffOnConnectionFault: false,
});

module.exports = client;
