'use strict';

import VMasker from 'vanilla-masker';

/**
*
*/
Framework7.prototype.plugins.form = (app, params) => {
	if (!params) {
		return {};
	}

	let settings = {};
	settings.hooks = {};

	settings.hooks.appInit = () => {
		const $body = $('body');
	};

	settings.hooks.pageAfterAnimation = () => {
		
	};

	return settings;
}
