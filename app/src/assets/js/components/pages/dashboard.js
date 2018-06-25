'use strict';

/**
 *
 */
import Page from 'libs/page';
import EasyPieChart from 'libs/easypiechart';

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
	}
}

export { Dashboard as default }
