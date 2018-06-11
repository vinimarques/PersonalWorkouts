const Model = require('./model');

class DayExercises extends Model {

	static day (user_id, date) {
		return Model.first(`
		SELECT day.id as 'day_id', day.name
		FROM calendar
		LEFT JOIN day on day.id = calendar.day_id
		WHERE calendar.user_id = ? AND calendar.date = ?
		`, [user_id, date]);
	}

	static addDay (name, user_id, date) {
		return Model.insert({name: name}, 'day').then((result) => {
			var day_id = result.insertId;

			return Model.insert({
				day_id,
				date,
				user_id
			}, 'calendar');
		});
	}

	static all(day_id) {
		return Model.query(`
			SELECT e.name as 'exercise_name', q.id, q.day_exercise_group_id, q.rep_1, q.rep_2, q.rep_3, q.rep_4, q.rep_5, q.note
			FROM day_exercise as q
			LEFT JOIN exercise_group as eg ON  eg.day_exercise_group_id = q.day_exercise_group_id
			LEFT JOIN exercise as e ON  e.id = eg.exercise_id
			LEFT JOIN day as d ON  d.id = q.day_id
			WHERE d.id = ?
		`, [day_id]);
	}

// SELECT calendar.date, day.name as 'day_name', exercise_group.day_exercise_group_id, day_exercise.rep_1, day_exercise.rep_2, day_exercise.rep_3, day_exercise.rep_4, day_exercise.rep_5, day_exercise.note, exercise.name as 'exercise_name', exercise.description as 'exercise_description'
// FROM calendar

// LEFT JOIN day ON day.id = calendar.day_id
// LEFT JOIN day_exercise ON day_exercise.day_id = calendar.day_id
// LEFT JOIN exercise_group ON exercise_group.day_exercise_group_id = day_exercise.day_exercise_group_id
// LEFT JOIN exercise ON exercise.id = exercise_group.exercise_id

// WHERE date = '2018-05-07'

	static first(day_exercise_id) {
		return Model.first(`
			SELECT e.name as 'exercise_name', q.id, q.day_exercise_group_id, q.rep_1, q.rep_2, q.rep_3, q.rep_4, q.rep_5, q.note
			FROM day_exercise as q
			LEFT JOIN exercise_group as eg ON  eg.day_exercise_group_id = q.day_exercise_group_id
			LEFT JOIN exercise as e ON  e.id = eg.exercise_id
			LEFT JOIN day as d ON  d.id = q.day_id
			WHERE q.id = ?
		`, [day_exercise_id]);
	}

	static insert(data) {
		return Model.insert({day_id: data.day_id}, 'day_exercise_group').then((result) => {
			var groupId = result.insertId;

			return Promise.all(data.exercise_id.map(
				exercise => {
					return Model.insert({
						exercise_id: exercise,
						day_exercise_group_id: groupId
					}, 'exercise_group');
				})
			).then(() => {
				var dataDay = data;
				dataDay.day_exercise_group_id = groupId;
				delete dataDay['exercise_id'];

				return Model.insert(dataDay, 'day_exercise');
			});
		});
	}

	static remove(data) {
		return Model.remove(data, 'day_exercise');
	}

	static update(data, day_exercise_id) {
		return Model.update(data, { id: day_exercise_id }, 'day_exercise');
	}
}

module.exports = DayExercises;
