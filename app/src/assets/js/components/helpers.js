Template7.registerHelper('indexOf', function (id , arr) {
	if (!arr || !id) return '';
	if (arr.indexOf(id) !== -1) return 'checked="checked"';
	else return '';
});