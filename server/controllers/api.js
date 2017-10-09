const express = require('express');
const _ = require('lodash');
const router = express.Router();

const Auth = require('../services/auth');
const Resolve = require('../services/resolve');
const Validator = require('../services/validator');
const ApiError = require('../services/error');

const Users = require('../models/users');
const Consts = require('../models/consts');

const Promise = require('bluebird');

router.get('/consts', Resolve.send(
	function (req) {
		return Consts.All()
			.then(result => {
				return {
					success: true,
					data: {
						types: result[0],
						difficulties: result[1]
					}
				};
			})
			.catch((err) => {
				console.log(err);
				return {
					success: false,
					error: {
						status: 500,
						message: err
					}
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

		return Users.All(company_id, where)
			.then(users => {
				return {
					success: true,
					data: users
				};
			});
	}
));

router.delete('/users', Auth.middleware(), Resolve.send(
	function (req) {
		const id = req.body.user_id;

		if (!id) {
			const error = ApiError.userIdRequired();
			return {
				success: false,
				error: error.data
			};
		}

		return Users.remove({id})
			.then(users => {
				return {
					success: true
				};
			});
	}
));

router.post('/users', Auth.middleware(), Resolve.send(
  function (req) {
    const validator = new Validator([
      {field: 'name', type: 'String', required: true},
      {field: 'email', type: 'String', required: true},
		{field: 'user_type_id', type: 'Integer', required: true},
		{field: 'company_id', type: 'Integer', required: true},
      {field: 'password', type: 'String', required: true}
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

module.exports = router;
