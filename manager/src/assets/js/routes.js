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

		router.add('login', Login);
		router.add('home', Home, true);

		router.start();
	}
}
