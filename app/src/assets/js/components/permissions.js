'use strict';

/**
 *
 */

class Permissions {
	constructor() {
		if (cordova && cordova.plugins && cordova.plugins.diagnostic) {

			cordova.plugins.diagnostic && cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status){
				if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
					console.log("Microphone use is authorized");
				}

				if (cordova.platformId === 'android') {
					cordova.plugins.diagnostic.requestRuntimePermission(function(status){
						console.log(status);
					}, function(error){
					console.error("The following error occurred: "+error);
					}, cordova.plugins.diagnostic.permission.WRITE_EXTERNAL_STORAGE);

					cordova.plugins.diagnostic.requestRuntimePermission(function(status){
						console.log(status);
					}, function(error){
					console.error("The following error occurred: "+error);
					}, cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE);
				}

			}, function(error){
				console.error(error);
			});


		}
	}
}

export { Permissions as default }
