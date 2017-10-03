
const Users = require('../models/users');
const ApiError = require('./error');
const Resolve = require('./resolve');

class Auth {

  static middleware() {
   return function(req, res, next) {
		const token = req.headers['authorization'].replace('Bearer ','');

		console.log(token);

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
