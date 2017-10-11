
const Model = require('./model');

class Plans extends Model {

	static all(company_id) {
		return Model.query(`
			SELECT p.id, p.name, p.days_per_week, p.difficulty_id, d.name as 'difficulty_name'
			FROM plan as p
			LEFT JOIN difficulty as d ON p.difficulty_id = d.id
			LEFT JOIN plan_company as pc ON pc.plan_id = p.id
			WHERE pc.company_id = ?
		`, [company_id]);
	}

	static first(plan_id) {
		return Model.first(`
			SELECT p.id, p.name, p.days_per_week, p.difficulty_id, d.name as 'difficulty_name'
			FROM plan as p
			LEFT JOIN difficulty as d ON p.difficulty_id = d.id
			WHERE p.id = ?
		`, [plan_id]);
	}

	static insert(data, company_id) {
		return Model.insert(data, 'plan').then((result) => {
			return Model.insert({
				company_id,
				plan_id: result.insertId
			}, 'plan_company');
		});
	}

	static remove(data) {
		return Model.remove(data, 'plan');
	}

	static update(data, plan_id) {
		return Model.update(data, { id: plan_id }, 'plan');
	}
}

module.exports = Plans;
