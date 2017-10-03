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

	add(alias, init, hasSecurity) {
		let page = new init(hasSecurity);
		let _that = this;

		Page('/' + alias, function (ctx) {
			if (hasSecurity) _that.security.validate().then(() => { page.init(alias, ctx) });
			else page.init(alias, ctx);
		});
	}

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
