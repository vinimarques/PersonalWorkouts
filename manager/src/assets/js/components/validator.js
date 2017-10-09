'use strict';

/**
 *
 */
class Validator {
	constructor() {
		this.rules = {
			required: {
				test: function (value) {
					return value !== '' && value !== undefined
				},
				message: 'Field is required'
			},
			email: {
				test: function (value) {
					return /^(?:[\w-]+\.?\+?)*[\w-]+@(?:\w+\.)+\w+$/.test(value);
				},
				message: 'E-mail is invalid'
			}
		};
	}

	getData (form) {
		let data = [];
		$(form).find('input, select, textarea').each((index, element) => {
			data.push({
				field: {
					name: element.name,
					value: (element.dataset.type) ? this.convert(element.dataset.type, element.value) : element.value
				},
				test: element.dataset.validate.split(',')
			});
		});

		return data;
	}

	getDataSend(form) {
		let data = {};
		$(form).find('input, select, textarea').each((index, element) => {
			data[element.name] = (element.dataset.type) ? this.convert(element.dataset.type, element.value) : element.value;
		});

		return data;
	}

	convert (type, value) {
		let val = value;
		if (value === '') return undefined;

		switch (type) {
			case 'int':
				val = parseInt(value);
				break;
		}

		return val;
	}

	isValide (data) {
		if (data.length === 0)
			return {
				error: true,
				message: 'Data is empty.'
			};

		let errors = [];

		data.map((item) => {
			let value = item.field.value,
				 name = item.field.name,
				 test = item.test;
			test.map((t) => {
				if (!this.rules[t].test(value)) {
					errors.push({
						field: name,
						message: this.rules[t].message
					});
				}
			});
		});

		if (errors.length === 0) return {error: false};
		else return {error: true, errors};
	}

	resetErrors (form) {
		$(form).find('.error').removeClass('error');
		$(form).find('.error-tooltip').remove();
	}

	showErrors (errors) {
		errors.map((item) => {
			let element = $(`[name="${item.field}"]`).parent();
			let parent = element.parent();

			if (parent.find('.error-tooltip').length > 0)
				parent.find('.error-tooltip').append(`<strong>${item.message}</strong>`);
			else
				parent.append(`<span class="error-tooltip"><strong>${item.message}</strong></span>`);

			element.addClass('error');
		});
	}
}

export { Validator as default }
