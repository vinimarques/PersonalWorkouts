var Offline = {};

Offline.init = function () {
	document.addEventListener("offline", Offline.onOffline, false);
	document.addEventListener("online", Offline.onOnline, false);
}

Offline.onOffline = function () {
	$('body').addClass('-offline');
	Offline.isOff = true;
}

Offline.onOnline = function () {
	$('body').removeClass('-offline');
	Offline.isOff = false;
}

module.exports = Offline;
