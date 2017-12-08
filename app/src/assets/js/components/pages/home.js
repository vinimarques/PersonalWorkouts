'use strict';

/**
 *
 */
import Page from 'libs/page';
import _ from 'lodash';

/**
 *
 */
class Home extends Page {

	constructor (page) {
		super(page);
	}

	onPageAfterAnimation () {
		this.bindEvents();
		this.load();
	}

	bindEvents () {
		$('.page-home__content__exercises__item__title').on('click', function () {
			$(this).parent().toggleClass('-active');
		})

		$('.btn-timer').on('click', function () {
			$(this).toggleClass('-playing');
		});

		setTimeout(() => {
			$('.-loading').removeClass('-loading');
		}, 500);
	}

	load () {
		App.api.getCalendar()
			.then((res) => {
				console.log(res);
			});
	}
}

export { Home as default }
