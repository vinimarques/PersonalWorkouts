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
	}

	render (days_per_week, exercises_days) {
		this.days_per_week = days_per_week;
		this.daysWrapper = $('.days__selected');


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

	bindCalendarEvents (hasEvent) {
		var that = this;

		this.calendar.onSelect = function (checked) {
			let t = moment(this.toString()).format('YYYY-MM-DD');
			Page(location.hash.replace('#/','') + '/' + t);
		};
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
