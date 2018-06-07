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
import PlansUser from './page/plans-user';
import ExercisesDay from './page/exercises-day';
import Exercises from './page/exercises';


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
		router.add('plans-user',			PlansUser, 			true, 'plans/:user');
		router.add('exercises-day', 		ExercisesDay, 		true, 'plans/:user/:day');
		router.add('exercises', 			Exercises, 			true);

		router.start();
	}
}
