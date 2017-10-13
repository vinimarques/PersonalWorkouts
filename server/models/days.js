
const Model = require('./model');

class Days extends Model {

	static all (plan_id) {
		return Model.query(`
			SELECT * FROM (
				SELECT d.id, d.name, p.days_per_week, d.plan_id, COUNT(de.id) as 'exercises'
				FROM day as d
				LEFT JOIN day_exercise as de ON de.day_id = d.id
				LEFT JOIN plan as p ON d.plan_id = p.id
				WHERE d.plan_id = ?
			) as result WHERE result.id > 0
		`, [plan_id]);
	}

	static first(day_id) {
		return Model.first(`
			SELECT * FROM (
				SELECT d.id, d.name, p.days_per_week, d.plan_id, COUNT(de.id) as 'exercises'
				FROM day as d
				LEFT JOIN day_exercise as de ON de.day_id = d.id
				LEFT JOIN plan as p ON d.plan_id = p.id
				WHERE d.id = ?
			) as result WHERE result.id > 0
		`, [day_id]);
	}

	static insert(data) {
		return Model.insert(data, 'day');
	}

	static remove(data) {
		return Model.remove(data, 'day');
	}

	static update(data, day_id) {
		return Model.update(data, { id: day_id }, 'day');
	}
}

module.exports = Days;
