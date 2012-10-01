# Knockout.js for beginners

Hello! In this tutorial I'll do my best to explain the basics of Knockout.js, the MVVM design pattern and why and when you should use it.

This tutorial is aimed at people with some experience in Javascript and optionally a library like jQuery or MooTools, but the latter it's not mandatory.

## What is Knockout.js

Knockout.js is a MVVM application framework for Javascript, basically it gives you a base for your application, and a nice API to ease you the development, this framework, unlike jQuery, implements a design pattern, a design pattern is just a way to see and solve problems, we'll use the MVVM design pattern.

Knockout does all the hard work for us, it implements the MVVM pattern, all we have to do is think in MVVM mode!

## What is MVVM

MVVM stands for Model-View-ViewModel and it's a quite old pattern, it was born at Microsoft, and it's based on MVC (Model-View-Controller, if you don't know what this means, don't worry!), it's a pattern focused on separation of presentation (View) and bussiness logic (Model or Data Model), then the ViewModel takes the Data Model and exposes it to the View. What's nice about all this is that the ViewModel *binds* our data with our presentation, so when the presentation changes, the data updates itself to match, this is also true for the other way around, if our data changes, the view will update accordingly (it's nice to note that it will just update the modified sections of the presentation, it won't redraw everything, so Knockout.js is not memory intensive).

It's a rather simple pattern which fits HTML & Javascript very nicely. We will use HTML as our View layer, and Javascript as Model Data and ModelView, because of this separation we can have complex presentation logic in the HTML without much hassle, this makes it easier to pick up the library.

## Your first Knockout.js app

Let's get down to bussiness! First of all, download Knockout.js, you can do so from the official page: http://knockoutjs.com/documentation/installation.html
The website also has a very good documentation, so if you get stuck with something, that's a good place to go!

Note that the Installation page will give you a link to the GitHub repository, https://github.com/SteveSanderson/knockout/downloads, just click a stable version, and you will be able to download the .js file, in this case we'll use knockout-2.1.0.js.

If you've never used a library before, you'll notice the file is minified, this means they used a minifier to make the file smaller, the minifier makes variable names smaller, remove all unnecessary white spaces and new lines, and so on, while this is awesome for making the file smaller, this makes the library impossible to understand, if you want to check out the code, you should download the debug build, it's the file that ends with ```.debug.js```.

Once you have downloaded the .js file, let's create a new HTML file and include our javascript there.

<pre><code>&lt;!DOCTYPE html&gt;<br/>&lt;html&gt;<br/>&lt;head&gt;<br/>	&lt;title&gt;Knockout APP&lt;/title&gt;<br/>&lt;/head&gt;<br/>&lt;body&gt;<br/>	&lt;!-- View Markup --&gt;<br/>	&lt;!-- End of View Markup --&gt;<br/><br/>	&lt;script type=&quot;text/javascript&quot; src=&quot;knockout-2.1.0.js&quot;&gt;&lt;/script&gt;<br/>	&lt;script type=&quot;text/javascript&quot; src=&quot;app.js&quot;&gt;&lt;/script&gt;<br/>&lt;/body&gt;<br/>&lt;/html&gt;</code></pre>

We are now ready to start coding! In this tutorial I'll use JSLint to make sure our code follows the good Javascript standards, this is of course optional but also recommended.

I've also included a file called ```app.js```, as the name implies, this file will contain our app, also note that the Javascript is included at the bottom of the page, this increases load performance, and also we can assume the html has been rendered and it's ready to be manipulated.

The file ```app.js``` contains a basic skeleton for our application, it's basically an anonymous function which gets called after it's created, and it's enclosed in parentheses, so we keep our global Javascript environment clean, we also enable the ```use strict``` functionality of Javascript, this enables some browsers to be more strict on our code, and throw more errors, for example, if a variable is not initialized, and the strict mode is on, it will throw an error, if strict mode were disabled, it would just create the variable on the first use, but this is a bad practice as it might lead to unexpected errors.

<pre><code>(function () {
	"use strict";
}());</code></pre>

Let's create a simple model and see how it binds with our view.

<pre><code>(function () {
	"use strict";

	// A Data Model
	function Person(name) {
		this.name = ko.observable(name); // An observable property
	}

	// The ViewModel
	function ViewModel() {
		var self = this,
			person = new Person("Mike");

		self.person = person;
	}

	ko.applyBindings(new ViewModel());
}());</code></pre>

