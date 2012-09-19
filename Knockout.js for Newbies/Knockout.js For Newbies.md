# Knockout.js for Newbies

Hello! In this tutorial I'll do my best to explain Knockout.js, how and why use it, but more important, programming design patterns, and we'll focus on MVVM.

## Why Bother?
Good question! Why bother using *and* learning an application framework and implementing the MVVM design pattern just for my application? Sometimes you don't need this, if your application is small, you can just use vanilla javascript! 

In this tutorial I'll make a TODO list application in plain Javascript, and then step by step, transform it into a Knockout.js application, so we can see the differences and advantages of each step.

I do think that a TODO List app is simple enough to do with just plain old Javascript, but it's also a simple enough app to demonstrate how to use a framework, and it's easy to understand.

# Starting our TODO App - Plain Javascript

Let's create a file, ```index.html```, this file will contain your app markup.

<pre name="code" class="html">&lt;!DOCTYPE html&gt;<br/>&lt;html&gt;<br/>    &lt;head&gt;<br/>        &lt;title&gt;TODO List app&lt;/title&gt;<br/>        &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;<br/>        &lt;script type=&quot;text/javascript&quot; src=&quot;app.js&quot;&gt;&lt;/script&gt;<br/>    &lt;/head&gt;<br/>    &lt;body&gt;<br/>        &lt;h1&gt;TODO List app&lt;/h1&gt;<br/>    &lt;/body&gt;<br/>&lt;/html&gt;</pre>

As you can see there, we'll need to create two more files, ```style.css``` and ```app.js```, the first will hold the styling for our app, and the latter it's the app's code.

Let's now create the markup for how our app should look once finished.

<pre name="code" class="html">&lt;!DOCTYPE html&gt;<br/>&lt;html&gt;<br/>    &lt;head&gt;<br/>        &lt;title&gt;TODO List app&lt;/title&gt;<br/>        &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;<br/>    &lt;/head&gt;<br/>    &lt;body&gt;<br/>        &lt;h1&gt;TODO List app&lt;/h1&gt;<br/><br/>        &lt;p&gt;&lt;input type=&quot;text&quot; id=&quot;new-item&quot; placeholder=&quot;What do you have to do?&quot; /&gt;<br/>        &lt;input type=&quot;button&quot; value=&quot;Add&quot; /&gt;&lt;/p&gt;<br/><br/>        &lt;ul&gt;<br/>            &lt;li&gt;<br/>                &lt;input type=&quot;checkbox&quot; checked=&quot;checked&quot; /&gt;<br/>                Item 1<br/>                &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;<br/>            &lt;/li&gt;<br/>            &lt;li&gt;<br/>                &lt;input type=&quot;checkbox&quot; /&gt;<br/>                Item 1<br/>                &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;<br/>            &lt;/li&gt;<br/>            &lt;li&gt;<br/>                &lt;input type=&quot;checkbox&quot; /&gt;<br/>                Item 1<br/>                &lt;a href=&quot;#&quot;&gt;x&lt;/a&gt;<br/>            &lt;/li&gt;<br/>        &lt;/ul&gt;<br/><br/>        &lt;p&gt;<br/>            3 items in total, 1 checked.<br/>        &lt;/p&gt;<br/><br/>        &lt;script type=&quot;text/javascript&quot; src=&quot;app.js&quot;&gt;&lt;/script&gt;<br/>    &lt;/body&gt;<br/>&lt;/html&gt;</pre>

If you open ```index.html``` with your favourite browser, you'll see a plain html page with a list, an input and a button.

![Screenshot 1](/res/1.jpg)

Let's add some styling, just to make it look prettier. Copy and paste this into ```style.css```

