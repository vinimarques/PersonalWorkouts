const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const Exercises = require('../../models/exercises');

module.exports = function (router) {

	router.get('/exercises', Auth.middleware(), Resolve.send(
		function (req) {
			const company_id = req.query.company_id;

			if (!company_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Exercises.all(company_id)
				.then(exercises => {
					return {
						success: true,
						data: exercises
					};
				});
		}
	));

	router.get('/exercise', Auth.middleware(), Resolve.send(
		function (req) {
			const exercise_id = req.query.exercise_id;

			if (!exercise_id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Exercises.first(exercise_id)
				.then(exercise_id => {
					return {
						success: true,
						data: exercise_id
					};
				});
		}
	));

	router.delete('/user', Auth.middleware(), Resolve.send(
		function (req) {
			const id = req.body.exercise_id;

			if (!id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Exercises.remove({ id })
				.then(res => {
					return {
						success: true
					};
				});
		}
	));

	router.post('/exercise', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true },
				{ field: 'description', type: 'String' }
			]);

			const data = _.pick(req.body, ['name', 'description']);
			const company_id = req.body.company_id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Exercises.insert(data, company_id)
				.then(result => {
					return {
						success: true,
						new_exercise_id: result.insertId
					};
				})
				.catch(error => {
					throw error;
				});
		}
	));

	router.put('/exercise', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true },
				{ field: 'description', type: 'String' }
			]);

			const data = _.pick(req.body, ['name', 'email', 'password', 'user_type_id', 'company_id']);
			const id = req.body.id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Exercises.update(data, id)
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
