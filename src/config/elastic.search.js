// const { Client } = require('@elastic/elasticsearch');
// const config = require('./config');

// const { node, username, password } = config.elasticSearch;

// const client = new Client({
// 	node,
// 	...(username && password ? { auth: { username, password } } : {}),
// 	sniffOnStart: false,
// 	sniffOnConnectionFault: false,
// });

// module.exports = client;

const { Client } = require('@opensearch-project/opensearch-js');

const config = require('./config');

const { node, username, password } = config.elasticSearch;

const client = new Client({
	node,
	...(username && password ? { auth: { username, password } } : {}),
});

module.exports = client;
