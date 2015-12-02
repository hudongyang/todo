<template>
	<div>
		<section class="todoapp">
			<comp-head></comp-head>
			<comp-todos :left="left"></comp-todos>
			<comp-foot :left="left"></comp-foot>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="http://evanyou.me">Evan You</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
	</div>
</template>

<script>
	let [CompHead, CompFoot, CompTodos] = [
		require('./header.vue'),
		require('./footer.vue'),
		require('./todos.vue')
	];

	module.exports = {
		components: {
			CompHead, 
			CompFoot,
			CompTodos
		},
		computed: {
			left() {
				return this.todos.filter(item => !item.completed).length;
			}
		},
		data: function() {
			return {
				todos: []
			}
		},
		events: {
			todos(todos) {
				this.todos = todos;
				return true;
			}
		}
	};
</script>