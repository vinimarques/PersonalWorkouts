'use strict';

/**
 * Import
 */

import Page from '../components/page';

/**
 *
 */
class Home extends Page {
	constructor() {
		super();
	}

	init (page) {
		super.load(page);

		console.log('init home');
	}
}

export { Home as default }
