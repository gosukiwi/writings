(function () {
	"use strict";

	var TodoItem,
		TodoListViewModel;

	// define a todo model "class"
	TodoItem = function (name) {
		this.name = ko.observable(name || '');
		this.checked = ko.observable(false);
	};

	// the view model coordinates the view and the model
	// the view can see this object
	TodoListViewModel = function () {
		var that = this;

		this.items = ko.observableArray([
			new TodoItem('Plant a tree'),
			new TodoItem('Finish this tutorial')
		]);

		this.removeItem = function(item) {
			that.items.remove(item);	
		};

		this.updateItem = function(item) {
			console.log(item.checked());
		};
	};

	ko.applyBindings(new TodoListViewModel());
}());