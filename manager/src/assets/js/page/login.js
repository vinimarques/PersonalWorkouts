'use strict';


/**
 * Import
 */
import Page from '../components/page';
import Api from '../components/api';

/**
 *
 */
class Login extends Page {
	constructor() {
		super();
	}

	init (page) {
		super.load(page);
	}

	_bindEvents () {
		$('.login-form form').on('submit', function (ev) {
			ev.preventDefault();
			let data = {};

			$(this).serializeArray().map(item => {
				data[item.name] = item.value;
			});

			if (!data.email && !data.password) return false;

			Api.login(data.email, data.password).then(res => {
				if (res.success) {
					App.database.set('token',res.token);
					App.database.set('user',res.user);
					window.Page('/home');
				}
				else {
					if (res.error) {
						App.message.show(res.error.message);
					}
				}
			});
		});
	}
}

export { Login as default }
