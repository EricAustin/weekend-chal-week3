var pg = require('pg');

var config = {
	database: 'ericaustin', // the name of the database
	host: 'localhost', // where your database is located
	port: 5432, // the port number for your database
	max: 10, // the number of connections allowed at a time
	idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

// what goes on the left side of line 12?
module.exports = pg.Pool(config);