The first thing we notice is we define a function constructor (a function that is designed to be used with the ```new``` keyword to create objects) named ```Person```, this constructor defines an object with an attribute ```name```, this attribute is the result of calling ```ko.observable(name)```, assuming name is a string defining the name of the person, this will return a ```function``` (```ko``` is the global obect for Knockout.js), and it will make ```name``` an observable property of every person instance, this means whenever the property is modified (either in the view or the model), the view or the model will be updated accordingly. Finally, we call the ```applyBindings``` method of the global ```ko``` object, this receives as parameter a ViewModel, and binds the current HTML file with our ViewModel, it's where magic happens!

All we have to do now is update our View (the HTML file).

<pre><code>&lt;!-- View Markup --&gt;<br/>	&lt;p&gt;Hello! My name is &lt;span data-bind=&quot;text: $root.person.name&quot;&gt;&lt;/span&gt;&lt;/p&gt;<br/>	&lt;!-- End of View Markup --&gt;</code></pre>

To bind an element with the ViewModel we have to specify a ```data-bind``` attribute, inside we need to define bindings, bindings are composed of a type, followed by a semi-colon, followed by a value, for example ```text: $root.person.name``` will bind the text of the current element to the value of $root.person.name, which is a string.
There are a lot of binding types, like visible, text, value, click, foreach, etc. To see all possible bindings you can check the documentation: http://knockoutjs.com/documentation/introduction.html.

But there isn't much magic there, we could have just typed that in the HTML, let me show you where the bindings shine, I'll make an input which automatically updates the name both in the model and the view, this is possible because the name is an observable property.

By adding just one line to the View, we can make the property editable.

<pre><code>&lt;!-- View Markup --&gt;<br/>&lt;p&gt;What's your name: &lt;input type=&quot;text&quot; placeholder=&quot;What's your name?&quot; data-bind=&quot;value: $root.person.name&quot; /&gt;&lt;/p&gt;<br/>&lt;p&gt;Hello! My name is &lt;span data-bind=&quot;text: $root.person.name&quot;&gt;&lt;/span&gt;&lt;/p&gt;<br/>&lt;!-- End of View Markup --&gt;</code></pre>

If you try it now, it will update the name whenever we change it. Pretty cool huh? Imagine how many things you can do! 

### A note about ko properties
All Knockout.js properties are accessed as methods, so to get the name of a person you do

<pre><code>var name = myPerson.name();</code></pre>

And to set the name, you do

<pre><code>myPerson.name('New Name');</code></pre>

This is very important and is the most common mistake of new developers, so if your app doesn't work, check your properties!

### A note about "self"
In Knockout.js we normally create a variable called ```self``` which stores the "global" value of ```this```, so if we were to create a method in the ViewModel, and we need to access an attribute of our ViewModel, we can do ```self.myAttribute```, because if we were to do ```this.myAttribute``` __this__ would make reference to the method's function object, and not the ViewModel object, this case is very common, so we always use ```self``` instead of ```this``` in the ViewModel.

## A More Complex Example

Let's now make a "real" example, a TODO list, it will manage a list of TODO items, and a list of People, each item will be associated with a person.

A good tip to help you get started with this app is to first create the final markup with static HTML.


