<template>
    <div>
        <section class="todoapp">
            <comp-head></comp-head>
            <comp-todos></comp-todos> 
            <comp-foot></comp-foot>
        </section>
    </div>
</template>

<script>
    import store from './store'
    import CompHead from '@/components/header'
    import CompTodos from '@/components/todos'
    import CompFoot from '@/components/footer'

    export default {
        store,
        components: {
            CompHead, 
            CompTodos,
            CompFoot
        },
        computed: {
            left() {
                return this.todos.filter(item => !item.completed).length;
            }
        },
        data: function() {
            return {
                todos: [],
                picked: ''
            }
        },
        events: {
            todos(todos) {
                this.todos = todos;
                return true;
            }
        },
        async mounted() {
            const user = await wx.BaaS.login()

            const User = new wx.BaaS.User()
            const resp = await User.get(user.id)
            this.$store.commit('user', resp.data)

            this.$store.dispatch('init')
        }
    };
</script>

<style src="todomvc-app-css/index.css"></style>