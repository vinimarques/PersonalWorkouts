const Model = require('./model');
const crypto = require('crypto');

class Consts extends Model {
	static All() {
		const user_type = Model.query(`SELECT * FROM user_type`);
		const difficulty = Model.query(`SELECT * FROM difficulty`);

		return Promise.all([user_type,difficulty]);
	}
}

module.exports = Consts;
