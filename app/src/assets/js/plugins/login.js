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

			loader.removeClass('-vhidden');
			login.addClass('-vhidden');

			let data = {
				email: login.find('[name="email"]').val(),
				password: login.find('[name="password"]').val()
			};
			console.log(data);

			// App.api
			// 	.login()
			// 	.then((res) => {
			// 		if (res.success) {
			// 			App.consts.init(() => {
			// 				$('.tabbar .toolbar-inner-item').removeClass('-active').eq(0).addClass('-active');
			// 				App.mainView.router.loadPage(`pages/home.html`);
			// 				App.closeModal();
			// 				App.notification.verify();
			// 			});
			// 		}
			// 		loader.addClass('-vhidden');
			// 		login.removeClass('-vhidden');
			// 	})
			// 	.catch((err) => {
			// 		loader.addClass('-vhidden');
			// 		login.removeClass('-vhidden');
			// 	});
		});
	}

	return settings;
}
