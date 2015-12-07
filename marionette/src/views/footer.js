define([
    'marionette',
    'underscore',
    'common',
    'tpl!templates/status.html'
], function(Mn, _, common, footerTpl) {
    return Mn.ItemView.extend({
        template: footerTpl,
        events: {
            'click #clear-completed':'clearCompleted',
        },
        onRender: function() {
            var filter = common.app.request('filter').get('name');
            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + (filter || '') + '"]')
                .addClass('selected');
        },
        clearCompleted: function() {
            _.invoke(common.todos.completed(), 'destroy');
        }
    });
});