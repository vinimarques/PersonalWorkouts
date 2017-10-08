'use strict';

import Global from '../global';

/**
 *
 */
class Page {
	constructor() {
		this.page = {};
		this.global = new Global();
	}

	load(pageName) {
		return new Promise((success, error) => {
			let pages = $('.pages');
			let page = $(`[data-page="${pageName}"`);
			let last = pages.find('.page.active');

			this.page.active = last.data('page');

			if (this.page.active === pageName) return false;

			last.removeClass('active');

			setTimeout(() => {
				last.remove();
			}, 500);

			if (page.length === 0) {
				$.get('page/' + pageName + '.html')
					.then((res) => {
						let html = res;
						if (html.indexOf('{include') !== -1) {
							let maths = html.match(/({include\[)(.*)[\]}]/g);

							let pMaths = maths.map((item) => {
								let partialFile = item.replace('{include[','').replace(']}','');
								return $.get('partials/' + partialFile + '.html');
							});

							Promise.all(pMaths).then((htmls) => {
								htmls.map((content, index) => {
									html = html.replace(maths[index], content);
								});

								let tmp = $.templates(html);
								let tmpHtml = tmp.render($.extend(App.data, window.consts));

								pages.append(tmpHtml);
								page = $(`[data-page="${pageName}"`);

								page.addClass('active');
								this.activeNav(pageName);
								this.bindEvents && this.bindEvents();
								this.global.bindEvents && this.global.bindEvents();
								this.onload && this.onload();
								success();
							})
						}
						else {
							let tmp = $.templates(html);
							let tmpHtml = tmp.render($.extend(App.data, window.consts));

							pages.append(tmpHtml);
							page = $(`[data-page="${pageName}"`);

							page.addClass('active');
							this.activeNav(pageName);
							this.bindEvents && this.bindEvents();
							this.global.bindEvents && this.global.bindEvents();
							this.onload && this.onload();
							success();
						}
					})
					.catch(error);
			}
			else {
				page.addClass('active');
				this.activeNav(pageName);
				success();
			}
		});
	}

	bindEvents () {
		$('.global__search input').on('keyup', (ev) => {
			this._searchKeyUp && this._searchKeyUp(ev);
		});

		this._bindEvents && this._bindEvents();
	}

	activeNav(pageName) {
		$('.nav').find('.active').removeClass('active');
		$('.nav').find('.' + pageName).addClass('active');

		this.loadUserInfos();
	}

	loadUserInfos () {
		const user = App.database.get('user');

		$('.header__user .name').text(user.name);
		$('.header__user .company').text(user.company_name);
		$('.header__user .type').text(user.user_type_name);
	}
}

export { Page as default }
