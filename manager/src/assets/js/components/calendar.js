'use strict';

import Datepickk from '../libs/datepickk';
import moment from 'moment';

/**
 *
 */
class Calendar {
	constructor (params) {
		this.params = params;
		this.colors = ['#446FDA','#92ADEE','#678AE4','#2254CF','#0D3BAC'];
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
		this.bindEvents();
	}

	bindEvents () {
		this.calendar.onSelect = (e) => {
			console.log(e);
		};

		$('body').on('click', '.d-table input', (ev) => {
			let target = ev.target,
				isSelected = target.checked;

			console.log(target,isSelected);

		})
	}

	renderDays () {
		let html = [];
		this.calendar.selectedDates.map((day, index) => {
			html.push(`	<li>
								<strong class="week">${moment(day).format('dddd')}:</strong>
								<span class="exercise">${this.exercises_days[index].name}</span>
								<strong class="day">${moment(day).format('DD/MM/YYYY')}</strong>
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
