'use strict';

import config from '../config';

/**
 *
 */
class Message {
	constructor () {
		this.isLoader = false;
		this.notificationDelay = 500;
	}

	error (msg, callback) {
        App.hidePreloader();
		App.alert(msg, 'Erro', callback);
	}

	success (msg, title) {
		setTimeout(function() {
			App.addNotification({
				title: title || 'Sucesso',
				message: msg,
				hold: 5000
			})
		}, this.notificationDelay);
	}

	loader (msg) {
		let _msg = msg || 'Enviando';
		if (!this.isLoader) {
			App.showPreloader(_msg);
			this.isLoader = true;
		}
		else {
			App.hidePreloader();
		}
	}

	versionError () {
		let url = config.api.url.replace('api','release/');
		let lnk = `itms-services://?action=download-manifest&url=${url}ipa/manifest.plist`;
		let btn = $('.popup-version-error .btn-update');

		if (device.platform === 'Android') {
			lnk = url + 'apk/latest.apk'
		}

		btn.attr('href', lnk);

		App.popup('.popup-version-error');
	}
}

export { Message as default }
