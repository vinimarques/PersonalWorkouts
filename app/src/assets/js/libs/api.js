'use strict';

import _ from 'lodash';
import config from '../config';
import CryptoJS from 'crypto-js';
import cache from './cache';

class Api {

	constructor () {
		this.apiPath = config.api.url;
		this.headers = {};
		cache.initialize(config.cacheTime)
	}

	request(method, path, data, verify) {
		return new Promise((success, error) => {
			let _verify = (verify !== undefined) ? verify : true;
			let errorCallback = (err , status) => {
				let response = JSON.parse(err.response).error;
				if (_verify) this.verifyError(err.status, response, error);
				else error && error(response);
			};

			let ajaxOptions = {
				method,
				contentType: 'application/json',
				data: JSON.stringify(data),
				url: this.apiPath + path,
				success: (response) => {
					let json = JSON.parse(response);
					cache.write(path,response);
					success(json);
				},
				error: errorCallback,
				headers: this.headers
			};
			$.ajax(ajaxOptions);
		})
	}

	setHeader(name, value) {
		this.headers[name] = value;
	}

	verifyError (err, response, callback) {
		console.log(err)
		switch (err) {
			case 401:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Usuário não encontrado. Tente novamente.', this.goToLogin);
				}, 250);
				break;

			case 432:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Você precisa estar logado.', this.goToLogin);
				}, 250);
				break;
		}
		callback && callback(response);
	}

	goToLogin() {
		setTimeout(() => {
			App.loginScreen();
		}, 500);
	}

	isLogged () {
		return new Promise((success, error) => {
			let user = App.database.get('user');

			if (user && user.token) {
				this.setHeader('Authorization','Bearer ' + user.token);
				success({success: true, user: {}});
				Template7.global.user = user;
			}
			else {
				success({success: false});
			}
		})
	}

	getConsts () {
		return this.request('GET', '/consts');
	}

	login (email, pass) {
		let password = CryptoJS.HmacSHA1(pass, config.key).toString();
		return new Promise((success, error) => {
			this.request('POST', '/login', { email, password })
				.then((res) => {
					let user = res.user;
					user.token = res.token;

					App.database.set('user', user);
					this.setHeader('Authorization', 'Bearer ' + user.token);

					Template7.global.user = user;

					success({ success: true, user });
				})
				.catch((err) => { error && error(err); })
		});
	}

	logout () {
		return this.request('POST', `/logout`);
	}

	getCalendar (date) {
		return this.request('GET', `/calendar?user_id=${Template7.global.user.id}`);
	}

	getCalendarDate (date) {
		return this.request('GET', `/calendar-user?user_id=${Template7.global.user.id}&date=${date}`);
	}

	getTime (date) {
		return this.request('GET', `/tracking?user_id=${Template7.global.user.id}&date=${date}`);
	}

	saveTime (time, date) {
		return this.request('POST', `/tracking`, {
			users_id: Template7.global.user.id,
			date: date,
			time: parseInt(time)
		});
	}
}

export { Api as default }
