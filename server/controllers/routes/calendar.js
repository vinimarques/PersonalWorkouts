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

	router.get('/calendar-user', Auth.middleware(), Resolve.send(
		function (req) {
			const user_id = parseInt(req.query.user_id);
			const date = req.query.date;

			if (!user_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Calendar.dateUser(user_id, date)
				.then(calendar => {
					return {
						success: true,
						data: calendar
					};
				});
		}
	));
};
