var Vue = require('vue');
var App = require('./app.vue');
var store = require('./store');

vm = new Vue({
	el: 'body', 
	data: {
		todos: store.fetch()
	},
	components: {  
		app: App
	},
	ready: function() {
		this.$watch('todos', function(todos) {
			store.save(todos);
		}, {
			deep: true
		});

		this.$broadcast('todos', this.todos);
	},
	computed: {
		activeFilter: {
			get() {
				return 'all';
			},
			set(value) {
				this.$broadcast('activeFilter', value);
			}
		}
	},
	events: {
		resetTodos(todos) {
			this.todos = todos;
			this.$broadcast('todos', this.todos);
		}
	}
});

require('./router').init(vm);
