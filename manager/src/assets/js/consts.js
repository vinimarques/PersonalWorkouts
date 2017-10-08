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
					window.consts.TYPES = res.data.types;
					window.consts.DIFFICULTIES = res.data.difficulties;
				}
				callback && callback();
			});
	}
}
