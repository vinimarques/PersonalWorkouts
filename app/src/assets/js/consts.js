'use strict';

window.consts = {
	VIEW_MAIN: '.view-main',
	VIEW_DYNAMIC_NAVBAR: true
};

export default {
	init(callback) {
		App.api
			.getConsts()
			.then((res) => {
				window.consts.TYPES = res.data.types;
				callback && callback();
			});
	}
};
