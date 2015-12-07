define([
    'marionette',
    'controller/todos'
], function(Mn, TodosController) {
    return Mn.AppRouter.extend({
        appRoutes: {
            '*filter': 'filterItems'
        },
        controller: new TodosController()
    });
});