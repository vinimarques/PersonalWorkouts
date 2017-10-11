'use strict';


/**
 * Import
 */
import Page from '../components/page';

/**
 *
 */
class Login extends Page {
	constructor() {
		super();
	}

	init(page, ctx) {
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

			App.api.login(data.email, data.password).then(res => {
				if (res.success) {
					App.database.set('token',res.token);
					App.database.set('user',res.user);
					App.api.setHeader('Authorization', 'Bearer ' + res.token);
					window.Page('/home');
				}
				else {
					if (res.error) {
						App.message.show(res.error.message, App.config.timeCloseModal);
					}
				}
			});
		});
	}
}

export { Login as default }
