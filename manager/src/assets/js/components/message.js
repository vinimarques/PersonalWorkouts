'use strict';

/**
 * Import
 */


/**
 *
 */
class Message {
	constructor() {
		this.modal = $('.modal-message');
		this.content = this.modal.find('.modal__content');
		this.body = $('body');

		this.bindEvents();
	}

	reset (time) {
		this.body.removeClass('modal-active');
		$('.modal').removeClass('active');
		if (time)
			setTimeout(() => {
				this.content.html('');
			}, time)
		else
			this.content.html('');
	}

	show (text) {
		this.reset();

		this.content.html(`<p>${text}</p>`);
		this.modal.addClass('active');
		this.body.addClass('modal-active');
	}

	bindEvents () {
		$('body').on('click', '.modal__close', () => {
			this.reset(300);
		});
	}
}

export { Message as default }
