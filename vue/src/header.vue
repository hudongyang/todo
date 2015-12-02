<template>
	<header class="header">
		<h1>todos</h1>
		<input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" v-on:keyup.enter="addTodo">
	</header>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				todos: [],
				newTodo: ''
			}
		},
		events: {
			todos(todos) {
				this.todos = todos;
				return true;
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
			}
		}
	};
</script>