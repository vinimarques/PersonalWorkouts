'use strict';

/**
 *
 */
class Loader {
	constructor() {
		this.$body = $('body');
	}

	show () {
		this.$body.addClass('loading');
	}

	hide() {
		this.$body.removeClass('loading');
	}
}

export { Loader as default }