<pre><code>&lt;!-- View Markup --&gt;<br/>&lt;div id=&quot;todo-list&quot;&gt;<br/>	&lt;h1&gt;TODO List&lt;/h1&gt;<br/><br/>	&lt;p&gt;<br/>		New Item: <br/>		&lt;input type=&quot;text&quot;&gt;<br/>		&lt;select name=&quot;&quot; id=&quot;&quot;&gt;<br/>			&lt;option value=&quot;&quot;&gt;Mike&lt;/option&gt;<br/>			&lt;option value=&quot;&quot;&gt;John&lt;/option&gt;<br/>		&lt;/select&gt;<br/>		&lt;input type=&quot;button&quot; value=&quot;Add&quot;&gt;<br/>	&lt;/p&gt;<br/><br/>	&lt;ul id=&quot;todo-list&quot;&gt;<br/>		&lt;li&gt;&lt;input type=&quot;checkbox&quot; /&gt; Mike: Plant a tree &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>		&lt;li&gt;&lt;input type=&quot;checkbox&quot; /&gt; John: Write a book &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>		&lt;li&gt;&lt;input type=&quot;checkbox&quot; /&gt; Mike: Learn guitar &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>		&lt;li&gt;&lt;input type=&quot;checkbox&quot; /&gt; Mike: Learn to cook &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>	&lt;/ul&gt;<br/><br/>	&lt;p&gt;0/4 items checked&lt;/p&gt;<br/>&lt;/div&gt;<br/><br/>&lt;div id=&quot;manage-users&quot;&gt;<br/>	&lt;h1&gt;Users&lt;/h1&gt;<br/><br/>	&lt;p&gt;<br/>		New User: <br/>		&lt;input type=&quot;text&quot;&gt;<br/>		&lt;input type=&quot;button&quot; value=&quot;Add&quot;&gt;<br/>	&lt;/p&gt;<br/><br/>	&lt;ul id=&quot;todo-list&quot;&gt;<br/>		&lt;li&gt;Mike &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>		&lt;li&gt;John &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>	&lt;/ul&gt;<br/>&lt;/div&gt;<br/>&lt;!-- End of View Markup --&gt;</code></pre>

As you can see we have a list of items, and a list of users, let's add some style to make it look a bit nicer

<pre><code>* {
	font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
}

ul#todo-list {
	margin: 0px;
	padding: 0px;
	font-size: 12px;
}

ul#todo-list li {
	dispaly: block;
	position: relative;
	list-style-type: none;
	background-color: #ddd;
	margin: 10px 0px;
	padding: 10px;
	border-radius: 5px;
}

ul#todo-list li:hover {
	background-color: #ccc;
}

ul#todo-list li a {
	position: absolute;
	right: 10px;
}</code></pre>

We can now start working on the Models, we'll need a TODO item model.

<pre><code>function TodoItem(description, person) {
	this.description = ko.observable(description);
	this.person = person;
	this.checked = ko.observable(false);
}</code></pre>

Let's now create the bindings for the view, first the TODO List

<pre><code>&lt;div id=&quot;todo-list&quot;&gt;<br/>		&lt;h1&gt;TODO List&lt;/h1&gt;<br/><br/>		&lt;p&gt;<br/>			New Item: <br/>			&lt;input type=&quot;text&quot; data-bind=&quot;value: newItemDescription&quot;&gt;<br/>			&lt;select name=&quot;&quot; id=&quot;&quot; data-bind=&quot;options: people, optionsText: 'name', value: chosenPerson&quot;&gt;<br/>			&lt;/select&gt;<br/>			&lt;input type=&quot;button&quot; data-bind=&quot;click: addItem&quot; value=&quot;Add&quot;&gt;<br/>		&lt;/p&gt;<br/><br/>		&lt;ul id=&quot;todo-list&quot; data-bind=&quot;foreach: items&quot;&gt;<br/>			&lt;li&gt;<br/>				&lt;input type=&quot;checkbox&quot; data-bind=&quot;checked: checked&quot; /&gt;<br/>				&lt;span data-bind=&quot;text: person.name&quot;&gt;&lt;/span&gt;: &lt;span data-bind=&quot;text: description&quot;&gt;&lt;/span&gt; <br/>				&lt;a href=&quot;#&quot; data-bind=&quot;click: $root.deleteItem&quot;&gt;x&lt;/a&gt;<br/>			&lt;/li&gt;<br/>		&lt;/ul&gt;<br/><br/>		&lt;p&gt;&lt;span data-bind=&quot;text: checkedItems&quot;&gt;&lt;/span&gt;/&lt;span data-bind=&quot;text: totalItems&quot;&gt;&lt;/span&gt; items checked&lt;/p&gt;<br/>	&lt;/div&gt;</code></pre>

First we bind the input with a field called ```newItemDescription``` using ```data-bind="value: newItemDescription"```, this variable will hold the value of the new item we want to add. The ```value``` binding is used to bind the value attribute of the given HTML element with the data specified next.

Note that ```newItemDescription``` doesn't exist yet, so we have to add it

<pre><code>self.newItemDescription = ko.observable("");</code></pre>

Next we bind the HTML ```select``` element using ```data-bind="options: people, optionsText: 'name', value: chosenPerson"```, this will make the select display options based on the ```people``` data source, which is an observable array, then we set ```optionsText``` to ```'name'```, so the name attribute of each item in ```people``` will be displayed as the option text, finally we store the selected value in the ```chosenPerson``` value.

