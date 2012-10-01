(function () {
	"use strict";

	// A Data Model
	function Person(name) {
		this.name = ko.observable(name); // An observable property
	}

	// Item data model
	function TodoItem(description, person) {
		this.description = ko.observable(description);
		this.person = person;
		this.checked = ko.observable(false);
	}

	// The ViewModel
	function ViewModel() {
		var self = this;

		self.items = ko.observableArray([]);
		self.people = ko.observableArray([new Person("Mike")]);

		// computed
		self.checkedItems = ko.computed(function () {
			var i,
				checked = 0;

			for (i = 0; i < this.items().length; i += 1) {
				if (this.items()[i].checked()) {
					checked += 1;
				}
			}

			return checked;
		}, self);

		self.totalItems = ko.computed(function () {
			return this.items().length;
		}, self);

		// New item description
		self.newItemDescription = ko.observable("");
		self.chosenPerson = undefined;

		// New person
		self.newUserName = ko.observable('');

		self.currentState = ko.observable('TODO');

		// Events
		self.deleteItem = function (item) {
			self.items.remove(item);
		};

		self.addItem = function () {
			self.items.push(new TodoItem(self.newItemDescription(), self.chosenPerson));
			self.newItemDescription('');
		};

		// Person events
		self.deletePerson = function (person) {
			self.people.remove(person);
		};

		self.addNewUser = function () {
			self.people.push(new Person(self.newUserName()));
			self.newUserName('');
		};

		self.setState = function (state) {
			self.currentState(state);
		};

		self.items.push(new TodoItem("Plant a tree", self.people()[0]));
	}

	ko.applyBindings(new ViewModel());
}());