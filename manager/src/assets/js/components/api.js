'use strict';

import config from '../config';
import Security from './security';
import CryptoJS from 'crypto-js';

/**
*
*/
class Api {

	constructor () {
		this.url = 'http://' + config.apiurl;
		this.headers = {};
		this.security = new Security();
	}

	setHeader (name, value) {
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

	getConsts () {
		return this.request('GET', '/consts');
	}

	login (email, pass) {
		let password = CryptoJS.HmacSHA1(pass, config.key).toString();
		return this.request('POST', '/login', { email, password });
	}

	getUsers (company_id, type) {
		return this.request('GET', '/users', { company_id, type });
	}

	getUser (user_id) {
		return this.request('GET', '/user', { user_id });
	}

	saveUser (data) {
		data.password = CryptoJS.HmacSHA1(data.password, config.key).toString();
		return this.request('POST', '/user', data);
	}

	updateUser (data) {
		if (data.password) data.password = CryptoJS.HmacSHA1(data.password, config.key).toString();
		return this.request('PUT', '/user', data);
	}

	removeUser (data) {
		return this.request('DELETE', '/user', data);
	}

	getExercises (company_id) {
		return this.request('GET', '/exercises', { company_id });
	}

	getExercise (exercise_id) {
		return this.request('GET', '/exercise', { exercise_id });
	}

	saveExercise (data) {
		return this.request('POST', '/exercise', data);
	}

	updateExercise (data) {
		return this.request('PUT', '/exercise', data);
	}

	removeExercise (data) {
		return this.request('DELETE', '/exercise', data);
	}
}

export { Api as default }
