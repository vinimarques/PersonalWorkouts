'use strict';

import config from '../config';
import CryptoJS from 'crypto-js';

/**
*
*/
class Api {

	constructor() {
		this.url = 'http://' + config.apiurl;
		this.headers = {};
	}

	setHeader(name, value) {
		this.headers[name] = value;
	}

	request (method, path, data) {
		return new Promise((success, error) => {
			let ajaxOptions = {
				method,
				data: data,
				url: this.url + path,
				success: (response) => {
					success(response);
				},
				error: error,
				headers: this.headers
			};
			$.ajax(ajaxOptions);
		})
	}

	login (email, pass) {
		let password = CryptoJS.HmacSHA1(pass, config.key).toString();
		return this.request('POST', '/login', { email, password });
	}

	users () {
		return this.request('GET', '/users');
	}
}

export { Api as default }