We now need to create the people observable array, this is pretty easy too.

<pre><code>self.people = ko.observableArray([new Person("Mike")]);</code></pre>

An observable array is like a regular Javascript array, but as you might have guessed, it will track changes of each element of the array, and update the bindings as needed.

We will now bind the click action of the button to a method, using ```data-bind="click: addItem"``` we call the ```addItem``` method every time the button is clicked. The method definition is as follows

<pre><code>self.addItem = function () {
	self.items.push(new TodoItem(self.newItemDescription(), self.chosenPerson));
	self.newItemDescription('');
};</code></pre>

All we do is add a new TodoItem to the items observable array (which we have to create), and set the ```newItemDescription``` to an empty string, so the input element is cleared.

Let's now create the items observable array now.

<pre><code>self.items = ko.observableArray([]);</code></pre>

The add item part is now finished, let's move, on, we now need to work on the todo items list, all we need to do is display the items of the ```items``` observable array, we can do that using the ```foreach``` binding.

<pre><code>&lt;ul id=&quot;todo-list&quot; data-bind=&quot;foreach: items&quot;&gt;<br/>	&lt;li&gt;<br/>		&lt;input type=&quot;checkbox&quot; data-bind=&quot;checked: checked&quot; /&gt;<br/>		&lt;span data-bind=&quot;text: person.name&quot;&gt;&lt;/span&gt;: &lt;span data-bind=&quot;text: description&quot;&gt;&lt;/span&gt; <br/>		&lt;a href=&quot;#&quot; data-bind=&quot;click: $root.deleteItem&quot;&gt;x&lt;/a&gt;<br/>	&lt;/li&gt;<br/>&lt;/ul&gt;/</code></pre>

We use the foreach binding to repeat the code enclosed by the ```ul``` element for each item in ```items```, and inside this element, we are in a different scope, we can now refer to the item object as ```this```, so if we bind ```text: checked```, we will get the checked value of the current item, note that to access to a root property we need to do ```$root.myProperty```.

The ```checked``` binding adds the ```checked="checked"``` attribute to the element if the following condition is true, we use it to display whether the item is marked as checked or not, because the View and the Model are binded, if we change the checked attribute by clicking in the input element, it will update the model.

We then use the ```text``` binding to display the person's name, and the description of the TODO item, we finally bind the ```click``` event of the remove item link to a method (note that we call ```$root.deleteItem```) which will delete the current item.

Method calls like this automatically send the current item as parameter, making it very easy to manipulate the observable array. ```deleteItem``` is implemented as follows

<pre><code>self.deleteItem = function (item) {
	self.items.remove(item);
};</code></pre>

Finally we just display how many checked items, and how many total items we have.

<pre><code>&lt;p&gt;&lt;span data-bind=&quot;text: checkedItems&quot;&gt;&lt;/span&gt;/&lt;span data-bind=&quot;text: totalItems&quot;&gt;&lt;/span&gt; items checked&lt;/p&gt;</code></pre>

You already know the ```text``` binding, but let's see the properties they bind.

<pre><code>self.checkedItems = ko.computed(function () {
	var i,
		checked = 0;

	for (i = 0; i &lt; this.items().length; i += 1) {
		if (this.items()[i].checked()) {
			checked += 1;
		}
	}

	return checked;
}, self);

self.totalItems = ko.computed(function () {
	return this.items().length;
}, self);</code></pre>

We use computed properties, this means the property will be excecuted, and the result will be the propety value, for the ```checkedItems``` property we loop though all items, and add one to a counter if the item is checked, note that we pass ```self``` as a second parameter to the ```computed``` method, that value will be the value of ```this``` inside the function (note that as computed properties are still properties, they also have to be accessed as methods).

For total items all we have to do is return the length of the items property.

All we need to do now is manage the users, this is very similar to the TODO list, even easier!

