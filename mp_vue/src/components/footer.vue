<template>
    <footer class="footer">
        <span class="todo-count">
            <strong> {{ left }} </strong> left
        </span>
    </footer>
</template>

<style>
.todo-count strong {
    display: inline-block;
}
</style>


<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        methods: {
            ...mapMutations(['changeFilter']),
            ...mapActions(['clearCompleted'])
        },
        computed: {
            ...mapGetters(['todos', 'left']),
        },
        mounted() {
            // window.addEventListener('hashchange', () => {
            //     this.changeFilter(location.hash.substr(2))
            // })
        }
    };
</script>