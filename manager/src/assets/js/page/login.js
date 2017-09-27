'use strict';


/**
 * Import
 */

import Page from '../components/page';

/**
 *
 */
class Login extends Page {
	constructor() {
		super();
	}

	init(page) {
		super.load(page);

		console.log('init login');
	}
}

export { Login as default }
