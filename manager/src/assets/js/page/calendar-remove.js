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
		$('body').on('click', '[data-workout]', function () {
			let 	modal = $('.modal-remove-calendar'),
					workoutId = $(this).data('workout'),
					legend = $(this).data('legend');

			modal.find('input[name="workout_id"]').val(workoutId);
			modal.find('.workout-remove-name').text(legend);

			App.openModal('remove-calendar');
		});
	}
}

export { CalendarRemove as default }
