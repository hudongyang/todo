<template>
    <section class="main">
        <checkbox-group @change="allChange">
            <input class="toggle_all" value="all" type="checkbox" :checked="left==0" />
        </checkbox-group>
        
        <ul class="todo-list">
            <checkbox-group @change="checkboxChange">
                <li class="todo" v-for="todo in filterTodos" :key="$index" :class="{completed:todo.completed}">
                    <div class="view">
                        <input type="checkbox" class="checkbox_btn" :value="todo.id" :checked="todo.completed" />
                        <label>{{ todo.title }}</label>
                        <!-- <button class="to-edit" @click="editTodo(todo)">编辑</button> -->
                        <button class="destroy" @click="destroy(todo)"></button>
                    </div>
                    <!-- <input class="edit" type="text" v-model="todo.title" v-on:blur="doneEdit(todo)" v-on:keyup.enter="doneEdit(todo)" v-on:keyup.esc="cancelEdit(todo)"> -->
                </li>
            </checkbox-group>
        </ul>
    </section>
</template>

<style scoped>
    .checkbox_btn {
        margin: auto 0;
        position: absolute;
        top: 0;
        bottom: 0;
        text-align: center;
        height: 50rpx;
        margin-left: 40rpx;
    }

    .toggle_all {
        position: absolute;
        top: -80rpx;
        left: 40rpx;
    }

    .destroy {
        display: block!important;
    }

    .to-edit {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 120rpx;
        font-size: 30rpx;
        width: 80rpx;
        height: 80rpx;
        margin: auto 0;
    }
</style>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
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
        methods: {
            destroy(todo) {
                this.$store.dispatch('remove', todo)
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
            },
            checkboxChange(e) {
                this.$store.commit('updateCompletes', e.target.value)
            },
            allChange(e) {
                this.$store.commit('allDone', !!e.target.value.length)
            }
        },
        computed: {
            ...mapGetters(['left', 'todos']),
            filterTodos() {
                let todos = this.todos.filter(this.filters[this.activeFilter]);
                return todos;
            }
        },
        created() {
            this.editingTodo = this.todos[0]
        }
    };
</script>