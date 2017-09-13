'use strict';

import _ from 'lodash';
import config from '../config';

class Api {

	constructor () {
		this.apiPath = config.api.url;
		this.headers = {};
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
		switch (err) {
			case 401:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Usuário não encontrado. Tente novamente.', this.goToLogin);
				}, 250);
				break;

			case 403:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Você não possui autorização para essa funcionalidade.', this.goToLogin);
				}, 250);
				break;

			case 403:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Você não possui autorização para realizar essa operação.');
				}, 250);
				break;

			case 420:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error("Esta operação não é válida.");
				}, 250);
				break;

			case 421:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Usuário não encontrado. Tente novamente.', this.goToLogin);
				}, 250);
				break;

			case 422:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('É preciso inserir caracteres válidos para criação de uma meta. Tente novamente.');
				}, 250);
				break;

			case 423:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Acesso negado. Apenas é possível inserir acompanhamentos em metas quantitativas.');
				}, 250);
				break;

			case 424:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Acesso negado. Você não possui permissão para editar metas de faturamento.');
				}, 250);
				break;

			case 425:
				clearTimeout(window.timeErrorMsg);
				window.timeErrorMsg = setTimeout(() => {
					App.message.error('Esta operação não é válida.');
				}, 250);
				break;
            case 426:
                clearTimeout(window.timeErrorMsg);
                window.timeErrorMsg = setTimeout(() => {
                    App.message.error('Esta meta não possui colaboradores em todos os setores associados.');
                }, 250);
                break;
            case 427:
                clearTimeout(window.timeErrorMsg);
                window.timeErrorMsg = setTimeout(() => {
                    App.message.error('Esta meta já foi criada.');
                }, 250);
                break;
		}
		callback && callback(response);
	}
}

export { Api as default }
