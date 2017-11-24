const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const Calendar = require('../../models/calendar');

module.exports = function (router) {

	router.get('/calendar', Auth.middleware(), Resolve.send(
		function (req) {
			const user_id = parseInt(req.query.user_id);

			if (!user_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Calendar.all(user_id)
				.then(calendar => {
					return {
						success: true,
						data: calendar
					};
				});
		}
	));

	router.delete('/calendar', Auth.middleware(), Resolve.send(
		function (req) {
			const id = req.body.workout_id;

			if (!id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Calendar.remove({ id })
				.then(res => {
					return {
						success: true
					};
				});
		}
	));

	router.post('/calendar', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'exercise_id', type: 'Integer', required: true },
				{ field: 'plan_id', type: 'Integer', required: true },
				{ field: 'user_id', type: 'Integer', required: true }
			]);

			const workouts = req.body.workouts;

			console.log(workouts);

			// const data = _.pick(req.body, ['exercise_id', 'plan_id', 'user_id']);

			// validator.validate(data);

			// if (validator.hasErrors()) throw validator.getErrors();

			// return Calendar.insert(data)
			// 	.then(result => {
			// 		return {
			// 			success: true,
			// 			new_calendar: result.insertId
			// 		};
			// 	})
			// 	.catch(error => {
			// 		throw error;
			// 	});
		}
	));
};
