
const Users = require('../models/users');
const ApiError = require('./error');
const Resolve = require('./resolve');

class Auth {

  static middleware() {
   return function(req, res, next) {
		const token = req.headers['authorization'];

		if (token) {
			let tk = token.replace('Bearer ', '');
			Users.getToken(tk)
				.then(user => {
					if (user.length > 0) {
						next();
					}
					else {
						const error = ApiError.userRequired();
						return res.status(error.statusCode).send({ error: error.data });
					}
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
    }
  }
}

module.exports = Auth;
