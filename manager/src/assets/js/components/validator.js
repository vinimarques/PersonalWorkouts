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
			number: {
				test: function (value) {
					return Number.isInteger(value);
				},
				message: 'Value isn\'t number'
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
			let obj = {
				field: {
					name: element.name,
					value: (element.dataset.type) ? this.convert(element.dataset.type, element.value) : element.value
				}
			};
			if (element.dataset.validate) obj.test = element.dataset.validate.split(',');
			data.push(obj);
		});

		return data;
	}

	getDataSend(form) {
		let data = {};
		$(form).find('input, select, textarea').each((index, element) => {
			if (element.value == '') return;

			if (element.dataset.type && element.dataset.type === 'array' && !data[element.name]) data[element.name] = [];

			if (element.dataset.type && element.dataset.type === 'array') {
				data[element.name].push(element.value);
			}
			else {
				data[element.name] = (element.dataset.type) ? this.convert(element.dataset.type, element.value) : element.value;
			}
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

			case 'text':
				val = value.replace(/\n/g, '<br>');
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

			if (!test) return;

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
