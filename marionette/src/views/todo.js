define([
    'marionette',
    'common',
    'tpl!templates/todo.html'
], function(Mn, common, todoTpl) {
    return Mn.ItemView.extend({
        tagName: 'li',
        className: 'todo',
        template: todoTpl,
        ui: {
            'input': '.edit'
        },
        events: {
            'click .toggle': 'toggleCompleted',
            'dblclick label':'edit',
            'click .destroy':'clear',
            'blur .edit':'close',
            'keydown .edit':'revertOnEscape',
            'keypress .edit':'updateOnEnter'
        },
        modelEvents: {
            'change': 'render',
            'visible': 'toggleVisible'
        },
        onRender: function() {
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.model.trigger('visible');
        },
        toggleVisible: function() {
            this.$el.toggleClass('hidden', this.isHidden());
        },
        isHidden: function () {
            var isCompleted = this.model.get('completed'),
                filter = common.app.request('filter').get('name');
            return (// hidden cases only
                (!isCompleted && filter === 'completed') ||
                (isCompleted && filter === 'active')
            );
        },
        toggleCompleted: function() {
            this.model.toggle();
        },
        edit: function() {
            this.$el.addClass('editing');
            this.ui.input.focus();
        },
        clear: function() {
            this.model.destroy();
        },
        updateOnEnter: function(e) {
            if(e.keyCode == common.ENTER_KEY) {
                this.close();
            }
        },
        close: function() {
            var val = this.ui.input.val().trim();
            this.$el.removeClass('editing');

            if(!val) {
                this.ui.input.val(this.model.get('title'));
                return;
            }

            this.model.save({
                title: val
            });
        },
        revertOnEscape: function(e) {
            if(e.keyCode == common.ESCAPE_KEY) {
                this.$el.removeClass('editing');
                this.ui.input.val(this.model.get('title'));            
            }
        }
    });
});