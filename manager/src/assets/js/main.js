import config from './config';
import Routes from './routes';

//Applications
var Applications = {};

Applications.init = () => {
	console.log('initalize');

	Routes.init();

	// Api.login('vinicius.marques@nodo.cc','123').then(res => {
	// 	console.log(res);
	// });
};

Applications.init();
