'use strict';

/**
*
*/
import Router from './libs/router';

/**
*
*/
import Home from 'components/pages/home';

/**
*
*/
export default {
	init() {
		let router = new Router();

		router.add('home', Home);

		App.State.Router = router.State;
	}
}
