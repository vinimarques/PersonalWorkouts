'use strict';

/**
*
*/
import Router from './components/router';

/**
*
*/
import Login from './page/login';
import Home from './page/home';

/**
*
*/
export default {
	init() {
		let router = new Router();

		let pageLogin = new Login();
		let pageHome = new Home();

		router.add('login', () => {
			pageLogin.init('login');
		});
		router.add('home', () => {
			pageHome.init('home');
		}, true);

		router.start();
	}
}
