var Router = require('director').Router;

exports.init = function(vm) {
	var router = new Router();
	
	['all', 'active', 'completed'].forEach(function (filter) {
		router.on(filter, function () {
			vm.activeFilter = filter;
		});
	});

	router.configure({
		notfound: function () {
			window.location.hash = '';
			vm.activeFilter = 'all';
		}
	});

	router.init();
};