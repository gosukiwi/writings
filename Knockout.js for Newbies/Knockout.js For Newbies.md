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
    * Read the input's value
    * Create a model object to represent the value
    * Add the model to the array
    * Clear the input's text

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