<pre name="code" class="css">body {<br/>    font-family: Helvetica, arial, sans-serif;<br/>    font-size: 12px;<br/>    margin: 0px;<br/>    padding: 10px;<br/>}<br/><br/>h1 {<br/>    margin: 0px;<br/>    padding: 0px;<br/>}<br/><br/>input[type=text] {<br/>    border-radius: 5px;<br/>    padding: 5px;<br/>    font-family: Helvetica, arial, sans-serif;<br/>    font-size: 12px;<br/>    border: 1px solid silver;<br/>}<br/><br/>ul {<br/>    border: 1px solid #999;<br/>    border-radius: 3px;<br/>    padding: 0px;<br/>    margin: 0px;<br/>}<br/><br/>ul li {<br/>    display: block;<br/>    padding: 5px;<br/>    background-color: #f9f9f9;<br/>    border-bottom: 1px solid #999;<br/>}<br/><br/>ul li:last-child {<br/>    border-bottom: none;<br/>}<br/><br/>ul li:hover {<br/>    background-color: #f1f1f1;<br/>}<br/><br/>ul li a {<br/>    color: #999;<br/>    font-weight: bold;<br/>    text-decoration: none;<br/>    margin-left: 10px;<br/>}<br/><br/>ul li a:hover {<br/>    text-decoration: underline;<br/>}</pre>

Your ```index.html``` file should now look like this

![Screenshot 1](/res/2.jpg)

If it's not, make sure the file exists, is named ```style.css``` and is in the same folder than ```index.html```.

Now, we'll start working on the code! Open up ```app.js``` and paste the following code.

<pre name="code" class="javascript">(function () {
    "use strict";
}());</pre>

In this lesson, I'll use http://jslint.com/ to validate all the Javascript code we write, it's just a matter of preference, you can also use http://www.jshint.com/ which is a less strict alternative.

In the code above, all I do is create an anonymous function, enclosed in parentheses, so we do nothing on the global scope of Javascript, we'll do everything inside our local scope (which is the anonymous function's scope). Also, I make an statement on the first line of the function, ```"use strict"```, this enables (if available) the strict mode on Javascript.

Quoting from [a StackOverflow answer](http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it): "Strict mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a "strict" operating context. This strict context prevents certain actions from being taken and throws more exceptions.", basically it helps us write good code, in this tutorial this is very important as at the end, we want to write very good maintainable Javascript code.

Let's continue with our code, we are going to need a data structure to hold the TODO items in memory, and we will also need a way to add items, and render them, for the data structure, let's just use an array of custom TODO objects.

<pre name="code" class="css">(function () {
    "use strict";

    // define a todo item constructor, it's a convention that whenever
    // we make an object designed to be used with the 'new' keyword
    // the name must start with a capital letter.
    var TodoItem = function () {
        this.name = '';         // the name of the item
        this.checked = false;   // is the item checked or not?
    },

        // array containing all the active todo items, initialized empty
        itemsArray = [],

        // let's add some starting items to our list
        item_1 = new TodoItem(),
        item_2 = new TodoItem();

    // add them to our array
    itemsArray.push(item_1);
    itemsArray.push(item_2);
}());</pre>

That works! We created our TodoItem "class", with two public attributes, we also created an array which will hold our instances of TodoItems, created two starting items, and added them to the collection. But if we want to change the name, it's pretty clumsy, we'll need to create a new item, then set the ```name``` property, let's make a constructor so we can set the name by parameter if we wish to do so.

<pre>// ... more code

var TodoItem = function (name) {
    this.name = name || ''; // the name of the item
    this.checked = false;   // is the item checked or not?
}

// ... more code</pre>

There we go, in the ```TodoItem``` constructor, we basically say "If the name parameter is undefined use an empty string, if not, use the name parameter".

Let's now allow the user to add an item, we will need to listen to the button's 'click' event, and then read the input's value, clear the input, create a todo item with the input's value as name, add the todo item to our collection, and clear the input's text.

The first thing we'll have to do is set an id to our button, so we can easily bind an event to it using Javascript, update your button markup so it looks like this

<pre>&lt;input type=&quot;button&quot; value=&quot;Add&quot; id=&quot;btn-add&quot; /&gt;</pre>

All I did was add an ```id``` attribute, with the value 'btn-add', it could be any value though, this is the one I chose.

Let's now bind the click event, there are several ways to do this, as we will use the MVVM pattern later on, we do a lot of logic in the view layer, so we will add the binding in the view (in this case, the html markup), don't worry if you don't understand any of this yet, you will know soon enough! For now, let's just bind the click event.

