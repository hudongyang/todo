define([
    'marionette',
    'common',
    'tpl!templates/header.html'
], function(Mn, common, headerTpl) {
    return Mn.ItemView.extend({
        template: headerTpl,
        ui: {
            input: '#new-todo'
        },
        events: {
            'keypress @ui.input': 'createOnEnter'
        },
        createOnEnter: function(e) {
            if(e.which != common.ENTER_KEY) return;

            var title = this.ui.input.val().trim();
            if(!title) return;

            common.todos.create({
                title: this.ui.input.val().trim(),
                completed: false,
                order: common.todos.nextOrder()
            });

            this.ui.input.val('');
        }
    });
});