'use strict';

/**
*
*/
Framework7.prototype.plugins.menu = (app, params) => {
	if (!params) {
		return {};
	}

	let settings = {};
	settings.hooks = {};

	settings.hooks.appInit = () => {
		document.addEventListener("backbutton", () => {
			if ($('.panel.active').length > 0) {
				if ($('.-panel-list.-active').length > 0) {
					$('.-panel-list.-active').removeClass('-active');
				}
				else {
					App.closePanel();
				}
			}
			else if ($('.popup.modal-in').length > 0) {
				App.closeModal();
			}
			else if ($('.actions-modal.modal-in').length > 0) {
				App.closeModal();
			}
			else if ($('.-modal.-active').length > 0) {
				$('.-modal.-active').removeClass('-active');
				$('.tooltip-overlay').removeClass('-active');
			} else {
				App.mainView.router.back();
			}

			$(' .toolbar-inner-item').removeClass('-active');
			$('.toolbar-inner-item[href="' + App.mainView.activePage.url + '"]').addClass('-active');

		}, false);

		const menuItem = $('.toolbar-inner-item');

		menuItem.on('click', function(ev) {
			var $this = $(this);

			if ($this.hasClass('-active'))
				return;

			$this.parent().find('.toolbar-inner-item').removeClass('-active');
			$this.addClass('-active');

			app.mainView.router.load({
				url: $this.data('href')
			});

			ev.preventDefault();
			return false;
		});
	}

	return settings;
}
