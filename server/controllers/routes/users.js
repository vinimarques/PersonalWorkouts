const Auth = require('../../services/auth');
const Resolve = require('../../services/resolve');
const Validator = require('../../services/validator');
const ApiError = require('../../services/error');
const Promise = require('bluebird');
const _ = require('lodash');

const Users = require('../../models/users');

module.exports = function (router) {

	router.get('/users', Auth.middleware(), Resolve.send(
		function (req) {
			const company_id = req.query.company_id;
			const type = req.query.type;
			let where = '';

			if (!company_id) {
				const error = ApiError.companyRequired();
				return {
					success: false,
					error: error.data
				};
			}


			if (!type) {
				where = ' AND u.user_type_id > 3';
			}
			else {
				if (type === '1') where = '';
				if (type === '2') where = ' AND u.user_type_id > 2';
			}

			console.log(type, where);

			return Users.all(company_id, where)
				.then(users => {
					return {
						success: true,
						data: users
					};
				});
		}
	));

	router.post('/login', Resolve.send(
		function (req) {
			const password = req.body.password;
			const email = req.body.email;

			if (password && email) {
				return Users.getUserByAuthentication(email, password)
					.then(user => {
						return Users.createToken(user)
							.then(token => {
								return {
									success: true,
									user,
									token
								};
							})
							.catch((err) => {
								console.log(err);
								return {
									success: false,
									error: {
										status: 502,
										message: 'Error in create token'
									}
								};
							});
					})
					.catch((err) => {
						console.log(err);
						const error = ApiError.userNotFound();
						return {
							success: false,
							error: error.data
						};
					})
			}
		}
	));

	router.get('/user', Auth.middleware(), Resolve.send(
		function (req) {
			const user_id = req.query.user_id;

			if (!user_id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Users.first(user_id)
				.then(user => {
					return {
						success: true,
						data: user
					};
				});
		}
	));

	router.delete('/user', Auth.middleware(), Resolve.send(
		function (req) {
			const id = req.body.user_id;

			if (!id) {
				const error = ApiError.userIdRequired();
				return {
					success: false,
					error: error.data
				};
			}

			return Users.remove({ id })
				.then(users => {
					return {
						success: true
					};
				});
		}
	));

	router.post('/user', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true },
				{ field: 'email', type: 'String', required: true },
				{ field: 'user_type_id', type: 'Integer', required: true },
				{ field: 'company_id', type: 'Integer', required: true },
				{ field: 'password', type: 'String', required: true }
			]);

			const data = _.pick(req.body, ['name', 'email', 'password', 'user_type_id', 'company_id']);

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Users.insert(data)
				.then(result => {
					return {
						success: true,
						new_user_id: result.insertId
					};
				})
				.catch(error => {
					throw ApiError.uniqueEmail(error);
				});
		}
	));

	router.put('/user', Auth.middleware(), Resolve.send(
		function (req) {
			const validator = new Validator([
				{ field: 'name', type: 'String', required: true },
				{ field: 'email', type: 'String', required: true },
				{ field: 'user_type_id', type: 'Integer', required: true },
				{ field: 'company_id', type: 'Integer', required: true },
				{ field: 'password', type: 'String' }
			]);

			const data = _.pick(req.body, ['name', 'email', 'password', 'user_type_id', 'company_id']);
			const id = req.body.id;

			validator.validate(data);

			if (validator.hasErrors()) throw validator.getErrors();

			return Users.update(data, id)
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
