define([
    'jquery', 
    'underscore', 
    'backbone', 
    'common',
    'views/todoView',
    'tpl!templates/status.html'
], function($, _, Backbone, common, TodoView, statusTmpl) {
    return Backbone.View.extend({
        initialize: function() {
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');
            this.$todoList = this.$('#todo-list');

            var todos = this.collection;
            this.listenTo(todos, 'reset', this.addAll);
            this.listenTo(todos, 'filter', this.filterAll);
            this.listenTo(todos, 'all', _.debounce(this.render, 0));
            this.listenTo(todos, 'add', this.addOne);

            todos.fetch({reset: true});
        },
        el: '#todoapp',
        events: {
            'click #clear-completed':'clearCompleted',
            'click #toggle-all':'toggleAllComplete',
            'keypress #new-todo':'createOnEnter'
        },
        render: function() {
            var todos = this.collection,
                completed = todos.completed().length,
                remaining = todos.remaining().length;

            if(todos.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(statusTmpl({
                    completed: completed,
                    remaining: remaining
                }));

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (common.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            // 全选按钮的选择和取消选择
            this.allCheckbox.checked = !remaining;
        },
        addAll: function() {
            this.$todoList.empty();
            this.collection.each(this.addOne, this);
        },
        addOne: function(todo) {    
            this.$todoList.append(
                new TodoView({model: todo}).render().el
            );
        },
        filterAll: function() {
            this.collection.each(function(todo) {
                todo.trigger('visible');
            });
        },
        clearCompleted: function() {
            _.invoke(this.collection.completed(), 'destroy');
        },
        createOnEnter: function(e) {
            if(e.keyCode == common.ENTER_KEY && this.$input.val().trim()) {
                this.collection.create({
                    title: this.$input.val().trim(),
                    completed: false,
                    order: this.collection.nextOrder()
                });

                this.$input.val('');
            }
        },
        toggleAllComplete: function() {
            var checked = this.allCheckbox.checked;
            this.collection.each(function(todo) {
                todo.save({'completed': checked});
            });
        }
    });

});