define([
    'marionette',
    'common',
    'views/todo',
    'views/footer',
    'tpl!templates/todos.html'
], function(Mn, common, TodoView, FooterView, TodosTpl) {
    return Mn.CompositeView.extend({
        template: TodosTpl,
        childView: TodoView,
        childViewContainer: '#todo-list',
        ui: {
            'todoList': '#todo-list',
            'allCheckbox': '#toggle-all'
        },
        events: {
            'click @ui.allCheckbox': 'toggleAllComplete'
        },
        collectionEvents: {
            'add destroy change:completed': 'updateFooter'
        },
        updateFooter: function(todo) {
            common.app.footer.show(new FooterView({
                model: new Backbone.Model({
                    remaining: common.todos.remaining().length,
                    completed: common.todos.completed().length
                })
            }));
        },
        toggleAllComplete: function() {
            var checked = this.ui.allCheckbox[0].checked;
            this.collection.each(function(todo) {
                todo.save({'completed': checked});
            });
        }
    });
});