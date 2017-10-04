'use strict';
/**
 *
 */
class Global {
	constructor () {}

	bindEvents () {

		$('.header .quit a').on('click', (ev) => {
			ev.preventDefault();

			console.log('quit');
		});

	}
}

export { Global as default }
