var config = require('../config');
var projectName = config.projectName.replace(/ /g, '');
var db = window.openDatabase(projectName, "1.0", projectName, 1024*1024*20 /*20mb*/);
var Cache = {};
Cache.models = {};

Cache.initialize = function (expireTime) {
	Cache.expireTime = expireTime;
	if (App.database.get('cacheInitialized')) return;

	var sql = "CREATE TABLE IF NOT EXISTS data (name VARCHAR(255), value TEXT, timestamp INTEGER, PRIMARY KEY (name))";
	query(sql, [], function() {
		App.database.set('cacheInitialized', true);
	}, function(err) {
		console.error(err);
	});
}

Cache.write = function (name, value, success, error) {
	var sql = `INSERT OR REPLACE INTO data (name, value, timestamp) VALUES (?, ?, ?)`;
	var params = [name, JSON.stringify(value), Date.now()];
	return query(sql, params, success, error);
}

Cache.read = function (name, success, error) {
	return query("SELECT * FROM data WHERE name = ?", [name], function(tx, result) {
		console.log(result);
		if (result.rows.length === 0)	return error('no rows');
		if (parseInt(result.rows[0].timestamp + Cache.expireTime) < Date.now()) {
			query('DELETE FROM data WHERE name = ?', [name]);
			return error ('expired at ' + parseInt(result.rows[0].timestamp + Cache.expireTime));
		}
		return success(JSON.parse(result.rows[0].value));
	}, error);
}

function query (sql, params, success, error) {
	db.transaction(function (tx) {
	  tx.executeSql(sql, params, success, error);
	});
}

module.exports = Cache;
