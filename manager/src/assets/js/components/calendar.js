'use strict';

import Datepickk from '../libs/datepickk';
import moment from 'moment';
import _ from 'lodash';

moment.locale('pt-br')

/**
 *
 */
class Calendar {
	constructor (params) {
		this.params = params;
		this.colors = ['#446FDA','#92ADEE','#678AE4','#2254CF','#0D3BAC'];
		this.colorsToUse = this.colors;
		this.selection = [];
		this.bindEvents();
	}

	render (days_per_week, exercises_days) {
		if (!days_per_week && !exercises_days) {
			if (!this.calendar) {
				document.querySelector('#calendar').innerHTML = '';
				this.calendar = new Datepickk({
					container: document.querySelector('#calendar'),
					inline:true,
					today: true,
					range: false,
					highlight: this.highlight,
					locked: true
				});
				this.bindCalendarEvents(false);
			}
			else {
				this.calendar.highlight = this.highlight;
				this.calendar.unselectAll();
			}
		}
		else {
			this.days_per_week = days_per_week;
			this.daysWrapper = $('.days__selected');

			if (!this.calendar) {
				document.querySelector('#calendar').innerHTML = '';
				this.calendar = new Datepickk({
					container: document.querySelector('#calendar'),
					inline:true,
					today: true,
					range: false,
					maxSelections: days_per_week,
					highlight: this.highlight
				});
				this.bindCalendarEvents(true);
			}
			else {
				this.calendar.highlight = this.highlight;
				this.calendar.maxSelections = days_per_week;
				this.calendar.unselectAll();
			}

			this.exercises_days = exercises_days;
			this.exercises_list = exercises_days;
			this.exercises_select = [];
		}
	}

	bindCalendarEvents (hasEvent) {
		var that = this;

		if (hasEvent) {
			this.calendar.onSelect = function (checked) {
				if (!checked) {
					if (that.exercises_select.length > 0) {
						let item = _.filter(that.exercises_select, (i) => { return moment(i.date, 'x').diff(this.toString()) === 0 })[0];
						let list = _.filter(that.exercises_select, (i) => { return moment(i.date, 'x').diff(this.toString()) !== 0 });

						if (item) that.exercises_list.push(item.exercise);
						that.exercises_select = list;
						that.renderDays();
					}
					$('.box-select-exercise').remove();
				}
				else {
					let t = moment(this.toString()).format('YYYY-MM-DD');
					let el = $('input[data-date^="' + t + '"]');

					let target = el,
						label = target.next('label'),
						date = t;

					let position = label.offset();
					let html = ['<div class="box-select-exercise">'];
					let $tooltip, height;

					that.exercises_list.map((exercise) => {
						html.push(`<div class="box-select-exercise__item" data-date="${date}" data-id="${exercise.id}">${exercise.name}</div>`)
					});
					html.push('</div>');

					$tooltip = $(html.join(''));
					$('.box-select-exercise').remove();
					$('body').append($tooltip);

					height = $tooltip.height();
					$tooltip.css({
						top: position.top - height - 20,
						left: position.left
					});
				}
				that.isComplete = parseInt(that.exercises_select.length) === parseInt(that.days_per_week);
			};
		}
	}

	bindEvents () {
		var that = this;

		$('body').on('click', '.box-select-exercise__item', (e) => {
			if (this.calendar.locked) return false;

			let id = parseInt(e.target.dataset.id),
				date = e.target.dataset.date,
				exercise = _.filter(this.exercises_list, (i) => {return i.id === id})[0];

			this.exercises_select.push({
				date: moment(date).format('x'),
				exercise: exercise
			});

			this.exercises_list = _.filter(this.exercises_list, (i) => { return i.id !== id });
			this.renderDays();
			$('.box-select-exercise').remove();
			that.isComplete = parseInt(that.exercises_select.length) === parseInt(that.days_per_week);
		});
	}

	renderDays () {
		let html = [];
		let arr = this.exercises_select;

		arr = _.sortBy(arr, ['date']);

		arr.map((item) => {
			html.push(`	<li>
								<strong class="week">${moment(item.date, 'x').format('dddd')}:</strong>
								<span class="exercise">${item.exercise.name}</span>
								<strong class="day">${moment(item.date, 'x').format('DD/MM/YYYY')}</strong>
							</li>`);
		});
		this.daysWrapper.html(html.join(''));
	}

	getColor () {
		if (this.colorsToUse.length > 0) {
			return this.colorsToUse.pop();
		}
		else {
			this.colorsToUse = this.colors;
			return this.colorsToUse.pop();
		}
	}

	setHighlight (exercises) {
		this.highlight = this.normalize(exercises);

		if (this.calendar && this.calendar.highlight) {
			this.calendar.highlight = this.highlight;
		}
	}

	normalize (exercises) {
		var highlight = [];

		Object.keys(exercises).map(item => {
			let obj = {
				backgroundColor: this.getColor(),
				color: '#ffffff',
				dates: []
			};

			exercises[item].map(i => {
				let date = moment(i.date, 'x').toDate();
				obj.workout_id = i.workout_id,
				obj.legend = i.plan_name,
				obj.dates.push({
					start: date,
					end: date
				});
			});

			highlight.push(obj);
		});

		return highlight;
	}

	reset () {
		this.calendar = false;
		this.highlight = [];
		this.exercises_select = [];
		this.daysWrapper && this.daysWrapper.html('');
	}
}

export { Calendar as default }
