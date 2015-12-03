let Backbone = require('backbone'),
    _ = require('underscore');


module.exports = Backbone.View.extend({
    initialize() {
        this.listenTo(this.model, 'change', this.render, this);
        this.listenTo(this.model, 'destroy', this.onDestroy, this);
    },
    tagName: 'li',
    className: 'todo',
    template: _.template($('#todo').html()),
    events: {
        'click .toggle': 'toggleStatus',
        'click .destroy': 'remove',
        'dblclick label': 'toEdit',
        'blur .edit': 'save',
        'keypress .edit': 'saveOnEnter',
        'keyup .edit': 'cancel'
    },
    render() {
        this.$el.html(
            this.template(this.model.toJSON())
        );

        if(this.model.get('completed')) {
            this.$el.addClass('completed');
        } else {
            this.$el.removeClass('completed');
        }

        return this;
    },
    toggleStatus() {
        let completed = this.model.get('completed');
        this.model.save({
            'completed': !completed
        });
        this.model.trigger('toggleAll');
        this.model.trigger('renderFooter');
    },
    remove() {
        this.model.destroy();
    },
    onDestroy() {
        this.$el.remove();
    },
    toEdit(e) {
        this.$el.addClass('editing');
        let self = this;
        setTimeout(function() {
            self.$('.edit').focus();
        }, 100);
    },
    save(e) {
        let val = $(e.target).val().trim();
        this.$el.removeClass('editing');

        if(!val) {
            $(e.target).val(this.model.get('title'));
            return;
        }

        this.model.save({
            title: val
        });
    },
    saveOnEnter(e) {
        if(e.keyCode == 13) {
            this.save(e);
        }
    },
    cancel(e) {
        if(e.keyCode == 27) {
            this.$el.removeClass('editing');
            $(e.target).val(this.model.get('title'));            
        }
    }
});

