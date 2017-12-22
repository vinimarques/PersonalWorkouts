const Model = require('./model');

class Tracking extends Model {

	static first (users_id, date) {
		return Model.query(`
			SELECT time FROM tracking
			WHERE users_id = ? AND date = ?
			ORDER BY time desc
		`, [users_id, date]);
	}

	static insert (data) {
		return Model.insert(data, 'tracking');
	}
}

module.exports = Tracking;
