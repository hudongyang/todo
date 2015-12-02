<template>
	<section class="main">
		<input class="toggle-all" type="checkbox" v-model="allDone">
		<ul class="todo-list" v-cloak>
			<li class="todo" v-for="(index, todo) in filterTodos" v-bind:class="{completed:todo.completed,editing: todo==editingTodo}">
				<div class="view">
					<input class="toggle" type="checkbox" v-model="todo.completed">
					<label v-on:dblclick="editTodo(todo)">{{ todo.title }}</label>
					<button class="destroy" v-on:click="destroy(todo)"></button>
				</div>
				<input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editingTodo" v-on:blur="doneEdit(todo)" v-on:keyup.enter="doneEdit(todo)" v-on:keyup.esc="cancelEdit(todo)">
			</li>
		</ul>
	</section>
</template>

<script>
	module.exports = {
		data() {
			return {
				todos: [],
				editingTodo: null,
				activeFilter: 'all',
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
			}
		},
		props: ['left'],
		methods: {
			destroy(todo) {
				this.todos.$remove(todo);
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
			allDone: {
				get() {
					return this.left === 0;
				},
				set(value) {
					this.todos.forEach(item => (item.completed = value));
				}
			},
			filterTodos() {
				let todos = this.todos.filter(this.filters[this.activeFilter]);
				return todos;
			}
		},
		directives: {
			'todo-focus'(value) {
				if(!value) {
					return;
				}

				var el = this.el;
				setTimeout(function() {
					el.focus();
				}, 0);
			}
		},
		events: {
			todos(todos) {
				this.todos = todos;
				return true;
			},
			activeFilter(activeFilter) {
				this.activeFilter = activeFilter;
				return true;
			}
		}
	};
</script>