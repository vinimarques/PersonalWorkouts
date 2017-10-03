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

			if (!token) window.Page('/login');
			else {
				App.api.setHeader('Authorization', 'Bearer ' + token);
				success();
			}
		});
	}
}

export { Security as default }
