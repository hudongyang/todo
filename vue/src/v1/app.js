var Vue = require('vue');
var store = require('./store');

Vue.directive('todo-focus', function(value) {
	if(!value) {
		return;
	}

	var el = this.el;
	setTimeout(function() {
		el.focus();
	}, 0);
});

Vue.filter('filterTodos', function(todos) {
	return todos.filter(this.filters[this.activeFilter]);
});

var vm = new Vue({
	el: '.todoapp',
	data: {
		newTodo: '',
		todos: store.fetch(),
		activeFilter: 'all',
		editingTodo: null,
		beforeEditCache: '',
		filters: {
			all: function () {
				return true;
			},
			active: function (todo) {
				return !todo.completed;
			},
			completed: function (todo) {
				return todo.completed;
			}
		}
	},
	methods: { 
		addTodo() {
			if(!this.newTodo.trim()) return;
			this.todos.push({
				title: this.newTodo,
				completed: false
			});

			this.newTodo = '';
		},
		destroy(todo) {
			this.todos.$remove(todo);
		},
		clearCompleted() {
			this.todos = this.todos.filter(item => !item.completed);
		},
		editTodo(todo) {
			this.editingTodo = todo;
			this.beforeEditCache = todo.title;
		},
		doneEdit(todo) {
			if(!this.editingTodo) {
				return;
			}
			this.editingTodo = null;

			if(!todo.title.trim()) {
				this.todos.$remove();
			}
		},
		cancelEdit(todo) {
			this.editingTodo = null;
			todo.title = this.beforeEditCache;
		}
	},
	computed: {
		left() {
			return this.todos.filter(item => !item.completed).length;
		},
		allDone: {
			get() {
				return this.left === 0;
			},
			set(value) {
				this.todos.forEach(item => (item.completed = value));
			}
		}
	},
	ready() {
		this.$watch('todos', function(todos) {
			store.save(todos);
		}, {
			deep: true
		});
	}	
});

require('./router').init(vm);