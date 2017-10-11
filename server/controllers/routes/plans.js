const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const Plans = require('../../models/plans');

module.exports = function (router) {

	router.get('/plans', Auth.middleware(), Resolve.send(
		function (req) {
			const company_id = req.query.company_id;

			if (!company_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Plans.all(company_id)
				.then(plans => {
					return {
						success: true,
						data: plans
					};
				});
		}
	));

	router.get('/plan', Auth.middleware(), Resolve.send(
		function (req) {
			const plan_id = req.query.plan_id;

			if (!plan_id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Plans.first(plan_id)
				.then(plan => {
					return {
						success: true,
						data: plan
					};
				});
		}
	));

	router.delete('/plan', Auth.middleware(), Resolve.send(
		function (req) {
			const id = req.body.plan_id;

			if (!id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Plans.remove({ id })
				.then(res => {
					return {
						success: true
					};
				});
		}
	));

	router.post('/plan', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true },
				{ field: 'days_per_week', type: 'Integer', required: true },
				{ field: 'difficulty_id', type: 'Integer', required: true }
			]);

			const data = _.pick(req.body, ['name', 'days_per_week', 'difficulty_id']);
			const company_id = req.body.company_id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Plans.insert(data, company_id)
				.then(result => {
					return {
						success: true,
						new_plan_id: result.insertId
					};
				})
				.catch(error => {
					throw error;
				});
		}
	));

	router.put('/plan', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true },
				{ field: 'days_per_week', type: 'Integer', required: true },
				{ field: 'difficulty_id', type: 'Integer', required: true }
			]);

			const data = _.pick(req.body, ['name', 'days_per_week', 'difficulty_id']);
			const id = req.body.id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Plans.update(data, id)
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
