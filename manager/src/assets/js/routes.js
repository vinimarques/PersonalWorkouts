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
import Users from './page/users';
import Plans from './page/plans';
import Exercises from './page/exercises';
import Calendar from './page/calendar';

/**
*
*/
export default {
	init() {
		let router = new Router();

		// alias , Class , hasSecurity
		router.add('login', 		Login);
		router.add('home', 		Home, 		true);
		router.add('users', 		Users, 		true);
		router.add('plans', 		Plans, 		true);
		router.add('exercises', Exercises, 	true);
		router.add('calendar', 	Calendar, 	true);

		router.start();
	}
}
