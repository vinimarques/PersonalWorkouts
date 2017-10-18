'use strict';

/**
*
*/
Framework7.prototype.plugins.login = (app, params) => {
	if (!params) {
		return {};
	}

	let settings = {};
	settings.hooks = {};

	const loginButton = $('.google-login-button');
	const loader = $('.login-preloader');

	settings.hooks.appInit = () => {
		App.api
			.isLogged()
			.then((res) => {
				if (res.success) {
					$('.tabbar .toolbar-inner-item').removeClass('-active').eq(0).addClass('-active');
					App.mainView.router.loadPage(`pages/home.html`);
					App.closeModal();
				}
				else {
					App.database.rm('user');
					App.api.goToLogin();
					loader.addClass('-vhidden');
					loginButton.removeClass('-vhidden');
				}
			})
			.catch(() => {
				loader.addClass('-vhidden');
				loginButton.removeClass('-vhidden');
			});

		loginButton.on('click', () => {
			loader.removeClass('-vhidden');
			loginButton.addClass('-vhidden');

			App.api
				.login()
				.then((res) => {
					if (res.success) {
						App.consts.init(() => {
							$('.tabbar .toolbar-inner-item').removeClass('-active').eq(0).addClass('-active');

							App.mainView.router.loadPage(`pages/home.html`);
							App.closeModal();
							App.filters = new Filters();
							App.notification.verify();
						});
					}
					loader.addClass('-vhidden');
					loginButton.removeClass('-vhidden');
				})
				.catch((err) => {
					loader.addClass('-vhidden');
					loginButton.removeClass('-vhidden');
				});
		});
	}

	return settings;
}
