const Model = require('./model');

class Calendar extends Model {

	static all(user_id) {
		return Model.query(`
			SELECT dy.name as 'day_name', c.date
			FROM calendar as c
			LEFT JOIN day as dy ON  dy.id = c.day_id
			WHERE c.user_id = ?
		`, [user_id]);
	}

	static dateUser(user_id, date) {
		return Model.query(`
			SELECT
				day.name as 'day_name',
				calendar.date,
				calendar.id,
				calendar.user_id,
				calendar.day_id,
				exercise.name as 'exercise_name',
				exercise.description as 'exercise_description',
				day_exercise.note as 'day_note',
				day_exercise.day_exercise_group_id as 'exercise_group',
				day_exercise.rep_1, day_exercise.rep_2, day_exercise.rep_3, day_exercise.rep_4, day_exercise.rep_5
			FROM calendar
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

	static update(user_id, day_id, date) {
		return Model.update({date}, { day_id, user_id }, 'calendar');
	}

	static updateByCalendarDate(user_id, newDate, date) {
		return Model.query(`
			UPDATE calendar SET date = ? WHERE date = ? AND user_id = ?
		`, [newDate, date, user_id]);
	}

	static dashboardCalendar(date) {
		let _date = date + '%';
		const trackings = Model.query(`
			SELECT id, date, time
			FROM tracking
			WHERE id IN (
				SELECT MAX(id)
				FROM tracking
				GROUP BY date
			) AND date like ?
		`, [_date]);

		const calendar = Model.query(`
			SELECT * FROM calendar
			WHERE date like ?
			GROUP BY date
		`, [_date]);

		const total_calendar = Model.query(`
			SELECT * FROM calendar
			GROUP BY date
		`);

		const total_trackings = Model.query(`
			SELECT id, date, time
			FROM tracking
			WHERE id IN (
				SELECT MAX(id)
				FROM tracking
				GROUP BY date
			)
		`);

		return Promise.all([trackings,calendar,total_calendar,total_trackings]).then((res) => {
			return {
				tracking: res[0],
				calendar: res[1],
				total: {
					tracking: res[3],
					calendar: res[2]
				}
			};
		});
	}
}

module.exports = Calendar;
