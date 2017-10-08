
const Model = require('./model');
const crypto = require('crypto');
const Moment = require('moment');

class Users extends Model {
	static getUserByAuthentication(email, password) {
		return Model.first(`
			SELECT u.id, u.name, u.email, u.company_id, u.user_type_id, c.name as 'company_name', t.name as 'user_type_name'
			FROM users as u
			LEFT JOIN company as c ON u.company_id = c.id
			LEFT JOIN user_type as t ON u.user_type_id = t.id
			WHERE u.email = ? AND u.password = ?
		`, [email, password]);
	}

	static createToken(user) {
		const token = crypto.createHmac('sha256', app.config.security.secret).update('' + Date.now()).digest('hex');
		const date = new Date();
		const data = {
			token,
			date: Moment().format('YYYY-MM-DD HH:mm:ss'),
			user_id: user.id
		};
		return Model.insert(data, 'token').then(() => {
			return token;
		});
	}

	static getToken(token) {
		return Model.query(`
			SELECT u.id, u.company_id, u.user_type_id
			FROM users as u
			LEFT JOIN company as c ON u.company_id = c.id
			LEFT JOIN user_type as t ON u.user_type_id = t.id
			LEFT JOIN token as o ON o.user_id = u.id
			WHERE o.token = ?
		`, [token], { limit: 1 });
	}

	static All(company_id) {
		return Model.query(`
			SELECT u.id, u.name, u.email, u.company_id, u.user_type_id, c.name as 'company_name', t.name as 'user_type_name'
			FROM users as u
			LEFT JOIN company as c ON u.company_id = c.id
			LEFT JOIN user_type as t ON u.user_type_id = t.id
			WHERE c.id = ?
		`, [company_id]);
	}

  	static insert(data) {
		return Model.insert(data, 'users');
  	}
}

module.exports = Users;
