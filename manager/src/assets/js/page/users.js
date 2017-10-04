'use strict';

/**
 * Import
 */

import Page from '../components/page';

/**
 *
 */
class Users extends Page {
	constructor() {
		super();
	}

	init(page, ctx) {
		super.load(page);
	}

	onload () {
		this.loadUsers();
	}

	loadUsers () {
		const container = $('#users-content');
		const company_id = App.data.user.company_id;
		const template = $.templates($('#template-users').html());
		let html = '';

		App.api.users(company_id).then((res) => {
			if (res.success && res.data.length > 0) {
				html = template.render({users: res.data});
			}
			else {
				html = template.render({error: 'USERS NOT FOUND'});
			}

			container.html(html);
		})
	}

	_bindEvents() {

	}
}

export { Users as default }
