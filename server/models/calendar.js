const Model = require('./model');

class Calendar extends Model {

	static all(user_id) {
		return Model.query(`
			SELECT dy.name as 'day_name', p.name as 'plan_name', c.date, c.plan_id
			FROM calendar as c
			LEFT JOIN day_exercise as d ON  d.id = c.day_exercise_id
			LEFT JOIN day as dy ON  dy.id = d.day_id
			LEFT JOIN plan as p ON  p.id = c.plan_id
			WHERE c.user_id = ?
		`, [user_id]);
	}

	static insert(data) {
		return Model.insert({ exercices: data.days_per_week }, 'workout')
			.then((response) => {
				const workout_id = response.insertId;

				return Promise.all(data.workouts.map(item => {
					let dataCalendar = item;
					dataCalendar.workout_id = workout_id;
					return Model.insert(dataCalendar, 'calendar');
				}));
			})
	}

	static remove(data) {
		return Model.remove(data, 'calendar');
	}
}

module.exports = Calendar;
