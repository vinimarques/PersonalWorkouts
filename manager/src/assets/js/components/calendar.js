'use strict';

import Datepickk from '../libs/datepickk';
import moment from 'moment';
import _ from 'lodash';

/**
 *
 */
class Calendar {
	constructor (params) {
		this.params = params;
		this.colors = ['#446FDA','#92ADEE','#678AE4','#2254CF','#0D3BAC'];
		this.selection = [];
	}

	render (days_per_week, exercises_days) {
		var now = new Date();
		var rand = () => { return Math.floor((Math.random() * 4) + 1) };

		this.daysWrapper = $('.days__selected');
		this.calendar = new Datepickk({
			container: document.querySelector('#calendar'),
			inline:true,
			today: true,
			range: false,
			maxSelections: days_per_week
		});

		this.exercises_days = exercises_days;
		this.exercises_list = exercises_days;
		this.exercises_select = [];
		this.bindEvents();
	}

	bindEvents () {
		var that = this;

		this.calendar.onSelect = function (checked) {
			if (!checked && that.exercises_select.length > 0) {
				// use moment to compare dates
				let item = _.filter(that.exercises_select, (i) => { return moment(i.date, 'X').diff(this.toString()) === 0 })[0];
				let list = _.filter(that.exercises_select, (i) => { return moment(i.date, 'X').diff(this.toString()) !== 0 });

				that.exercises_list.push(item.exercise);
				that.exercises_select = list;
				that.renderDays();
			}
		};

		$('body').on('click', '.d-table input', (ev) => {
			let target = ev.target,
				isSelected = target.checked,
				label = $(target).next('label'),
				date = target.dataset.date;

			if (isSelected) {
				let position = label.offset();
				let html = ['<div class="box-select-exercise">'];
				let $tooltip, height;

				this.exercises_list.map((exercise) => {
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
				})
			}
			else {
				$('.box-select-exercise').remove();
			}
		});

		$('body').on('click', '.box-select-exercise__item', (e) => {
			if (this.calendar.locked) return false;

			let id = parseInt(e.target.dataset.id),
				date = e.target.dataset.date,
				exercise = _.filter(this.exercises_list, (i) => {return i.id === id})[0];

			this.exercises_select.push({
				date: moment(date).format('X'),
				exercise: exercise
			});

			this.exercises_list = _.filter(this.exercises_list, (i) => { return i.id !== id });
			this.renderDays();
			$('.box-select-exercise').remove();
		});
	}

	renderDays () {
		let html = [];
		let arr = this.exercises_select;
		console.log(arr);
		arr = _.sortBy(arr, ['date']);

		arr.map((item) => {
			html.push(`	<li>
								<strong class="week">${moment(item.date, 'X').format('dddd')}:</strong>
								<span class="exercise">${item.exercise.name}</span>
								<strong class="day">${moment(item.date, 'X').format('DD/MM/YYYY')}</strong>
							</li>`);
		});
		this.daysWrapper.html(html.join(''));
	}
}

// maxSelections: 3,
// highlight: [
// 	{
// 		dates: [
// 			{
// 				start: new Date(2017,9,29),
// 				end: new Date(2017,9,29)
// 			},
// 			{
// 				start: new Date(2017,9,31),
// 				end: new Date(2017,9,31)
// 			},
// 			{
// 				start: new Date(2017,10,2),
// 				end: new Date(2017,10,2)
// 			}
// 		],
// 		backgroundColor: this.colors[rand()],
// 		color: '#ffffff',
// 		legend: 'Treino de força'
// 	}
// ]

export { Calendar as default }
