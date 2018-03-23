import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const Todos = new wx.BaaS.TableObject(28680)

const store = new Vuex.Store({
	plugins: [createLogger()],
	state: {
		todos: [],
		user: null
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
		},
		user(state, user) {
			state.user = user
		},
		init(state, todos) {
			state.todos = todos
		}
	},
    getters: {
        todos(state) {
            return state.todos
        },
        left(state) {
            return state.todos.filter(todo => !todo.completed).length
		},
		user(state) {
			return state.user
		}
	},
	actions: {
		async add({commit}, title) {
			const todo = Todos.create()
			todo.set({
				title
			})
			
			let resp = await todo.save()

			commit('add', resp.data)
		},
		async init({commit, state}) {
			let query = new wx.BaaS.Query()
			query.compare('created_by', '=', state.user.id)
	
			let resp = await Todos.setQuery(query).find()
			
			commit('init', resp.data.objects)
		},
		async remove({commit}, delTodo) {
			await Todos.delete(delTodo.id)
			commit('remove', delTodo)
		}
	},
	
})

export default store