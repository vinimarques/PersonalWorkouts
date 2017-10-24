var helpers = {
	splitReps: function () {
		let repts = [];
		for (var item in arguments) {
			if (arguments[item] > 0) repts.push(arguments[item]);
		}
		return repts.join(' x ');
	}
};

export { helpers as default }
