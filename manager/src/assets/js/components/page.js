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

							setTimeout(() => {
								pages.html(tmpHtml);
								page = $(`[data-page="${pageName}"`);

								page.addClass('active');
								this.activeNav(pageName);
								this.bindEvents && this.bindEvents();
								this.global.bindEvents && this.global.bindEvents();
								this.onload && this.onload();
								success();
							}, 300);
						})
					}
					else {
						let tmp = $.templates(html);
						let tmpHtml = tmp.render($.extend(App.data, window.consts));

						pages.html(tmpHtml);
						page = $(`[data-page="${pageName}"`);

						setTimeout(() => {
							page.addClass('active');
							this.activeNav(pageName);
							this.bindEvents && this.bindEvents();
							this.global.bindEvents && this.global.bindEvents();
							this.onload && this.onload();
							success();
						}, 300);
					}
				})
				.catch(error);
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


		this.addBodyActive(pageName);
		this.loadUserInfos();
	}

	addBodyActive (pageName) {
		let bodyClass = $('body').attr('class');
		let prefix = 'active-page-';
		if (bodyClass) {
			let arr = bodyClass.split(' ');

			arr = arr.filter(function (c) {
				return c.indexOf(prefix) === -1;
			});

			$('body')[0].className = arr.join(' ');
		}

		$('body').addClass(prefix + pageName)
	}

	loadUserInfos () {
		const user = App.database.get('user');

		if (user.user_type_id !== 1 && user.user_type_id !== 2) {
			$('.nav').find('.users').hide();
		}
		else {
			$('.nav').find('.users').show();
		}

		$('.header__user .name').text(user.name);
		$('.header__user .company').text(user.company_name);
		$('.header__user .type').text(user.user_type_name);
	}
}

export { Page as default }
