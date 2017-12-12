const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const Group = require('../../models/group');

module.exports = function (router) {
	router.get('/groups', Auth.middleware(), Resolve.send(
		function (req) {
			const company_id = req.query.company_id;

			if (!company_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Group.all(company_id)
				.then(group => {
					return {
						success: true,
						data: group
					};
				});
		}
	));

	router.get('/group', Auth.middleware(), Resolve.send(
		function (req) {
			const muscle_group_id = req.query.muscle_group_id;

			if (!muscle_group_id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Group.first(muscle_group_id)
				.then(muscle_group_id => {
					return {
						success: true,
						data: muscle_group_id
					};
				});
		}
	));

	router.delete('/group', Auth.middleware(), Resolve.send(
		function (req) {
			const id = req.body.muscle_group_id;

			if (!id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Group.remove({ id })
				.then(res => {
					return {
						success: true
					};
				});
		}
	));

	router.post('/group', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true }
			]);

			const data = _.pick(req.body, ['name']);
			const company_id = req.body.company_id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Group.insert(data, company_id)
				.then(result => {
					return {
						success: true,
						new_muscle_group_id: result.insertId
					};
				})
				.catch(error => {
					throw error;
				});
		}
	));

	router.put('/group', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true }
			]);

			const data = _.pick(req.body, ['name']);
			const id = req.body.id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Group.update(data, id)
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
