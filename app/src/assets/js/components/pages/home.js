'use strict';

/**
 *
 */
import Page from 'libs/page';

/**
 *
 */
class Home extends Page {

	constructor (page) {
		super(page);
	}

	onPageAfterAnimation () {
		this.bindEvents();
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
		}, 1000);
	}
}

export { Home as default }
