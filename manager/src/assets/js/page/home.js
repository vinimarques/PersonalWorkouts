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

		this.bindEvents();
	}

	bindEvents () {

	}
}

export { Home as default }
