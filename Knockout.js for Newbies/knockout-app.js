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
		var self = this;

		self.newTodoName = ko.observable('');

		self.items = ko.observableArray([
			new TodoItem('Plant a tree'),
			new TodoItem('Finish this tutorial')
		]);

		self.removeItem = function (item) {
			self.items.remove(item);
		};

		self.updateItem = function (item) {
			item.checked(!item.checked());
			console.log(item.checked());
		};

		self.addItem = function () {
			self.items.push(new TodoItem(self.newTodoName()));
			self.newTodoName('');
		};

		// a computed property of this ViewModel, the number of checked items
		self.checkedItems = ko.computed(function () {
			var checked = 0,
				i;

			for (i = 0; i < self.items().length; i += 1) {
				if (self.items()[i].checked()) {
					checked += 1;
				}
			}

			return checked;
		}, self);
	};

	ko.applyBindings(new TodoListViewModel());
}());