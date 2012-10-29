# Javascript "new" keyword and closures

I'm sure you've heard about this keyword, is the most famous keyword in OO
languages, given a "template", create an object instance based on that template.

In Java for example, you create a class, and then using the _new_ keyword you 
instantiate the class, creating an object with all the definitions stated in 
your class.

But how does the "new" keyword works exactly when you have no classes? Well the
idea is it still uses a template, and it still generates a new instance based on
that template, but the template is not a class, is an *object*.

Before explaining what it does, it's mandatory to know about the prototype model
in Javascript. It's pretty easy, each object in javascript has an special 
attribute called _prototype_, when javascript seeks for a property in an object,
and can't find it, it then looks at that object's prototype, and tries to find
it, if it still cant, it looks at the prototype's prototype, and so on, this is
inheritance! And it's also used for creating objects.

In Javascript the *new* keyword is not used on classes, it's used on functions,
that function is called *constructor function*, now this sounds familiar right?

So what Javascript's *new* does is:
 * Create a new object, and set the private prototype attribute to the value of the
 constructor function's prototype attribute
 * Binds *this* (the keyword) to that new object 
 * Excecutes the constructor function (note that as *this* is now binded, it can be used to reference new object).

For example

```
function A() {
    this.name = "OBJECT A";
}

var a = new A();
```

Using Chrome's console, this outputs

```
> function A() { this.name = "OBJECT A"; }
< undefined
> var a = new A();
< undefined
> a
< A
name: "OBJECT A"
__proto__: A
```

__proto__ is the private prototype, note that when the constructor is excecuted 
using the new keyword, it returns an object.

```
> new A();
< A
name: "OBJECT A"
__proto__: A
```

But when you just call the constructor function without the _new_ keyword, it 
returns undefined (because the function has no return statement).

```
> A();
< undefined
```

Also, remember that all constructor functions *must start with a capital letter*
, that way you can tell it must be used with a _new_ keyword, otherwise, bad 
things tend to happen.

# Closures

There are many people who say that *the usage of __new__ must be avoided*, and 
we should use closures instead.

What are closures? Closures allow you to hide certain things from your object,
pretty much like a _private_ identifier, of more classic languages.

Consider the following:

```
var myObj = function () {
    var name = "John",
        methods;

    methods = {
        getName: function () {
            return name;
        }
    }

    return methods;
};
```

myObj is a function, that returns an object, but even if I "instantiate" myObj,
I cannot have access to _name_, its "private" (you need to understand scopes to
understand this! See a bit below for that). This is very good for organizing 
your code, and keep the namespace clean. The function "encloses" my return 
object (called *methods* in this case), this might be hard to understand at 
first, but once you get it, it's really useful.

To get instances, all you have to do is call the myObj function (note that it
starts with a lowercase letter!)

```
var person = myObj();
person.getName(); // John
person.name; // undefined
```

And that's it! There are a lot of related topics, like inheritance, and the 
*this* keyword, but for now I think this is enough. I hope it helped!

## NOTE: About scopes
Scopes in Javascript are very easy, in the example shown, the var _name_ and
_methods_ are scoped inside the myObj function, so anything from outside can't 
see them, that's why you always define the "vars" at the top of the function, so 
its very easy to see the scope of your variables.

```
function A () {
    var a, b;

    a = function () {
        // I can see a, and b
        var c;
    }

    // I can NOT see c
}
```

