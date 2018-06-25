'use strict';

/**
*
*/
import Router from './libs/router';

/**
*
*/
import Home from 'components/pages/home';
import Dashboard from 'components/pages/dashboard';
import Settings from 'components/pages/settings';

/**
*
*/
export default {
	init() {
		let router = new Router();

		router.add('home', Home);
		router.add('dashboard', Dashboard);
		router.add('settings', Settings);

		App.State.Router = router.State;
	}
}
