'use strict';

/**
 *
 */
import Page from 'libs/page';
import Chartist from 'libs/chartist';

/**
 *
 */
class Weigth extends Page {

	constructor (page) {
		super(page);
	}

	onPageAfterAnimation () {
		this.bindEvents();
		this.load();
	}

	bindEvents () {
		console.log('dasd')
	}

	load () {
		new Chartist.Line('.ct-chart', {
				labels: [1, 2, 3, 4, 5, 6, 7, 8],
				series: [
					[5, 9, 7, 8, 5, 3, 5, 4],
					[1, 3, 3, 6, 2, 12, 4, 1]
				]
			}, {
				low: 0,
				showArea: true
		});
	}
}

export { Weigth as default }
