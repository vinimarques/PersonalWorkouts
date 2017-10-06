'use strict';

/**
 * Import
 */

import Page from '../components/page';
import _ from 'lodash';

/**
 *
 */
class Users extends Page {
	constructor() {
		super();
	}

	init(page, ctx) {
		super.load(page);

		this.search = '';
		this.users = '';
		this.time = null;
		this.message = {
			error: {
				users: 'USERS NOT FOUND'
			}
		}
	}

	onload () {
		this.usersContent = $('#users-content');
		this.loadUsers();
	}

	loadUsers () {
		const container = this.usersContent;
		const company_id = App.data.user.company_id;
		this.template = $.templates($('#template-users').html());
		let html = '';

		App.api.users(company_id).then((res) => {
			if (res.success && res.data.length > 0) {
				this.users = res.data;
				html = this.template.render({users: res.data});
			}
			else {
				html = this.template.render({error: this.message.error.users});
			}
			container.html(html);
		})
	}

	_bindEvents() {
		console.log('page bind events');
	}

	_searchKeyUp (ev) {
		let value = ev.target.value;
		clearTimeout(this.timeSearch);
		this.timeSearch = setTimeout(() => {
			this.search = value;
			this.highlight(value);
		}, 700);
	}

	highlight (word) {
		let result = _.filter(this.users, (o) => {
			return o.name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
		});
		let html = '';

		console.log(result);

		if (result && result.length > 0) {
			html = this.template.render({ users: result });
		}
		else {
			html = this.template.render({ error: this.message.error.users });
		}
		this.usersContent.html(html);
	}
}

export { Users as default }