<pre><code>&lt;h1&gt;Users&lt;/h1&gt;<br/><br/>&lt;p&gt;<br/>	New User: <br/>	&lt;input type=&quot;text&quot; data-bind=&quot;value: newUserName&quot;&gt;<br/>	&lt;input type=&quot;button&quot; value=&quot;Add&quot; data-bind=&quot;click: addNewUser&quot;&gt;<br/>&lt;/p&gt;<br/><br/>&lt;ul id=&quot;todo-list&quot; data-bind=&quot;foreach: people&quot;&gt;<br/>	&lt;li&gt;&lt;span data-bind=&quot;text: name&quot;&gt;&lt;/span&gt; &lt;a data-bind=&quot;click: $root.deletePerson&quot; href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>&lt;/ul&gt;</code></pre>

Note that we only use the ```text```, ```value``` and ```click``` bindings, and we use two methods and a property, ```deletePerson``` and ```addNewUser``` are the methods, and ```newUserName``` is the property.

<pre><code>self.newUserName = ko.observable('');

self.deletePerson = function (person) {
	self.people.remove(person);
};

self.addNewUser = function () {
	self.people.push(new Person(self.newUserName()));
	self.newUserName('');
};</code></pre>

If you try the app now, it should work, and you should be able to play around with users and TODO items. Here is the full code in case you missed something.

### View

<pre><code>&lt;!DOCTYPE html&gt;<br/>&lt;html&gt;<br/>&lt;head&gt;<br/>	&lt;title&gt;Knockout APP&lt;/title&gt;<br/>	&lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;<br/>&lt;/head&gt;<br/>&lt;body&gt;<br/>	&lt;!-- View Markup --&gt;<br/>	&lt;div id=&quot;todo-list&quot;&gt;<br/>		&lt;h1&gt;TODO List&lt;/h1&gt;<br/><br/>		&lt;p&gt;<br/>			New Item: <br/>			&lt;input type=&quot;text&quot; data-bind=&quot;value: newItemDescription&quot;&gt;<br/>			&lt;select name=&quot;&quot; id=&quot;&quot; data-bind=&quot;options: people, optionsText: 'name', value: chosenPerson&quot;&gt;<br/>			&lt;/select&gt;<br/>			&lt;input type=&quot;button&quot; data-bind=&quot;click: addItem&quot; value=&quot;Add&quot;&gt;<br/>		&lt;/p&gt;<br/><br/>		&lt;ul id=&quot;todo-list&quot; data-bind=&quot;foreach: items&quot;&gt;<br/>			&lt;li&gt;<br/>				&lt;input type=&quot;checkbox&quot; data-bind=&quot;checked: checked&quot; /&gt;<br/>				&lt;span data-bind=&quot;text: person.name&quot;&gt;&lt;/span&gt;: &lt;span data-bind=&quot;text: description&quot;&gt;&lt;/span&gt; <br/>				&lt;a href=&quot;#&quot; data-bind=&quot;click: $root.deleteItem&quot;&gt;x&lt;/a&gt;<br/>			&lt;/li&gt;<br/>		&lt;/ul&gt;<br/><br/>		&lt;p&gt;&lt;span data-bind=&quot;text: checkedItems&quot;&gt;&lt;/span&gt;/&lt;span data-bind=&quot;text: totalItems&quot;&gt;&lt;/span&gt; items checked&lt;/p&gt;<br/>	&lt;/div&gt;<br/><br/>	&lt;div id=&quot;manage-users&quot;&gt;<br/>		&lt;h1&gt;Users&lt;/h1&gt;<br/><br/>		&lt;p&gt;<br/>			New User: <br/>			&lt;input type=&quot;text&quot; data-bind=&quot;value: newUserName&quot;&gt;<br/>			&lt;input type=&quot;button&quot; value=&quot;Add&quot; data-bind=&quot;click: addNewUser&quot;&gt;<br/>		&lt;/p&gt;<br/><br/>		&lt;ul id=&quot;todo-list&quot; data-bind=&quot;foreach: people&quot;&gt;<br/>			&lt;li&gt;&lt;span data-bind=&quot;text: name&quot;&gt;&lt;/span&gt; &lt;a data-bind=&quot;click: $root.deletePerson&quot; href=&quot;#&quot;&gt;x&lt;/a&gt;&lt;/li&gt;<br/>		&lt;/ul&gt;<br/>	&lt;/div&gt;<br/>	&lt;!-- End of View Markup --&gt;<br/><br/>	&lt;script type=&quot;text/javascript&quot; src=&quot;knockout-2.1.0.js&quot;&gt;&lt;/script&gt;<br/>	&lt;script type=&quot;text/javascript&quot; src=&quot;app.js&quot;&gt;&lt;/script&gt;<br/>&lt;/body&gt;<br/>&lt;/html&gt;</code></pre>

