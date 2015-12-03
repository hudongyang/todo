define([
    'backbone',
    'common',
    'tpl!templates/todos.html'
], function(Backbone, common, todosTpl) {
    return Backbone.View.extend({
        initialize: function() {
            // 根据filter判断是否显示该条TODO
            this.listenTo(this.model, 'visible', this.toggleVisible);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },
        tagName: 'li',
        className: 'todo',
        events: {
            'click .toggle':'toggleCompleted',
            'click .destroy':'clear',
            'keypress .edit':'updateOnEnter',
            'blur .edit':'close',
            'keydown .edit':'revertOnEscape',
            'dblclick label':'edit'
        },
        render: function() {
            this.$el.html(
                todosTpl(this.model.toJSON())
            );

            this.model.trigger('visible');
            this.$el.toggleClass('completed', this.model.get('completed'));

            return this;
        },
        toggleVisible: function() {
            this.$el.toggleClass('hidden', this.isHidden());
        },
        isHidden: function () {
            var isCompleted = this.model.get('completed');
            return (// hidden cases only
                (!isCompleted && common.TodoFilter === 'completed') ||
                (isCompleted && common.TodoFilter === 'active')
            );
        },
        toggleCompleted: function() {
            this.model.toggle();
        },
        clear: function() {
            this.model.destroy();
        },
        edit: function() {
            this.$el.addClass('editing');
            this.$('.edit').focus();
        },
        updateOnEnter: function(e) {
            if(e.keyCode == common.ENTER_KEY) {
                this.close();
            }
        },
        close: function() {
            var $input = this.$('.edit'),
                val = $input.val().trim();

            this.$el.removeClass('editing');

            if(!val) {
                $input.val(this.model.get('title'));
                return;
            }

            this.model.save({
                title: val
            });
        },
        revertOnEscape: function(e) {
            if(e.keyCode == common.ESCAPE_KEY) {
                this.$el.removeClass('editing');
                $(e.target).val(this.model.get('title'));            
            }
        }
    });
});