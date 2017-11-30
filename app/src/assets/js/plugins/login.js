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

	const login = $('.page-login__form');
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
					login.removeClass('-vhidden');
				}
			})
			.catch(() => {
				loader.addClass('-vhidden');
				login.removeClass('-vhidden');
			});

		login.on('submit', (e) => {
			e.preventDefault();

			let data = {
				email: login.find('[name="email"]').val(),
				password: login.find('[name="password"]').val()
			};

			if (!data.email || !data.password) return false;

			loader.removeClass('-vhidden');
			login.addClass('-vhidden');

			App.api
				.login(data.email, data.password)
				.then((res) => {
					if (res.success) {
						App.consts.init(() => {
							$('.tabbar .toolbar-inner-item').removeClass('-active').eq(0).addClass('-active');
							App.mainView.router.loadPage(`pages/home.html`);
							App.closeModal();
						});
					}
					loader.addClass('-vhidden');
					login.removeClass('-vhidden');
				})
				.catch((err) => {
					loader.addClass('-vhidden');
					login.removeClass('-vhidden');
				});
		});
	}

	return settings;
}
