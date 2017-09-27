'use strict';

var $ = require('jquery');

/**
 *
 */
class Page {
	constructor() {

	}

	load(pageName) {
		let pages = $('.pages');
		let page = $(`[data-page="${pageName}"`);

		pages.find('.page.active').removeClass('active');

		if (page.length === 0) {
			$.get('page/' + pageName + '.html')
				.then((res) => {
					pages.append(res);
					page = $(`[data-page="${pageName}"`);

					page.addClass('active');
				});
		}
		else {
			page.addClass('active');
		}

	}
}

export { Page as default }
