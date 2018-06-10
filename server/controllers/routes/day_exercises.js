const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const DayExercises = require('../../models/day_exercises');

module.exports = function (router) {
	router.get('/day', Auth.middleware(), Resolve.send(
		function (req) {
			const user_id = parseInt(req.query.user_id);
			const date = req.query.date;

			if (!user_id || !date) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return DayExercises.day(user_id, date)
				.then(day => {
					return {
						success: true,
						data: day
					};
				});
		}
	));

	router.get('/day-exercises', Auth.middleware(), Resolve.send(
		function (req) {
			const day_id = parseInt(req.query.day_id);

			if (!day_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return DayExercises.all(day_id)
				.then(day_exercises => {
					return {
						success: true,
						data: day_exercises
					};
				});
		}
	));

	router.get('/day-exercise', Auth.middleware(), Resolve.send(
		function (req) {
			const day_exercise_id = req.query.day_exercise_id;

			if (!day_exercise_id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return DayExercises.first(day_exercise_id)
				.then(day_exercise => {
					return {
						success: true,
						data: day_exercise
					};
				});
		}
	));

	router.delete('/day-exercise', Auth.middleware(), Resolve.send(
		function (req) {
			const id = req.body.day_exercise_id;

			if (!id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return DayExercises.remove({ id })
				.then(res => {
					return {
						success: true
					};
				});
		}
	));

	router.post('/day-exercise', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'note', type: 'String' },
				{ field: 'exercise_id', type: 'Array', required: true },
				{ field: 'day_id', type: 'Integer', required: true },
				{ field: 'rep_1', type: 'Integer' },
				{ field: 'rep_2', type: 'Integer' },
				{ field: 'rep_3', type: 'Integer' },
				{ field: 'rep_4', type: 'Integer' },
				{ field: 'rep_5', type: 'Integer' }
			]);

			const data = _.pick(req.body, ['note', 'exercise_id', 'day_id', 'rep_1', 'rep_2', 'rep_3', 'rep_4' , 'rep_5']);

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return DayExercises.insert(data)
				.then(result => {
					return {
						success: true,
						new_day_exercise_id: result.insertId
					};
				})
				.catch(error => {
					throw error;
				});
		}
	));

	router.put('/day-exercise', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'note', type: 'String' },
				{ field: 'day_id', type: 'Integer', required: true },
				{ field: 'rep_1', type: 'Integer' },
				{ field: 'rep_2', type: 'Integer' },
				{ field: 'rep_3', type: 'Integer' },
				{ field: 'rep_4', type: 'Integer' },
				{ field: 'rep_5', type: 'Integer' }
			]);

			const data = _.pick(req.body, ['note', 'day_id', 'rep_1', 'rep_2', 'rep_3', 'rep_4', 'rep_5']);
			const id = req.body.id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return DayExercises.update(data, id)
				.then(result => {
					return {
						success: true
					};
				})
				.catch(error => {
					throw ApiError.uniqueEmail(error);
				});
		}
	));
};
