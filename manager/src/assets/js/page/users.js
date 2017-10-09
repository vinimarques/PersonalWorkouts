'use strict';

/**
 * Import
 */

import Page from '../components/page';
import Validator from '../components/validator';
import _ from 'lodash';

/**
 *
 */
class Users extends Page {
	constructor() {
		super();
		this.validator = new Validator();
	}

	init(page, ctx) {
		super.load(page);

		this.search = '';
		this.users = '';
		this.time = null;
		this.message = {
			error: {
				users: 'USERS NOT FOUND'
			},
			success: {
				add: 'User has been adding successfully!',
				remove: 'User was removed successfully!'
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

		App.api.getUsers(company_id, App.data.user.user_type_id).then((res) => {
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
		$('.modal-add-user form').on('submit', (ev) => {
			ev.preventDefault();
			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.saveUser(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.add);
						this.loadUsers();
					}
				});
		});

		$('.modal-remove-user form').on('submit', (ev) => {
			ev.preventDefault();

			let dataSend = this.validator.getDataSend(ev.target);

			if (!dataSend.user_id) return false;

			App.api.removeUser(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.remove);
						this.loadUsers();
					}
				});
		});

		$('body').on('click', '.actions .user-delete', (ev) => {
			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.user-name').text(),
				id = line.data('user-id');

			$('.modal-remove-user input').val(id);
			$('.modal-remove-user .user-remove-name').text(name);
			App.openModal('remove-user');
		});
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
