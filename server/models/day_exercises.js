
const Model = require('./model');

class DayExercises extends Model {

	static all(day_id) {
		return Model.query(`
			SELECT e.name as 'exercise_name', q.rep_1, q.rep_2, q.rep_3, q.rep_4, q.rep_5, q.note
			FROM day_exercise as q
			LEFT JOIN exercise as e ON  e.id = q.exercise_id
			LEFT JOIN day as d ON  d.id = q.day_id
			WHERE d.id = ?
		`, [day_id]);
	}

	static first(day_exercise_id) {
		return Model.first(`
			SELECT e.name as 'exercise_name', q.rep_1, q.rep_2, q.rep_3, q.rep_4, q.rep_5, q.note
			FROM day_exercise as q
			LEFT JOIN exercise as e ON  e.id = q.exercise_id
			LEFT JOIN day as d ON  d.id = q.day_id
			WHERE q.id = ?
		`, [day_exercise_id]);
	}

	static insert(data) {
		return Model.insert(data, 'day_exercise');
	}

	static remove(data) {
		return Model.remove(data, 'day_exercise');
	}

	static update(data, day_exercise_id) {
		return Model.update(data, { id: day_exercise_id }, 'day_exercise');
	}
}

module.exports = DayExercises;
