
const Users = require('../models/users');
const ApiError = require('./error');
const Resolve = require('./resolve');

class Auth {

  static middleware(required) {
    return function(req, res, next) {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			Users.getToken(token)
				.then(user => {
					console.log(user);
					next();
				})
				.catch(() => {
					const error = ApiError.userRequired();
					return res.status(error.statusCode).send({ error: error.data });
				});
		}
		else {
			const error = ApiError.userRequired();
			return res.status(error.statusCode).send({ error: error.data });
		}

      next();
    }
  }
}

module.exports = Auth;
