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
import Days from './page/days';
import ExercisesDay from './page/exercises-day';

import Exercises from './page/exercises';
import Calendar from './page/calendar';

/**
*
*/
export default {
	init() {
		let router = new Router();

		// alias , Class , hasSecurity, params
		router.add('login', 					Login);
		router.add('home', 					Home, 				true);
		router.add('users', 					Users, 				true);
		router.add('plans', 					Plans, 				true);
		router.add('days', 					Days, 				true, 'plans/:day');
		router.add('exercises-day', 		ExercisesDay, 		true, 'plans/:day/:ex_day');
		router.add('exercises', 			Exercises, 			true);
		router.add('calendar', 				Calendar, 			true);

		router.start();
	}
}
