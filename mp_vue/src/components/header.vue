<template>
    <header class="header">
        <div v-if="user" class="user-info">
            <img :src="user.avatar"><br>
            <span>{{user.nickname}}</span>
        </div>
        <!-- <h1>todos</h1> -->
        <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @confirm="addTodo">
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data: function() {
            return {
                newTodo: ''
            }
        },
        methods: {
            addTodo() {
                if(!this.newTodo.trim()) return;

                this.$store.dispatch('add', this.newTodo)

                this.newTodo = ''
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
    };
</script>

<style scoped>
    .header h1 {
        top: -140rpx;
    }

    .new-todo {
        height: 2.2em;
    }

    .user-info {
        position: fixed;
        top: 50rpx;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }

    .user-info img {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
    }
</style>