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
				day.name as 'day_name',
				plan.name as 'plan_name',
				calendar.date,
				calendar.user_id,
				calendar.plan_id,
				calendar.workout_id,
				exercise.name as 'exercise_name',
				exercise.description as 'exercise_description',
				day_exercise.note as 'day_note',
				day_exercise.day_exercise_group_id as 'exercise_group',
				plan.days_per_week
			FROM calendar
			LEFT JOIN plan ON  plan.id = calendar.plan_id
			LEFT JOIN day ON day.id = calendar.day_id
			LEFT JOIN day_exercise ON  day_exercise.day_id = day.id
			LEFT JOIN exercise_group ON  exercise_group.day_exercise_group_id = day_exercise.day_exercise_group_id
			LEFT JOIN exercise ON exercise.id = exercise_group.exercise_id
			WHERE calendar.user_id = ? AND calendar.date = ?
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
