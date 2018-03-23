<template>
    <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @confirm="addTodo">
    </header>
</template>

<script>
    export default {
        data: function() {
            return {
                newTodo: ''
            }
        },
        methods: {
            addTodo() {
                if(!this.newTodo.trim()) return;

                this.$store.commit('add', {
                    title: this.newTodo,
                    completed: false
                })

                this.newTodo = ''
            }
        }
    };
</script>

<style scoped>
    .header h1 {
        top: -150rpx;
    }

    .new-todo {
        height: 2.2em;
    }
</style>