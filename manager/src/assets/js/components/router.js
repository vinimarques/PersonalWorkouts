'use strict';

/**
 * Import
 */
import Security from './security.js';
import Page from 'page';
window.Page = Page;

/**
 *
 */
class Router {
	constructor() {
		this.security = new Security();
		Page('/', () => {
			this.redirect();
		});
	}

	/**
	 *
	 */
	add(alias, init, hasSecurity) {
		if (hasSecurity)
			Page('/' + alias, () => {
				this.security.validate() ? init(alias) : () => {};
			});
		else
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
		if (!this.security.validate()) {
			Page('/login');
		}
		else {
			Page('/home');
		}
	}
}

export { Router as default }
