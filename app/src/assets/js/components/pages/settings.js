'use strict';

/**
 *
 */
import Page from 'libs/page';

/**
 *
 */
class Settings extends Page {

	constructor (page) {
		super(page);
	}

	onPageAfterAnimation () {
		this.bindEvents();
		this.load();
	}

	bindEvents () {
		$('.-logout').on('click', () => {
			App.api.logout().then(() => {
				App.database.rm('user');
				App.loginScreen();
			});
		})
	}

	load () {
		let user = App.database.get('user');
		let name = user.name && user.name.split(' ');
		let initial = name && name[0].charAt(0) + name[name.length - 1].charAt(0);

		$('.settings-top__thumb .-thumb').text(initial);
		$('.settings-top__name').text(user.name);
		$('.settings-top__role').text(user.user_type_name.toUpperCase());
	}
}

export { Settings as default }
