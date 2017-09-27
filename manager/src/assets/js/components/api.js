// Configurations
var config = require('../config');
var $ = require('jquery');
var CryptoJS = require("crypto-js");

var Api = {
	url: 'http://' + config.apiurl
};

Api.request = (method, path, data) => {
	return new Promise((success, error) => {
		let ajaxOptions = {
			method,
			contentType: 'application/json',
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
	return Api.request('GET', '/users', {email, password});
};

module.exports = Api;
