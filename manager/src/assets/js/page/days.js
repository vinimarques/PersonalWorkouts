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
class Days extends Page {
	constructor() {
		super();
		this.validator = new Validator();
	}

	init(page, ctx) {
		super.load(page);
		this.plan_id = ctx.params.plan;
		this.message = {
			error: {
				days: 'DAYS NOT FOUND'
			},
			success: {
				add: 'Day has been adding successfully!',
				update: 'Day has been updated successfully!',
				remove: 'Day has been removed successfully!'
			}
		}
	}

	onload() {
		this.daysContent = $('#days-content');
		this.loadPlan();
		this.loadDays();
	}

	loadPlan () {
		App.api.getPlan(this.plan_id).then((res) => {
			$('.page__title').text(res.data.name);
			this.days_per_week = res.data.days_per_week;
		})
	}

	loadDays() {
		const container = this.daysContent;
		const plan_id = parseInt(this.plan_id);
		this.template = $.templates($('#template-days').html());
		let html = '';

		$('[name="plan_id"]').val(plan_id);

		App.api.getDays(plan_id).then((res) => {
			this.total_days = res.data.length;

			if (res.success && res.data.length > 0) {
				html = this.template.render({ days: res.data });
			}
			else {
				html = this.template.render({ error: this.message.error.days });
			}
			container.html(html);

			if (this.days_per_week === this.total_days) $('#btn-add-day').addClass('-disabled');
			else $('#btn-add-day').removeClass('-disabled');
		})
	}

	_bindEvents() {
		$('.modal-add-day form').on('submit', (ev) => {
			ev.preventDefault();
			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.saveDay(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.add, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadDays();
					}
				});
		});

		$('#btn-add-day').on('click', () => {
			if (this.days_per_week === this.total_days) return false;
		});

		$('.modal-edit-day form').on('submit', (ev) => {
			ev.preventDefault();

			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (isValide.error) {
				this.validator.resetErrors(ev.target);
				this.validator.showErrors(isValide.errors);
				return false;
			}

			App.api.updateDay(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.update, App.config.timeCloseModal);
						$(ev.target)[0].reset();
						this.loadDays();
					}
				});
		});

		$('.modal-remove-day form').on('submit', (ev) => {
			ev.preventDefault();
			let dataSend = this.validator.getDataSend(ev.target);
			if (!dataSend.day_id) return false;
			App.api.removeDay(dataSend)
				.then((res) => {
					if (res.success) {
						App.message.show(this.message.success.remove, App.config.timeCloseModal);
						this.loadDays();
					}
				});
		});

		$('body').on('click', '.actions .day-delete', (ev) => {
			ev.preventDefault();
			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.day-name').text(),
				id = line.data('day-id');

			$('.modal-remove-day input').val(id);
			$('.modal-remove-day .day-remove-name').text(name);
			App.openModal('remove-day');
		});

		$('body').on('click', '.actions .day-edit', (ev) => {
			ev.preventDefault();
			let line = $(ev.target).parents('.ttable__body__row'),
				name = line.find('.day-name').text(),
				id = line.data('day-id');

			App.loader.show();
			App.api.getDay(id).then((res) => {
				App.loader.hide();
				App.helpers.populateForm('.modal-edit-day form', res.data);
				App.openModal('edit-day');
			});
		});
	}
}

export { Days as default }
