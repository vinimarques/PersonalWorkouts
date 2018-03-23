'use strict';

/**
*
*/
import Router from './libs/router';

/**
*
*/
import Home from 'components/pages/home';
import Weigth from 'components/pages/weigth';

/**
*
*/
export default {
	init() {
		let router = new Router();

		router.add('home', Home);
		router.add('weigth', Weigth);

		App.State.Router = router.State;
	}
}