### Models

<pre><code>(function () {<br/>	&quot;use strict&quot;;<br/><br/>	// A Data Model<br/>	function Person(name) {<br/>		this.name = ko.observable(name); // An observable property<br/>	}<br/><br/>	// Item data model<br/>	function TodoItem(description, person) {<br/>		this.description = ko.observable(description);<br/>		this.person = person;<br/>		this.checked = ko.observable(false);<br/>	}<br/><br/>	// The ViewModel<br/>	function ViewModel() {<br/>		var self = this;<br/><br/>		self.items = ko.observableArray([]);<br/>		self.people = ko.observableArray([new Person(&quot;Mike&quot;)]);<br/><br/>		// computed<br/>		self.checkedItems = ko.computed(function () {<br/>			var i,<br/>				checked = 0;<br/><br/>			for (i = 0; i &lt; this.items().length; i += 1) {<br/>				if (this.items()[i].checked()) {<br/>					checked += 1;<br/>				}<br/>			}<br/><br/>			return checked;<br/>		}, self);<br/><br/>		self.totalItems = ko.computed(function () {<br/>			return this.items().length;<br/>		}, self);<br/><br/>		// New item description<br/>		self.newItemDescription = ko.observable(&quot;&quot;);<br/>		self.chosenPerson = undefined;<br/><br/>		// New person<br/>		self.newUserName = ko.observable('');<br/><br/>		// Events<br/>		self.deleteItem = function (item) {<br/>			self.items.remove(item);<br/>		};<br/><br/>		self.addItem = function () {<br/>			self.items.push(new TodoItem(self.newItemDescription(), self.chosenPerson));<br/>			self.newItemDescription('');<br/>		};<br/><br/>		// Person events<br/>		self.deletePerson = function (person) {<br/>			self.people.remove(person);<br/>		};<br/><br/>		self.addNewUser = function () {<br/>			self.people.push(new Person(self.newUserName()));<br/>			self.newUserName('');<br/>		};<br/><br/>		self.items.push(new TodoItem(&quot;Plant a tree&quot;, self.people()[0]));<br/>	}<br/><br/>	ko.applyBindings(new ViewModel());<br/>}());</code></pre>

## Polishing our app

Let's now make our app a bit more organized, we should really separate the TODO List from the Users management, as you can see they are divided by divs, each div contains the view for each part, by adding one ViewModel property which toggles between states, we can toggle both divs.

<pre><code>self.currentState = ko.observable('TODO');</code></pre>

We then, add a ```visible``` binding to each div, and add a link to toggle between divs at the end.

<pre><code>&lt;div id=&quot;todo-list&quot; data-bind=&quot;visible: $root.currentState() === 'TODO'&quot;&gt;<br/>        &lt;h1&gt;TODO List&lt;/h1&gt;<br/><br/>	...<br/><br/>	&lt;p&gt;&lt;a href=&quot;#&quot; data-bind=&quot;click: setState.bind($data, 'USERS')&quot;&gt;Manage Users&lt;/a&gt;&lt;/p&gt;<br/>&lt;/div&gt;</code></pre>

And for the Users div

<pre><code>&lt;div id=&quot;manage-users&quot; data-bind=&quot;visible: $root.currentState() === 'USERS'&quot;&gt;<br/>	&lt;h1&gt;Users&lt;/h1&gt;<br/><br/>	...<br/><br/>	&lt;p&gt;&lt;a href=&quot;#&quot; data-bind=&quot;click: setState.bind($data, 'TODO')&quot;&gt;Manage TODO items&lt;/a&gt;&lt;/p&gt;<br/>&lt;/div&gt;</code></pre>

The ```visible``` binding makes the element visible if the condition specified is true, and it's not visible otherwise.
We also use another trick here, we call the ```bind``` method of ```setState```, ```setState``` is a function which updates the ```currentState``` ViewModel property, because we need to pass a parameter, we bind the ```$data``` parameter, followed by our custom parameter, the ```$data``` parameter is the default parameter sent to the function, if it's inside a foreach loop, for example, it will be the current item, in this case, it's the ViewModel object.

<pre><code>self.setState = function (state) {
	self.currentState(state);
};</code></pre>