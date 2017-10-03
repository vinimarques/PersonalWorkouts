'use strict';

/**
 *
 */
class Security {
	constructor () {

	}

	validate () {
		let token = App.database.get('token');

		if (!token) window.Page('/login');
		else return true;

		return false;
	}
}

export { Security as default }
