const express = require('express');
const _ = require('lodash');
const router = express.Router();

const Auth = require('../services/auth');
const Resolve = require('../services/resolve');
const Validator = require('../services/validator');
const ApiError = require('../services/error');

const Users = require('../models/users');

const Promise = require('bluebird');

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

router.post('/users', Auth.middleware(false), Resolve.send(
  function (req) {
    const validator = new Validator([
      {field: 'name', type: 'String', required: true},
      {field: 'email', type: 'String', required: true},
      {field: 'password', type: 'String', required: true}
    ]);

    const data = _.pick(req.body, ['name', 'email', 'password']);

    validator.validate(data);

    if (validator.hasErrors()) throw validator.getErrors();

    return Users.insert(data)
      .then(result => {
        return Users.details(result.insertId);
      })
      .catch(error => {
        throw ApiError.uniqueEmail(error);
      });
  }
));

module.exports = router;
