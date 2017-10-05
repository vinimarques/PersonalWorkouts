import config from './config';
import Routes from './routes';
import Consts from './consts';

// Import jQuery Global
import $ from 'jquery';
window.$ = window.jQuery = $;

// Import jsRender
require('jsrender')($);

import Message from './components/message';
import Database from './components/database';
import Api from './components/api';

//Applications
window.App = {};

App.init = () => {
	console.log('initalize');
	const options = {
		version: config.version
	};
	const database = new Database('personalworkouts', options);

	App.data = {};
	App.message = new Message();
	App.api = new Api();
	App.database = database;

	Consts.init(() => {
		Routes.init();
	});
};

App.init();
