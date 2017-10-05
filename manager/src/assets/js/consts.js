'use strict';

window.consts = {};

/**
 *
 */
export default {
	init(callback) {
		App.api
			.getConsts()
			.then((res) => {
				if (res.success) {
					window.consts.DIFFICULTIES = res.data.difficulties;
					window.consts.TYPES = res.data.types;
				}
				callback && callback();
			});
	}
}
