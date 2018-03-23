'use strict';

/**
 * Import
 */

import Page from '../components/page';
import Validator from '../components/validator';
import _ from 'lodash';
import CalendarInline from '../components/calendar';
import moment from 'moment';

/**
 *
 */
class CalendarRemove extends Page {
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
		this.calendarWrapper = $('.calendar__wrapper');

		this.loadUsers();
		this.__bindEvents();
	}

	loadUserCalendar (id) {
		App.api.getCalendar({ user_id: id }).then(res => {
			let exercises = _.groupBy(res.data, 'workout_id');
			this.calendar.setHighlight(exercises);
		})
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
				placeholder: 'Selecione um usuário'
			});
		});
	}

	__bindEvents () {
		this.selectUsers.on('select2:select', (e) => {
			var data = e.params.data;

			this.loadUserCalendar(parseInt(data.id));

			this.calendarWrapper.addClass('-active');
			this.calendar && this.calendar.reset && this.calendar.reset();
			this.calendar.render();
		});
	}

	_bindEvents () {
		$('.form-calendar').on('submit', (ev) => {
			ev.preventDefault();

			let data = this.validator.getData(ev.target);
			let dataSend = this.validator.getDataSend(ev.target);
			let isValide = this.validator.isValide(data);

			if (this.calendar.isComplete) {
				let calendarData = {
					days_per_week: parseInt(this.calendar.days_per_week),
					workouts: []
				};

				this.calendar.exercises_select.map((item) => {
					calendarData.workouts.push({
						user_id: parseInt(dataSend.user_id),
						plan_id: parseInt(dataSend.plan_id),
						date: item.date,
						day_id: parseInt(item.exercise.id)
					})
				});

				App.api.saveCalendar(calendarData)
					.then((res) => {
						if (res.success) {
							this.loadUserCalendar();
						}
					});
			}
		})
	}
}

export { CalendarRemove as default }
