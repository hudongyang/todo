import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
	plugins: [createLogger()],
	state: {
		todos: [{
			id: 0,
			title: '111',
			completed: true
		}]
	},
	mutations: {
		add(state, todo) {
			todo.id = state.todos.length
			state.todos.push(todo)
		},
		updateCompletes(state, completedIds) {
			state.todos.forEach(todo => {
				if(completedIds.includes(todo.id.toString())) {
					todo.completed = true
				} else {
					todo.completed = false
				}
			})
		},
		allDone(state, completed) {
			state.todos.forEach(todo => todo.completed = completed)
		},
		remove(state, removeTodo) {
			state.todos = state.todos.filter(todo => todo != removeTodo)
		}
	},
    getters: {
        todos(state) {
            return state.todos
        },
        left(state) {
            return state.todos.filter(todo => !todo.completed).length
        }
    },
})

export default store