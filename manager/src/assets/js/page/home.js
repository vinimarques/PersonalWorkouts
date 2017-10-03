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

	init(page, ctx) {
		console.log(ctx);
		super.load(page);
	}

	_bindEvents () {
		App.api.users().then((res) => {
			console.log(res);
		})
	}
}

export { Home as default }
