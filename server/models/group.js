const Model = require('./model');

class Group extends Model {

	static all(company_id) {
		return Model.query(`
			SELECT e.id, e.name
			FROM muscle_group as e
			LEFT JOIN muscle_group_company as ec ON ec.muscle_group_id = e.id
			WHERE ec.company_id = ?
		`, [company_id]);
	}

	static first(muscle_group_id) {
		return Model.first(`
			SELECT e.id, e.name
			FROM muscle_group as e
			WHERE e.id = ?
		`, [muscle_group_id]);
	}

	static insert(data, company_id) {
		return Model.insert(data, 'muscle_group').then((result) => {
			return Model.insert({
				company_id,
				muscle_group_id: result.insertId
			}, 'muscle_group_company');
		});
	}

	static remove(data) {
		return Model.remove(data, 'muscle_group');
	}

	static update(data, muscle_group_id) {
		return Model.update(data, { id: muscle_group_id }, 'muscle_group');
	}
}

module.exports = Group;
