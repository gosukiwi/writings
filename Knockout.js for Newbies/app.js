(function () {
    "use strict";

    // define a todo item constructor, it's a convention that whenever
    // we make an object designed to be used with the 'new' keyword
    // the name must start with a capital letter.
    var TodoItem = function (name) {
        this.name = name || ''; // the name of the item
        this.checked = false;   // is the item checked or not?
    },

        // array containing all the active todo items, initialized empty
        itemsArray = [],

        // let's add some starting items to our list
        item_1 = new TodoItem('Write a book'),
        item_2 = new TodoItem('Finish this tutorial'),

        // this function will draw our todo items
        drawItems,

        // event handler for the checkbox click event
        updateTodoItem,

        // event handler for the delete item link
        deleteTodoItem;

    // add them to our array
    itemsArray.push(item_1);
    itemsArray.push(item_2);

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

        // every time we add a new item, re-draw all the items
        drawItems();
    };

    updateTodoItem = function () {
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
    };

    drawItems = function () {
        var listContainer = document.getElementById('todo-container'),
            i,          // will be used in the for loop
            li,         // <li /> item
            text,       // text node, for the <li />
            checkbox,   // checkbox input
            link,       // delete link
            p,
            checkedItems;

        // clear all the items
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
        }

        // set the checkedItems variable to 0, this variable will hold the ammount of checked items in the array
        checkedItems = 0;

        // now add all the items 
        for (i = 0; i < itemsArray.length; i += 1) {
            // create a <li /> element
            li = document.createElement('li');
            // create text
            text = document.createTextNode(itemsArray[i].name);

            // create checkbox input
            checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.onclick = updateTodoItem;
            checkbox.id = i; // we will use the id attribute to store the index of the model

            if (itemsArray[i].checked) {
                checkbox.checked = 'checked';
                checkedItems += 1;
            }

            link = document.createElement('a');
            link.onclick = deleteTodoItem;
            link.id = i;
            link.href = '#';
            link.appendChild(document.createTextNode('x'));

            // add the checkbox
            li.appendChild(checkbox);

            // add text to the li
            li.appendChild(text);

            // add the link
            li.appendChild(link);

            // add li to the ul
            listContainer.appendChild(li);
        }

        // update the text of the status paragraph
        p = document.getElementById('status');
        p.removeChild(p.firstChild);
        p.appendChild(document.createTextNode(itemsArray.length + ' items in total, ' + checkedItems + ' checked.'));
    };

    // call the draw items function, drawing all the todo items in the array
    drawItems();
}());