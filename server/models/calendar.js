const Model = require('./model');

class Calendar extends Model {

	static all(user_id) {
		return Model.query(`
			SELECT dy.name as 'day_name', p.name as 'plan_name', c.date, c.plan_id, c.workout_id
			FROM calendar as c
			LEFT JOIN day as dy ON  dy.id = c.day_id
			LEFT JOIN plan as p ON  p.id = c.plan_id
			WHERE c.user_id = ?
		`, [user_id]);
	}

	static dateUser(user_id, date) {
		return Model.query(`
			SELECT
				dy.name as 'day_name',
				p.name as 'plan_name',
				c.date,
				c.plan_id,
				c.workout_id,
				e.name as 'exercise_name',
				e.description as 'exercise_description',
				de.note as 'day_note',
				p.days_per_week
			FROM calendar as c
			LEFT JOIN day as dy ON  dy.id = c.day_id
			LEFT JOIN day_exercise as de ON  de.day_id = dy.id
			LEFT JOIN plan as p ON  p.id = c.plan_id
			LEFT JOIN exercise as e ON  e.id = de.exercise_id
			WHERE c.user_id = ? AND c.date = ?
		`, [user_id, date]);
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
