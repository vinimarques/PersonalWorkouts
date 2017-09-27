'use strict';

/**
 * Import
 */

import Page from 'page';

/**
 *
 */
class Router {
	constructor() {
		Page('/', this.redirect);
	}

	/**
	 *
	 */
	add(alias, init) {

		Page('/' + alias, () => { init(alias) });

	}

	/**
	 *
	 */
	start () {

		Page({
			hashbang: true
		});
	}

	redirect () {
		if (1 === 1) {
			Page('/login');
		}
		else {
			Page('/home');
		}
	}
}

export { Router as default }
