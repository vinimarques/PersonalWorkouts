
const Model = require('./model');

class Calendar extends Model {

	static all(user_id) {
		return Model.query(`
			SELECT e.name as 'exercise_name', q.id, q.exercise_id, p.name as 'plan_name', c.date, c.plan_id
			FROM calendar as c
			LEFT JOIN day_exercise as d ON  d.id = c.day_exercise_id
			LEFT JOIN plan as p ON  p.id = c.plan_id
			WHERE d.user_id = ?
		`, [user_id]);
	}

	static insert(data) {
		return Model.insert(data, 'calendar');
	}

	static remove(data) {
		return Model.remove(data, 'calendar');
	}
}

module.exports = Calendar;
