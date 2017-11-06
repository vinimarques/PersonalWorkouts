import config from './config';
import Routes from './routes';
import Consts from './consts';

// Import jQuery Global
import $ from 'jquery';
window.$ = window.jQuery = $;

// Import jsRender
require('jsrender')($);
const renderHelpers = require('./components/render-helpers');
$.views.helpers(renderHelpers.default);


// Import Select2
require('./libs/select2.min');

import Message from './components/message';
import Database from './components/database';
import Api from './components/api';
import Helpers from './components/helpers';
import Loader from './components/loader';

//Applications
window.App = {};

App.init = () => {
	console.log('initalize');
	const options = {
		version: config.version
	};
	const database = new Database('personalworkouts', options);

	App.config = {
		timeCloseModal: config.timeCloseModal
	};
	App.loader = new Loader();
	App.helpers = new Helpers();
	App.data = {};
	App.message = new Message();
	App.api = new Api();
	App.database = database;

	Consts.init(() => {
		Routes.init();
	});
};

App.init();
