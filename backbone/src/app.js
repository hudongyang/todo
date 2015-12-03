let Backbone = require('backbone'),
	_ = require('underscore'),
    TodoView = require('./todoView');

module.exports = Backbone.View.extend({
    initialize() {
        this.footerTmpl = _.template($('#footer').html());
        this.listenTo(this.collection, 'reset', this.renderList, this);
        this.listenTo(this.collection, 'add', this.addOne, this);
        this.listenTo(this.collection, 'toggleAll', this.checkToggleAll, this);
        this.listenTo(this.collection, 'renderFooter', this.renderFooter, this);
        this.listenTo(this.collection, 'destroy', this.destroy, this);
        this.listenTo(this.collection, 'filter', this.filter, this);
    },
	el: '.todoapp',
	events: {
        'click .toggle-all': 'toggleAll',
        'keypress #new-todo': 'createOnEnter',
        'click .clear-completed': 'clearCompleted'
    },
	render() {
        this.renderFooter();

        this.collection.trigger('toggleAll');

		return this;
	},

    renderList(filter) {
        let todoListELe = $('.todo-list').empty(),
            fragment = document.createDocumentFragment();

        this.getFilters(filter).forEach(function(model) {
            let ele = new TodoView({
                model: model
            }).render().el;

            fragment.appendChild(ele);
        });

        todoListELe.html(fragment);
    },

    renderFooter() {
        this.$('.footer').remove();

        this.$el.append(
            this.footerTmpl({
                left: this.left().length,
                completed: this.completed().length
            })
        );
    },

    addOne(todo) {
        let ele = new TodoView({
            model: todo
        }).render().el;

        $('.todo-list').append(ele);
    },

    toggleAll(e) {
        let self = $(e.target),
            checked = self.prop('checked');

        this.collection.each(function(model) {
            model.save({
                'completed': checked
            });
        });

        this.collection.trigger('renderFooter');
    },

    left() {
        return this.collection.filter(model => !model.get('completed'));
    },

    completed() {
        return this.collection.filter(model => model.get('completed'));
    },

    checkToggleAll() {
        let length = this.collection.length,
            completedNo = this.completed().length;

        if(length == completedNo) {
            $('.toggle-all').prop('checked', true);
        } else {
            $('.toggle-all').prop('checked', false);
        }
    },

    getFilters(filter) {
        filter = filter || 'all';

        if(filter == 'completed') {
            return this.completed();
        } else if(filter == 'active') {
            return this.left();
        } else {
            return this.collection.toArray();
        }
    },

    filter(filter) {
        this.renderList(filter);

        this.$('.filters li a')
            .removeClass('selected')
            .filter('[href="#/' + filter + '"]')
            .addClass('selected');
    },

    destroy() {
        this.collection.trigger('toggleAll');
        this.collection.trigger('renderFooter');
    },

    createOnEnter(e) {
        if(e.keyCode == 13 && $(e.target).val().trim()) {
            this.collection.create({
                title: $(e.target).val().trim(),
                completed: false,
                orderNo: 1
            });

            $(e.target).val('');

            this.collection.trigger('renderFooter');
        }
    },

    clearCompleted() {
        this.completed().forEach(function(model) {
            model.destroy();
        });
    }
});