<pre>&lt;input type=&quot;button&quot; value=&quot;Add&quot; id=&quot;btn-add&quot; onclick=&quot;javascript:TODO_GLOBALS.addTodoItem()&quot; /&gt;&lt;/p&gt;</pre>

I again added an attribute, but this time the attribute is ```onclick```, this means, when the item is clicked, it will call the addTodoItem Javascript method of the TODO_GLOBALS object, of course, we have yet to define this method. 

Let's add a little script with global variables to handle our events in out javascript code, it's very important to avoid global variables as much as possible, but whenever you *have to* use them, wrap them in an object, so that object contains *all* your global values. This is because all Javascript apps share the same global space, and we want to minimize conflicts as much as possible.

<pre>&lt;script type=&quot;text/javascript&quot;&gt;<br/>    // Global variables for event handling<br/>    var TODO_GLOBALS = {};<br/><br/>    TODO_GLOBALS.addTodoItem;<br/>&lt;/script&gt;<br/>&lt;script type=&quot;text/javascript&quot; src=&quot;app.js&quot;&gt;&lt;/script&gt;</pre>

All good! Now we need to add the function definition at the end of our ```app.js``` file

<pre>
    // ... more code

    // define the addTodoItem function in the TODO_GLOBALS module
    TODO_GLOBALS.addTodoItem = function() {
        console.log('Click!');
    };
}());
</pre>

Great! If you try and run your HTML file now, and press the ```add``` button, it will write 'Click!' on the Javascript console, you can press F12 to open the development panel in most modern browsers, and then navigate to the console to see this message. In chrome, it looks like this.

![Screenshot 1](/res/3.jpg)

Okay, let's now make the button do something useful, the button shall

 *  Read the input's value
 *  Create a model object to represent the value
 *  Add the model to the array
 *  Clear the input's text

The code is pretty straight forward, and it's explained, we use ```document.getElementById``` to get the HTML element by it's id attribute, and be able to manipulate it.

<pre>
// define the addTodoItem function in the TODO_GLOBALS module
TODO_GLOBALS.addTodoItem = function () {
    // the input element
    var input = document.getElementById('new-item'),

        // let's get the value
        value = input.value,

        // this variable will hold the new TodoItem
        item;

    // check if the value is not empty, we don't want to add empty items!
    if (value === '') {
        return;
    }

    item = new TodoItem(value);
    itemsArray.push(item);
    input.value = '';
};
</pre>

If you click the button now, it will add a new item, of course, we can't see anything yet, let's draw our items.

