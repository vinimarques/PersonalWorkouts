'use strict';
/**
 *
 */
class Global {
	constructor () {}

	bindEvents () {
		const $body = $('body');

		$('.header .quit a').on('click', (ev) => {
			ev.preventDefault();

			console.log('quit');
		});

		$body.on('click', '.open-modal', function () {
			let modal = $(this).data('modal');

			$body.removeClass('modal-active');
			$('.modal').removeClass('active');

			$('.modal-' + modal).addClass('active');
			$body.addClass('modal-active');
		});
	}
}

export { Global as default }
