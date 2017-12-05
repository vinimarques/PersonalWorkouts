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
		this.loadUserCalendar();
		this.__bindEvents();
	}

	loadUserCalendar () {
		App.api.getCalendar({ user_id: App.data.user.id }).then(res => {
			let exercises = _.groupBy(res.data, 'plan_name');

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
				placeholder: 'Selecione um Plano de Treino',
				disabled: true
			});
		});
	}

	__bindEvents () {
		this.selectUsers.on('select2:select', (e) => {
			this.selectPlans.select2('enable');
			var data = e.params.data;
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
						day_exercise_id: parseInt(item.exercise.id)
					})
				});

				App.api.saveCalendar(calendarData)
					.then((res) => {
						console.log(res);
					});
			}
		})
	}
}

export { Calendar as default }
