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

	router.put('/calendar', Auth.middleware(), Resolve.send(
		function (req) {
			const user_id = parseInt(req.body.user_id);
			const day_id = parseInt(req.body.day_id);
			const date = req.body.date;

			if (!user_id || !day_id || !date) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Calendar.update(user_id, day_id, date)
				.then(calendar => {
					return {
						success: true,
						data: calendar
					};
				});
		}
	));

	router.put('/calendar/date', Auth.middleware(), Resolve.send(
		function (req) {
			const user_id = parseInt(req.body.user_id);
			const newDate = req.body.new_date;
			const date = req.body.date;

			if (!user_id || !newDate || !date) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Calendar.updateByCalendarDate(user_id, newDate, date)
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

	router.get('/calendar/dashboard', Auth.middleware(), Resolve.send(
		function (req) {
			const date = req.query.date;
			const user_id = req.query.user_id;

			if (!date) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			if (!user_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Calendar.dashboardCalendar(date, user_id)
				.then(calendar => {
					return {
						success: true,
						data: calendar
					};
				});
		}
	));
};
