const STORAGE_KEY = 'todos-vuejs';

exports.save = function(todos) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

exports.fetch = function() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};