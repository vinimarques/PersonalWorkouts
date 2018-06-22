const Model = require('./model');
const crypto = require('crypto');

class Consts extends Model {
	static all () {
		return  Model.query(`SELECT * FROM user_type`);
	}
}

module.exports = Consts;
