'use strict';

/**
 * Import
 */

import Page from '../components/page';
import Validator from '../components/validator';
import _ from 'lodash';
import CalendarInline from '../components/calendar';

/**
 *
 */
class Calendar extends Page {
	constructor() {
		super();
		this.plans = {};
		this.validator = new Validator();
		this.calendar = new CalendarInline();
	}

	init(page, ctx) {
		super.load(page);
	}

	onload () {
		this.selectUsers = $('#users-list');
		this.selectPlans = $('#plans-list');
		this.calendarWrapper = $('.calendar__wrapper');

		this.loadUsers();
		this.loadPlans();
		this.__bindEvents();
	}

	loadUsers () {
		App.api.getUsers(App.data.user.company_id, App.data.user.user_type_id).then((res) => {
			let data = res.data.map((item) => {
				return {
					id: item.id,
					text: item.name
				};
			});
			this.selectUsers.select2({
				data: data,
				placeholder: 'Select a user'
			});
		});
	}

	loadPlans () {
		App.api.getPlans(App.data.user.company_id).then((res) => {
			let data = res.data.map((item) => {
				this.plans[item.id] = item;

				return {
					id: item.id,
					text: item.name,
					days_per_week: item.days_per_week
				};
			});
			this.selectPlans.select2({
				data: data,
				placeholder: 'Select a plan',
				disabled: true
			});
		});
	}

	__bindEvents () {
		this.selectUsers.on('select2:select', (e) => {
			this.selectPlans.select2('enable');
			var data = e.params.data;
			console.log(data);
		});

		this.selectPlans.on('select2:select', (e) => {
			var data = e.params.data;

			this.calendarWrapper.addClass('-active');
			this.calendarWrapper.find('h2 strong').text(data.days_per_week);

			App.api.getDays(data.id).then((res) => {
				this.calendar.render(data.days_per_week, res.data);
			});
		});
	}

	_bindEvents () {
		$('.form-calendar').on('submit', (ev) => {
			ev.preventDefault();

			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			console.log(dataSend);

			console.log(this.calendar.isComplete);
			console.log(this.calendar.days_per_week);
			console.log(this.calendar.exercises_select);
		})
	}
}

export { Calendar as default }
