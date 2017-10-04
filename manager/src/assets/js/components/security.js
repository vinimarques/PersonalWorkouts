'use strict';

/**
 *
 */
class Security {
	constructor () {

	}

	validate () {
		return new Promise((success, error) => {
			let token = App.database.get('token');

			if (!token) {
				window.Page('/login');
			}
			else {
				let user = App.database.get('user');
				App.api.setHeader('Authorization', 'Bearer ' + token);

				if (user) App.data.user = user;
				success();
			}
		});
	}

	clearAndRedirect () {
		App.database.rm('token');
		App.database.rm('user');
		window.Page('/login');
	}
}

export { Security as default }
