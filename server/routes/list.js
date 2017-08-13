var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');


router.get('/', function (req, res) {
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('SELECT * FROM todosql;', function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.send(result.rows); 
				}
			});
		}
	});
});

router.post('/', function (req, res) {
	console.log('add item post was hit');

	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {

			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {

			client.query('INSERT INTO todosql(task, complete) VALUES($1, $2);', [req.body.task, false], function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
		}
	});
});

router.put('/complete/:id', function (req, res) {
	var itemId = req.params.id;
	console.log('complete itemId is', itemId);
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
            console.log('updating sql to true');
            
			client.query('UPDATE todosql SET complete=true WHERE id=$1;', [itemId], function (errorMakingQuery, result) {
					done();
					if (errorMakingQuery) {
						console.log('Error making database query', errorMakingQuery);
						res.sendStatus(500);
					} else {
						res.sendStatus(200);
					}
				});
		}
	});
});

router.put('/incomplete/:id', function (req, res) {
	var itemId = req.params.id;
	console.log('incomplete itemId is', itemId);
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
            console.log('upating sql to false');
            
			client.query('UPDATE todosql SET complete=false WHERE id=$1;', [itemId], function (errorMakingQuery, result) {
					done();
					if (errorMakingQuery) {
						console.log('Error making database query', errorMakingQuery);
						res.sendStatus(500);
					} else {
						res.sendStatus(200);
					}
				});
		}
	});
});

router.delete('/:id', function (req, res) {
	var itemId = req.params.id;
	console.log('delete itemId is', itemId);
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('DELETE FROM todosql WHERE id=$1',
				[itemId],
				function (errorMakingQuery, result) {
					done();
					if (errorMakingQuery) {
						console.log('Error making database query', errorMakingQuery);
						res.sendStatus(500);
					} else {
						res.sendStatus(200);
					}
				});
		}
	});
});






module.exports = router;