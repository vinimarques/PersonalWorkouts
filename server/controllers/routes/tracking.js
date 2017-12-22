const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const Tracking = require('../../models/tracking');

module.exports = function (router) {

	router.get('/tracking', Auth.middleware(), Resolve.send(
		function (req) {
			const user_id = req.query.user_id;
			const date = req.query.date;

			if (!user_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Tracking.first(user_id, date)
				.then(tracking => {
					return {
						success: true,
						data: tracking
					};
				});
		}
	));

	router.post('/tracking', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'users_id', type: 'String', required: true },
				{ field: 'time', type: 'Integer', required: true },
				{ field: 'date', type: 'String', required: true }
			]);

			const data = _.pick(req.body, ['users_id', 'time', 'date']);

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Tracking.insert(data)
				.then(result => {
					return {
						success: true,
						new_tracking_id: result.insertId
					};
				})
				.catch(error => {
					throw error;
				});
		}
	));
};
