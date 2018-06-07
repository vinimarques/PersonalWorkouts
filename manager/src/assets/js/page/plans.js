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
class Plans extends Page {
	constructor() {
		super();
	}

	init(page, ctx) {
		super.load(page);

		this.search = '';
		this.plans = '';
		this.message = {
			error: {
				plans: 'NENHUM DADO ENCONTRADO'
			},
			success: {
				add: 'Plan adicionado com sucesso!',
				update: 'Plan atualizado com sucesso!',
				remove: 'Plan removido com sucesso!'
			}
		}
	}

	onload() {
		this.usersContent = $('#users-content');
		this.loadUsers();
	}

	loadUsers () {
		const container = this.usersContent;
		const company_id = App.data.user.company_id;
		this.template = $.templates($('#template-users-plans').html());
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
			return o.name.toLowerCase().indexOf(word.toLowerCase()) !== -1 || o.email.toLowerCase().indexOf(word.toLowerCase()) !== -1;
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

export { Plans as default }
