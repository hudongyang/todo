<template>
	<footer class="footer">
		<span class="todo-count">
			<strong> {{ left }} </strong> left
		</span>
		<ul class="filters">
			<li><a href="#/all" v-bind:class="{selected: activeFilter == 'all'}">All</a></li>
			<li><a href="#/active" v-bind:class="{selected: activeFilter == 'active'}">Active</a></li>
			<li><a href="#/completed" v-bind:class="{selected: activeFilter == 'completed'}">Completed</a></li>
		</ul>
		<button class="clear-completed" v-show="todos.length > left" v-on:click="clearCompleted">
			Clear completed
		</button>
	</footer>
</template>

<script>
	module.exports = {
		methods: {
			clearCompleted() {
				let todos = this.todos.filter(item => !item.completed);
				this.$dispatch('resetTodos', todos);
			}
		},
		props: ['left'],
		data() {
			return {
				todos: [],
				activeFilter: 'all'
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