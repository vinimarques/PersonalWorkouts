'use strict';

/**
 *
 */
import 'Framework7';

/**
 * Plugins
 */
import './plugins/login.js';
import './plugins/menu.js';
import './plugins/form.js';
import 'components/helpers';
import consts from './consts';

/**
 *
 */
import State from 'libs/state';
import Database from 'libs/database';
import Api from 'libs/api';
import Routes from './routes';
import config from './config';
import Permissions from 'components/permissions';
/**
*
*/
document.addEventListener('deviceready', () => {
	const options = {
		version: config.version
	};
	const database = new Database('PersonalWorkouts', options);
	const settings = {
		init: false,
		animatePages: false,
		precompileTemplates: true,
		template7Pages: true,
		uniqueHistory: false,
		sortable: false,
		hideNavbarOnPageScroll: false,
		showBarsOnPageScrollEnd: false,

		tapHold: true,
		tapHoldDelay: 200,
		tapHoldPreventClicks: true,

		debug: config.debug,
		login: true,
		menu: true,
		form: true
	};

	window.$ = Dom7;
	window.App = new Framework7(settings);

	App.consts = consts;
	App.State = new State();
	App.database = database;
	Template7.global = {};

	App.api = new Api();
	App.permissions = new Permissions();

	Routes.init();
	App.init();
});
