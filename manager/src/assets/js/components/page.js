'use strict';

/**
 *
 */
class Page {
	constructor() {}

	load(pageName) {
		return new Promise((success, error) => {
			let pages = $('.pages');
			let page = $(`[data-page="${pageName}"`);

			pages.find('.page.active').removeClass('active');

			if (page.length === 0) {
				$.get('page/' + pageName + '.html')
					.then((res) => {
						pages.append(res);
						page = $(`[data-page="${pageName}"`);

						page.addClass('active');
						this._bindEvents && this._bindEvents();
						success();
					})
					.catch(error);
			}
			else {
				page.addClass('active');
				success();
			}
		});
	}
}

export { Page as default }
