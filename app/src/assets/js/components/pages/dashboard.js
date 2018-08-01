'use strict';

/**
 *
 */
import Page from 'libs/page';
import EasyPieChart from 'libs/easypiechart';
import moment from 'moment';
import config from '../../config';

moment.locale('pt-BR');

/**
 *
 */
class Dashboard extends Page {

	constructor (page) {
		super(page);
	}

	onPageAfterAnimation () {
		this.bindEvents();
		this.load();
	}

	bindEvents () {

	}

	load () {
		let date = moment().format('YYYY-MM');
		App.api.getDashboard(date).then((res) => {
			if (res.success) this.dashboardData = res.data;
			this.loadData();
		});
	}

	loadData () {
		if (!this.dashboardData) {
			$('.dashboard__header, .dashboard__body').hide();
		}

		// Header
		let date = new Date(), y = date.getFullYear(), m = date.getMonth();
		let firstDay = new Date(y, m, 1);
		let lastDay = new Date(y, m + 1, 0);
		let yourFormat = 'DD/MM/YYYY';
		let calories = config.burnPerSecond * this.dashboardData.tracking.reduce((a,b) => {
			return a + b.time;
		}, 0);
		firstDay = moment(firstDay).format(yourFormat);
		lastDay = moment(lastDay).format(yourFormat);

		$('.dashboard__header small').text(`de ${firstDay} a ${lastDay}`);
		$('.dashboard__header h2').text(`${calories.toFixed(0)} kcal`);


		// Month
		let percentMonth = (this.dashboardData.tracking.length / this.dashboardData.calendar.length * 100).toFixed(0);
		$('.-chart.-chart-month').attr('data-percent',percentMonth);
		$('.-chart.-chart-month').next('ul').find('strong').text(percentMonth + '%');
		$('.-chart.-chart-month').next('ul').find('small').text(`${this.dashboardData.tracking.length} / ${this.dashboardData.calendar.length}`);
		let month = new EasyPieChart($('.-chart-month')[0], {
			barColor: '#EF476F',
			trackColor: '#f5f5f5',
			scaleColor: false,
			lineWidth: 10,
			trackWidth: 4,
			lineCap: 'round',
			size: 120,
			animate: {
				enabled: false,
				duration: 1000
			}
		});

		// Total
		let percentTotal = (this.dashboardData.total.tracking.length / this.dashboardData.total.calendar.length * 100).toFixed(0);
		let totalTime = this.dashboardData.total.tracking.reduce((a,b) => {
			return a + b.time;
		}, 0);
		let totalCalories = config.burnPerSecond * totalTime;
		let timePerWorkout = moment.utc((totalTime / this.dashboardData.total.calendar.length)*1000).format('HH:mm:ss');

		$('.-chart.-chart-total').attr('data-percent',percentTotal);
		$('.-chart.-chart-total').next('ul').find('strong').text(percentTotal + '%');
		$('.-chart.-chart-total').next('ul').find('small').text(`${this.dashboardData.total.tracking.length} / ${this.dashboardData.total.calendar.length}`);
		$('.total-calories').text(`${totalCalories.toFixed(0)} kcal`);
		$('.total-per-workout').text(`${(totalCalories / this.dashboardData.total.tracking.length).toFixed(0)} kcal`);
		$('.total-per-time').text(`${timePerWorkout}`);

		let total = new EasyPieChart($('.-chart-total')[0], {
			barColor: '#4470DA',
			trackColor: '#f5f5f5',
			scaleColor: false,
			lineWidth: 10,
			trackWidth: 4,
			lineCap: 'round',
			size: 120,
			animate: {
				enabled: false,
				duration: 1000
			}
		});

		this.container.removeClass('-loading');
	}
}

export { Dashboard as default }
