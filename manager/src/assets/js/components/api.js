// Configurations
import config from '../config';
var CryptoJS = require("crypto-js");

var Api = {
	url: 'http://' + config.apiurl
};

Api.request = (method, path, data) => {
	return new Promise((success, error) => {
		let ajaxOptions = {
			method,
			data: data,
			url: Api.url + path,
			success: (response) => {
				success(response);
			},
			error: error
		};
		$.ajax(ajaxOptions);
	})
};

Api.login = (email, pass) => {
	let password = CryptoJS.HmacSHA1(pass, config.key).toString();
	return Api.request('POST', '/login', {email, password});
};

module.exports = Api;