<pre>drawItems = function () {<br/>    var listContainer = document.getElementById('todo-container'),<br/>        i,      // will be used in the for loop<br/>        li,     // &lt;li /&gt; item<br/>        text;   // text node, for the &lt;li /&gt;<br/><br/>    // clear all the items<br/>    while (listContainer.firstChild) {<br/>        listContainer.removeChild(listContainer.firstChild);<br/>    }<br/><br/>    // now add all the items <br/>    for (i = 0; i &lt; itemsArray.length; i += 1) {<br/>        // create a &lt;li /&gt; element<br/>        li = document.createElement('li');<br/>        // create text<br/>        text = document.createTextNode(itemsArray[i].name);<br/><br/>        // add text to the li<br/>        li.appendChild(text);<br/><br/>        // add li to the ul<br/>        listContainer.appendChild(li);<br/>    }<br/>};</pre>

That function does quite a lot of things, first, we select our ul HTML element, we then define our variables, it's a good practice to do it at the beginning of the function, then we clear all the nodes, and finally we draw them again, this is because we will always append items to the ul element, if we didnt clear the items, we would have repeated elements each time we call the draw function.

The peformance of this is quite bad, ideally we would want to draw things only once, and append what we need, but this method is easier for now, also if we remove an item, we just call the draw function and everything still works, if we just appended, we couldn't do this. We'll talk more about this later on.

Let's now call the ```drawItems``` function, we will call it twice, once on the ```onclick``` event handler, and another at the end of our script, so the first time the page loads, we draw our items too.

<pre>(function () {<br/>    &quot;use strict&quot;;<br/><br/>    // define a todo item constructor, it's a convention that whenever<br/>    // we make an object designed to be used with the 'new' keyword<br/>    // the name must start with a capital letter.<br/>    var TodoItem = function (name) {<br/>        this.name = name || ''; // the name of the item<br/>        this.checked = false;   // is the item checked or not?<br/>    },<br/><br/>        // array containing all the active todo items, initialized empty<br/>        itemsArray = [],<br/><br/>        // let's add some starting items to our list<br/>        item_1 = new TodoItem('Write a book'),<br/>        item_2 = new TodoItem('Finish this tutorial'),<br/><br/>        // this function will draw our todo items<br/>        drawItems;<br/><br/>    // add them to our array<br/>    itemsArray.push(item_1);<br/>    itemsArray.push(item_2);<br/><br/>    // define the addTodoItem function in the TODO_GLOBALS module<br/>    TODO_GLOBALS.addTodoItem = function () {<br/>        // the input element<br/>        var input = document.getElementById('new-item'),<br/><br/>            // let's get the value<br/>            value = input.value,<br/><br/>            // this variable will hold the new TodoItem<br/>            item;<br/><br/>        // check if the value is not empty, we don't want to add empty items!<br/>        if (value === '') {<br/>            return;<br/>        }<br/><br/>        item = new TodoItem(value);<br/>        itemsArray.push(item);<br/>        input.value = '';<br/><br/>        // every time we add a new item, re-draw all the items<br/>        drawItems();<br/>    };<br/><br/>    drawItems = function () {<br/>        var listContainer = document.getElementById('todo-container'),<br/>            i,      // will be used in the for loop<br/>            li,     // &lt;li /&gt; item<br/>            text;   // text node, for the &lt;li /&gt;<br/><br/>        // clear all the items<br/>        while (listContainer.firstChild) {<br/>            listContainer.removeChild(listContainer.firstChild);<br/>        }<br/><br/>        // now add all the items <br/>        for (i = 0; i &lt; itemsArray.length; i += 1) {<br/>            // create a &lt;li /&gt; element<br/>            li = document.createElement('li');<br/>            // create text<br/>            text = document.createTextNode(itemsArray[i].name);<br/><br/>            // add text to the li<br/>            li.appendChild(text);<br/><br/>            // add li to the ul<br/>            listContainer.appendChild(li);<br/>        }<br/>    };<br/><br/>    // call the draw items function, drawing all the todo items in the array<br/>    drawItems();<br/>}());</pre>

That's the whole ```app.js``` file so far, it does quite a lot! But we still have some more things to do to have a working TODO List app!
Let's update our draw method so it also draws the corresponding checkbox, so we can see the status of each TODO item.

<pre>// now add all the items <br/>for (i = 0; i &lt; itemsArray.length; i += 1) {<br/>    // create a &lt;li /&gt; element<br/>    li = document.createElement('li');<br/>    // create text<br/>    text = document.createTextNode(itemsArray[i].name);<br/><br/>    // create checkbox input<br/>    checkbox = document.createElement('input');<br/>    checkbox.type = 'checkbox';<br/>    checkbox.onclick = updateTodoItem;<br/>    checkbox.id = i; // we will use the id attribute to store the index of the model<br/><br/>    if(itemsArray[i].checked) {<br/>        checkbox.checked = 'checked';<br/>    }<br/><br/>    // add the checkbox<br/>    li.appendChild(checkbox);<br/><br/>    // add text to the li<br/>    li.appendChild(text);<br/><br/>    // add li to the ul<br/>    listContainer.appendChild(li);<br/>}</pre>

Note we created a new variable, checkbox, this will hold our checkbox input, we also add a onclick event handler, a function called updateTodoItem, but we are still missing something! The delete link, so we can delete the item, you can now see how long it's to add html from Javascript, we can use a library to make this easier (like jQuery), but still, not much change, and it continues to grow and grow.

<pre>drawItems = function () {<br/>    var listContainer = document.getElementById('todo-container'),<br/>        i,          // will be used in the for loop<br/>        li,         // &lt;li /&gt; item<br/>        text,       // text node, for the &lt;li /&gt;<br/>        checkbox,   // checkbox input<br/>        link;       // delete link<br/><br/>    // clear all the items<br/>    while (listContainer.firstChild) {<br/>        listContainer.removeChild(listContainer.firstChild);<br/>    }<br/><br/>    // now add all the items <br/>    for (i = 0; i &lt; itemsArray.length; i += 1) {<br/>        // create a &lt;li /&gt; element<br/>        li = document.createElement('li');<br/>        // create text<br/>        text = document.createTextNode(itemsArray[i].name);<br/><br/>        // create checkbox input<br/>        checkbox = document.createElement('input');<br/>        checkbox.type = 'checkbox';<br/>        checkbox.onclick = updateTodoItem;<br/>        checkbox.id = i; // we will use the id attribute to store the index of the model<br/><br/>        if(itemsArray[i].checked) {<br/>            checkbox.checked = 'checked';<br/>        }<br/><br/>        link = document.createElement('a');<br/>        link.onclick = deleteTodoItem;<br/>        link.id = i;<br/>        link.href = 'javascript:';<br/>        link.appendChild(document.createTextNode('x'));<br/><br/>        // add the checkbox<br/>        li.appendChild(checkbox);<br/><br/>        // add text to the li<br/>        li.appendChild(text);<br/><br/>        // add the link<br/>        li.appendChild(link);<br/><br/>        // add li to the ul<br/>        listContainer.appendChild(li);<br/>    }<br/>};</pre>

Wow! That's a long function! But we finally finished the draw function, all we have to do now, is create the delete and the update function, these are handler functions which will be called on the click event of the elements we specified in the drawItems function.

<pre>updateTodoItem = function () {
    var index = this.id;
    itemsArray[index].checked = this.checked;

    // draw the items
    drawItems();
};

deleteTodoItem = function () {
    var index = this.id;
    itemsArray.splice(index, 1);

    // draw the items
    drawItems();
};</pre>

Wow that was short! As the ```drawItems``` function is smart enough, we save a lot of work, all we do is just call that function, and forget about drawing, we just manage the internal data structure.

All we need to do now is display the status of the list at the bottom, that will be easy, just update the draw function, and add the following

<pre>for (i = 0; i &lt; itemsArray.length; i += 1) {<br/>    // ... code <br/><br/>    if (itemsArray[i].checked) {<br/>        checkbox.checked = 'checked';<br/>        checkedItems += 1; // added this line<br/>    }<br/><br/>    // ... code<br/>}<br/>// and added this<br/><br/>// update the text of the status paragraph<br/>p = document.getElementById('status');<br/>p.removeChild(p.firstChild);<br/>p.appendChild(document.createTextNode(itemsArray.length + ' items in total, ' + checkedItems + ' checked.'));</pre>

Note we get the element with id 'status', that doesn't exist yet! So let's update the HTML

<pre>&lt;p id=&quot;status&quot;&gt;3 items in total, 1 checked.&lt;/p&gt;</pre>

It was long, but we made it! A basic TODO app, here it's the full source code in case you missed it.

<pre>(function () {<br/>    &quot;use strict&quot;;<br/><br/>    // define a todo item constructor, it's a convention that whenever<br/>    // we make an object designed to be used with the 'new' keyword<br/>    // the name must start with a capital letter.<br/>    var TodoItem = function (name) {<br/>        this.name = name || ''; // the name of the item<br/>        this.checked = false;   // is the item checked or not?<br/>    },<br/><br/>        // array containing all the active todo items, initialized empty<br/>        itemsArray = [],<br/><br/>        // let's add some starting items to our list<br/>        item_1 = new TodoItem('Write a book'),<br/>        item_2 = new TodoItem('Finish this tutorial'),<br/><br/>        // this function will draw our todo items<br/>        drawItems,<br/><br/>        // event handler for the checkbox click event<br/>        updateTodoItem,<br/><br/>        // event handler for the delete item link<br/>        deleteTodoItem;<br/><br/>    // add them to our array<br/>    itemsArray.push(item_1);<br/>    itemsArray.push(item_2);<br/><br/>    // define the addTodoItem function in the TODO_GLOBALS module<br/>    TODO_GLOBALS.addTodoItem = function () {<br/>        // the input element<br/>        var input = document.getElementById('new-item'),<br/><br/>            // let's get the value<br/>            value = input.value,<br/><br/>            // this variable will hold the new TodoItem<br/>            item;<br/><br/>        // check if the value is not empty, we don't want to add empty items!<br/>        if (value === '') {<br/>            return;<br/>        }<br/><br/>        item = new TodoItem(value);<br/>        itemsArray.push(item);<br/>        input.value = '';<br/><br/>        // every time we add a new item, re-draw all the items<br/>        drawItems();<br/>    };<br/><br/>    updateTodoItem = function () {<br/>        var index = this.id;<br/>        itemsArray[index].checked = this.checked;<br/><br/>        // draw the items<br/>        drawItems();<br/>    };<br/><br/>    deleteTodoItem = function () {<br/>        var index = this.id;<br/>        itemsArray.splice(index, 1);<br/><br/>        // draw the items<br/>        drawItems();<br/>    };<br/><br/>    drawItems = function () {<br/>        var listContainer = document.getElementById('todo-container'),<br/>            i,          // will be used in the for loop<br/>            li,         // &lt;li /&gt; item<br/>            text,       // text node, for the &lt;li /&gt;<br/>            checkbox,   // checkbox input<br/>            link,       // delete link<br/>            p,<br/>            checkedItems;<br/><br/>        // clear all the items<br/>        while (listContainer.firstChild) {<br/>            listContainer.removeChild(listContainer.firstChild);<br/>        }<br/><br/>        // set the checkedItems variable to 0, this variable will hold the ammount of checked items in the array<br/>        checkedItems = 0;<br/><br/>        // now add all the items <br/>        for (i = 0; i &lt; itemsArray.length; i += 1) {<br/>            // create a &lt;li /&gt; element<br/>            li = document.createElement('li');<br/>            // create text<br/>            text = document.createTextNode(itemsArray[i].name);<br/><br/>            // create checkbox input<br/>            checkbox = document.createElement('input');<br/>            checkbox.type = 'checkbox';<br/>            checkbox.onclick = updateTodoItem;<br/>            checkbox.id = i; // we will use the id attribute to store the index of the model<br/><br/>            if (itemsArray[i].checked) {<br/>                checkbox.checked = 'checked';<br/>                checkedItems += 1;<br/>            }<br/><br/>            link = document.createElement('a');<br/>            link.onclick = deleteTodoItem;<br/>            link.id = i;<br/>            link.href = '#';<br/>            link.appendChild(document.createTextNode('x'));<br/><br/>            // add the checkbox<br/>            li.appendChild(checkbox);<br/><br/>            // add text to the li<br/>            li.appendChild(text);<br/><br/>            // add the link<br/>            li.appendChild(link);<br/><br/>            // add li to the ul<br/>            listContainer.appendChild(li);<br/>        }<br/><br/>        // update the text of the status paragraph<br/>        p = document.getElementById('status');<br/>        p.removeChild(p.firstChild);<br/>        p.appendChild(document.createTextNode(itemsArray.length + ' items in total, ' + checkedItems + ' checked.'));<br/>    };<br/><br/>    // call the draw items function, drawing all the todo items in the array<br/>    drawItems();<br/>}());</pre>

Let's now analyze some of the design problems of our code, first of all, the draw function is a bit inefficient, because we are redrawing the whole list each time, and also it's pretty long, it feels like it does too many things at once, if we were to modify this function a year from now, it would be hard. 

One good thing though, it's we have somehow separated our view logic from our bussiness logic, we do all the drawing in only one function, so we just focus on the internal data later on, for example, the update and delete methods just update the array, and ask for a redraw, if we could separate the logic in layers, we could make our app much more maintainable and easier to test.

# Software Design Patterns

> In software engineering, a design pattern is a general reusable solution to a commonly occurring problem within a given context in software design. A design pattern is not a finished design that can be transformed directly into code. It is a description or template for how to solve a problem that can be used in many different situations. Patterns are formalized best practices that the programmer must implement themselves in the application.

So basically, a design pattern is an approeach we use to solve a problem, when you know the approach, it's easier to remember how you solved the problem, or to see how others solved it, it's useful for maintaining code and work with other programmers.

In this tutorial we will use the MVVM pattern, which is one of the simplest because it has only two layers, the Model and the View, other common patterns are MVC and MVP. Let's talk more about MVVM.

> The Model View ViewModel (MVVM) is an architectural pattern used in software engineering that originated from Microsoft as a specialization of the presentation model design pattern introduced by Martin Fowler. Largely based on the model–view–controller pattern (MVC), MVVM is targeted at modern UI development platforms which support Event-driven programming, such as HTML5 [...].

The idea behind this is simple, we have two layers, the View layer, and the Model layer, the view layer is "everything related with what you can see", so in this case, is the HTML markup, and the model, is what defines the entities that our app handles, and the logic behind them. The only logic the View has is about how to display the model data.

## Implementing MVVM

Our implementation of MVVM will be quite simple, the HTML file will be our view, and the Javascript file will be our model.
The view will be able to communicate with the a model object, and every time the view changes, this model will be notified.
The model will be able to communicate with the view, and every time the model changes, the view will be updated to match.

Note that the view updates itself automatically, on the other hand, we have to work a bit more on the model, adding logic.

Let's create a simple example in pseudo-code.

*HTML File*

<pre>&lt;strong&gt;Name&lt;/strong&gt; &lt;span bind=&quot;name&quot;&gt;&lt;/span&gt;</pre>

In that view, we bind the *name* attribute of our model to a span item, so the span will display our attribute, if we were to change it sometime in our app excecution, this value will be updated automatically.

*Javascript File*

<pre>var model = {
    name: 'Mike'
};</pre>

The application should now display "Name: Mike".

# Rewriting our app with Knockout.js

Let's start by rewriting our Javascript, ```knockout-app.js``` will be the file name we'll use for the Knockout.js application

<pre>(function () {
    "use strict";
}());</pre>

Nothing new here, let's define our TodoItem class, it will be *very* similar to the one we had before.

<pre>// define a todo model "class"
TodoItem = function (name) {
    this.name = ko.observable(name || '');
    this.checked = ko.observable(false);
};</pre>

As you can see, the only real difference is that we wrap our attributes in a function, ko.observable function, ```ko``` is the namespace of Knockout.js, so we are calling the observable function of Knockout.js, what this does is track the attribute state, whenever the attribute change, the view will be notified, and also if the view displays this attribute, when the user modifies the view (for example, he sets the checked attribute to true by clicking in the checkbox), it will update the model.

This is a very simple way to bind attributes, it doesn't make you extend a custom model class, all you have to do, is create a special attribute in your old regular javascript object, and that's it!

We can then create items as usual

<pre>var item = new TodoItem('Write a book');</pre>

But there are some differences, we have to user a special getter and setter for the attribute now, it's nothing fancy though

<pre>var name = item.name(); //getter
item.name('Get healthier'); // setter</pre>

It's a very common mistake to forget this, so if something doesn't work, this might be the reason! Because if you try to access the property as an usual property, you will be returned a function, not the value itself!

Let's now create another constructor object, or class, as you might rather call it, an instance of this object will be binded to the view, so the view will have access to that object, and only that object.

<pre>TodoListViewModel = function () {
    var self = this;
};</pre>

It's a convention in Knockup.js to have a reference to the internal ```this``` variable, in a variable called ```self```, this can then be used to make reference to the TodoListViewModel from nested functions inside the object.

So far, so good, finally, let's start Knockout.js by actually bind the ```TodoListViewModel``` with the view.

<pre>ko.applyBindings(new TodoListViewModel());</pre>

You should have something like this by now

<pre>(function () {
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
    };

    ko.applyBindings(new TodoListViewModel());
}());</pre>

Let's now prepare our view for Knockout!

<pre>&lt;p&gt;&lt;input type=&quot;text&quot; data-bind=&quot;value: newTodoName&quot; placeholder=&quot;What do you have to do?&quot; /&gt;<br/>&lt;input type=&quot;button&quot; value=&quot;Add&quot; data-bind=&quot;click: addItem&quot; /&gt;&lt;/p&gt;</pre>

As you can see, we have removed the ```id``` attribute, and added a ```data-bind``` attribute, this attribute is composed of a binding, followed by a semi-colon, followed by the arguments of the binding, several bindings can be separated with a comma.

<pre>binding: params</pre>

For example

<pre>click: addItem</pre>

What's a binding? A binding is