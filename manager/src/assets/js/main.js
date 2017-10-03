import config from './config';
import Routes from './routes';

// Import jQuery Global
import $ from 'jquery';
window.$ = window.jQuery = $;

import Message from './components/message';
import Database from './components/database';

//Applications
window.App = {};

App.init = () => {
	console.log('initalize');
	const options = {
		version: config.version
	};
	const database = new Database('personalworkouts', options);

	App.message = new Message();
	App.database = database;
	Routes.init();
};

App.init();
