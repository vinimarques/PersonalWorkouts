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
			App.loader.show();
			let ajaxOptions = {
				method,
				data: data,
				url: this.url + path,
				success: (response) => {
					App.loader.hide();
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

	getPlans (company_id) {
		return this.request('GET', '/plans', { company_id });
	}

	getPlan (plan_id) {
		return this.request('GET', '/plan', { plan_id });
	}

	savePlan (data) {
		return this.request('POST', '/plan', data);
	}

	updatePlan (data) {
		return this.request('PUT', '/plan', data);
	}

	removePlan (data) {
		return this.request('DELETE', '/plan', data);
	}

	getDays (plan_id) {
		return this.request('GET', '/days', { plan_id });
	}

	getDay (day_id) {
		return this.request('GET', '/day', { day_id });
	}

	saveDay (data) {
		return this.request('POST', '/day', data);
	}

	updateDay (data) {
		return this.request('PUT', '/day', data);
	}

	removeDay (data) {
		return this.request('DELETE', '/day', data);
	}

	getDayExercises (day_id) {
		return this.request('GET', '/day-exercises', { day_id });
	}

	getDayExercise (day_exercise_id) {
		return this.request('GET', '/day-exercise', { day_exercise_id });
	}

	saveDayExercise (data) {
		return this.request('POST', '/day-exercise', data);
	}

	updateDayExercise (data) {
		return this.request('PUT', '/day-exercise', data);
	}

	removeDayExercise (data) {
		return this.request('DELETE', '/day-exercise', data);
	}

	getCalendar (data) {
		return this.request('GET', '/calendar', data);
	}

	saveCalendar (data) {
		return this.request('POST', '/calendar', data);
	}
}

export { Api as default }
