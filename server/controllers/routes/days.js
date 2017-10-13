const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const Days = require('../../models/days');

module.exports = function (router) {

	router.get('/days', Auth.middleware(), Resolve.send(
		function (req) {
			const plan_id = parseInt(req.query.plan_id);

			if (!plan_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Days.all(plan_id)
				.then(days => {
					return {
						success: true,
						data: days
					};
				});
		}
	));

	router.get('/day', Auth.middleware(), Resolve.send(
		function (req) {
			const day_id = req.query.day_id;

			if (!day_id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Days.first(day_id)
				.then(day => {
					return {
						success: true,
						data: day
					};
				});
		}
	));

	router.delete('/day', Auth.middleware(), Resolve.send(
		function (req) {
			const id = req.body.day_id;

			if (!id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Days.remove({ id })
				.then(res => {
					return {
						success: true
					};
				});
		}
	));

	router.post('/day', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true },
				{ field: 'plan_id', type: 'Integer', required: true }
			]);

			const data = _.pick(req.body, ['name','plan_id']);

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Days.insert(data)
				.then(result => {
					return {
						success: true,
						new_day_id: result.insertId
					};
				})
				.catch(error => {
					throw error;
				});
		}
	));

	router.put('/day', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true }
			]);

			const data = _.pick(req.body, ['name']);
			const id = req.body.id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Days.update(data, id)
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
