
const Model = require('./model');

class Exercises extends Model {

	static all (company_id) {
		return Model.query(`
			SELECT e.id, e.name, e.description
			FROM exercise as e
			LEFT JOIN exercise_company as ec ON ec.exercise_id = e.id
			WHERE ec.company_id = ?
		`, [company_id]);
	}

	static first (exercise_id) {
		return Model.first(`
			SELECT e.id, e.name, e.description
			FROM exercise as e
			WHERE e.id = ?
		`, [exercise_id]);
	}

	static insert(data, company_id) {
		return Model.insert(data, 'exercise').then((result) => {
			return Model.insert({
				company_id,
				exercise_id: result.insertId
			}, 'exercise_company');
		});
	}

	static remove(data) {
		return Model.remove(data, 'exercise');
	}

	static update(data, exercise_id) {
		return Model.update(data, { id: exercise_id }, 'exercise');
	}
}

module.exports = Exercises;
