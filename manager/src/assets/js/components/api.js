'use strict';

import config from '../config';
import Security from './security';
import CryptoJS from 'crypto-js';

/**
*
*/
class Api {

	constructor() {
		this.url = 'http://' + config.apiurl;
		this.headers = {};
		this.security = new Security();
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
				error: (err) => {
					this.verifyError(err.responseJSON);
				},
				headers: this.headers
			};
			$.ajax(ajaxOptions);
		})
	}

	verifyError (res) {
		console.log(res);
		if (res.error.status === 432) {
			this.security.clearAndRedirect();
		}
	}

	login (email, pass) {
		let password = CryptoJS.HmacSHA1(pass, config.key).toString();
		return this.request('POST', '/login', { email, password });
	}

	users(company_id) {
		return this.request('GET', '/users', {company_id});
	}

	getConsts() {
		return this.request('GET', '/consts');
	}
}

export { Api as default }
