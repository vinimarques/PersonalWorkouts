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
		this.validator = new Validator();
	}

	init(page, ctx) {
		super.load(page);

		this.search = '';
		this.plans = '';
		this.message = {
			error: {
				plans: 'PLANS NOT FOUND'
			},
			success: {
				add: 'Plan has been adding successfully!',
				update: 'Plan has been updated successfully!',
				remove: 'Plan has been removed successfully!'
			}
		}
	}

	onload() {
		this.plansContent = $('#plans-content');
		this.loadPlans();
	}

	loadPlans() {
		const container = this.plansContent;
		const company_id = App.data.user.company_id;
		this.template = $.templates($('#template-plans').html());
		let html = '';

		App.api.getPlans(company_id).then((res) => {
			if (res.success && res.data.length > 0) {
				this.plans = res.data;
				html = this.template.render({ plans: res.data });
			}
			else {
				html = this.template.render({ error: this.message.error.plans });
			}
			container.html(html);
		})
	}

	_bindEvents() {
		$('.modal-add-plan form').on('submit', (ev) => {
			ev.preventDefault();
			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.savePlan(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.add, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadPlans();
					}
				});
		});

		$('.modal-edit-plan form').on('submit', (ev) => {
			ev.preventDefault();

			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.updatePlan(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.update, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadPlans();
					}
				});
		});

		$('.modal-remove-plan form').on('submit', (ev) => {
			ev.preventDefault();
			let dataSend = this.validator.getDataSend(ev.target);
			if (!dataSend.plan_id) return false;
			App.api.removePlan(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.remove, App.config.timeCloseModal);
						this.loadPlans();
					}
				});
		});

		$('body').on('click', '.actions .plan-delete', (ev) => {
			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.plan-name').text(),
				id = line.data('plan-id');

			$('.modal-remove-plan input').val(id);
			$('.modal-remove-plan .plan-remove-name').text(name);
			App.openModal('remove-plan');
		});

		$('body').on('click', '.actions .plan-edit', (ev) => {
			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.plan-name').text(),
				id = line.data('plan-id');

			App.loader.show();
			App.api.getPlan(id).then((res) => {
				App.loader.hide();
				App.helpers.populateForm('.modal-edit-plan form', res.data);
				App.openModal('edit-plan');
			});
		});
	}

	_searchKeyUp(ev) {
		let value = ev.target.value;
		clearTimeout(this.timeSearch);
		this.timeSearch = setTimeout(() => {
			this.search = value;
			this.highlight(value);
		}, 700);
	}

	highlight(word) {
		let result = _.filter(this.plans, (o) => {
			return o.name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
		});
		let html = '';

		if (result && result.length > 0) {
			html = this.template.render({ plans: result });
		}
		else {
			html = this.template.render({ error: this.message.error.plans });
		}
		this.plansContent.html(html);
	}
}

export { Plans as default }
