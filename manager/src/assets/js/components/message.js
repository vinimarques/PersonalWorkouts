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

	close (time) {
		setTimeout(() => {
			this.body.removeClass('modal-active');
			$('.modal').removeClass('active');
		}, time ? time  : 0);
	}

	show (text, time) {
		this.reset();

		this.content.html(`<p>${text}</p>`);
		this.modal.addClass('active');
		this.body.addClass('modal-active');

		if (time) this.close(time);
	}

	bindEvents () {
		$('body').on('click', '.modal__close', (ev) => {
			this.reset(300);
			let name = $(ev.target).parents('.modal').data('name');

			if (name) {
				var modalClose = new CustomEvent('modal:' + name);
				window.dispatchEvent(modalClose);
			}
		});
	}
}

export { Message as default }
