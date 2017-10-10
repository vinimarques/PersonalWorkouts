'use strict';

/**
 *
 */
class Helpers {
	constructor() {}

	generatePassword () {
		let length = 8,
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
			retVal = "";

		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}

		return retVal;
	}

	populateForm (form, data) {
		Object.keys(data).map((key) => {
			let value = data[key];
			$(form).find(`[name="${key}"]`).val(value);
		});
	}
}

export { Helpers as default }
