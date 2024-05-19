
const unknown_topic = {
    name: "Unknown Topic",
    body: `
        <p>
        Either no topic was specified or it doesn't exist.
        </p>
    `
};

const topics = [

    {
        name: "Installation",
        id: "installation",
        body: `
<h>Requirements</h>
<p>
Gera requires the following to be installed:
<ul>
    <li>Curl</li>
    <li>The JVM (Java 17+)</li>
    <li>A C compiler</li>
    <li>Git</li>
</ul>
</p>

<h>UNIX-like</h>
<p>
To install Gera on a UNIX-like system, simply run the following command:
<cb>curl https://raw.githubusercontent.com/geralang/geraup/main/install.sh | sh</cb>
</p>

<h>Windows</h>
<p>
To install Gera on Windows, go to 
<a href="https://github.com/geralang/geraup" target="_blank">the Gera installer repository</a>
and download the latest release of the installer for Windows and run the executable 
as an administrator.
</p>
<p>
To then complete the setup simply create the <c>GERAP_CC_PATH</c> environment variable
and set it to the C compiler that you'd like to use with Gera.
</p>
        `
    },

    {
        name: "The Package Manager",
        id: "the-package-manager",
        body: `
<p>
The package manager is the main tool through which one uses Gera, and it's name is <c>gerap</c>.
</p>

<h>Packages</h>
<p>
A Gera package is simply a collection of Gera source code which can be included
by other packages. They can also be built and executed.
</p>
<p>
To create a new package called <c>test</c> in a directory of that name,
run
<cb>gerap new test</cb>
</p>
<p>
To set up the current direcory as a new Gera package, run
<cb>gerap init</cb>
</p>
<p>
Gera packages mainly consist of a <c>gerap.json</c> file and a <c>src</c>-directory.
The <c>gerap.json</c> holds cruicial information about your package and the 
<c>src</c>-directory contains all Gera source files that belong to this package.
</p>

<h>Building & Running</h>
<p>
A project can be built using
<cb>gerap build</cb>
or can be built and then directly executed using
<cb>gerap run</cb>
The output of a build is always located in the <c>.gerap</c>-directory.
</p>

<h>Documentation</h>
<p>
<cb>gerap info some::thing</cb>
can be used to directly find out more about <c>some::thing</c>.
This can be useful for when you quickly want to look at the documentation of
something without looking at the documentation. The command prints
all the information you need directly to the console. This works for the code
in your package and all the packages your package depends on.
</p>
<p>
<cb>gerap doc some::package</cb>
can be used to generate HTML documentation about the module <c>some::package</c>
and all of its submodules, which is also placed into <c>.gerap</c>.
</p>

<br>
<p>
For more information about <c>gerap</c>, its commands and and its 
environment variables you can visit the
<a href="https://github.com/geralang/gerap" target="_blank">Github repository for <c>gerap</c></a>.
</p>
        `
    },

    {
        name: "Syntax",
        id: "syntax",
        body: `
<p>
    The Gera language ignores all whitespaces, including line breaks.
    Comments start with <c>//</c> and go on to the end of that line.
</p>
<gcb>\
mod example

// this is the program entry point
proc main() {
    val x = 5 + 15
    std::io::println(x) // prints '20'
}
</gcb>
        `
    },

    {
        name: "Procedures",
        id: "procedures",
        body: `
<h>Basic Declaration</h>
<p>
To declare a procedure, use the following syntax:
<gcb>\
mod example

// names of procedures are usually in snake_case
proc greet() {
    std::io::println("Hello there!")
}
</gcb>
Procedures can also take parameters:
<gcb>\
mod example

// 'add' takes arguments 'x' and 'y'...
proc add(x, y) {
    std::io::println(x + y) // ...and prints their sum.
}
</gcb>
</p>

<h>Entry point</h>
<p>
The program starts off by executing one specific procedure. This procedure
is specified in the package <c>gerap.json</c>, and it's usually <c>some_module::main</c>.
</p>

<h>Calling</h>
<p>
Procedures can be called by writing the procedure and the parameter values in parentheses:
<gcb>\
mod example

proc add(x, y) {
    std::io::println(x + y)
}

// this is our entry point
proc main() {
    add(5, 10) // call the procedure declared above - which prints '15'
}
</gcb>
</p>

<h>Returning</h>
<p>
<c>return</c> can be used to immediately exit from a procedure and give back a value:
<gcb>\
mod example

proc multiply(x, y) {
    return x * y
}

// this is our entry point
proc main() {
    std::io::println(multiply(5, 3)) // the call to 'multiply' returns 15, which is then printed
}
</gcb>
</p>

<h>Expression Procedures</h>
<p>
A procedure can be declared to directly return a value. We can use this to
rewrite our <c>multiply</c>-procedure from above:
<gcb>\
proc multiply(x, y) {
    return x * y
}
</gcb>
and shorten it to:
<gcb>\
proc multiply(x, y) = x * y
</gcb>
</p>
        `
    },

    {
        name: "Variables",
        id: "variables",
        body: `
<h>Immutable Variables</h>
<p>
An immutable variable can be created using the <c>val</c>-keyword:
<gcb>\
mod example

proc main() {
    // variable names are usually in snake_case
    val a = 5
    val b = 10
    val c = a + b
    std::io::println(c) // prints '15'
}
</gcb>
</p>

<h>Mutable Variables</h>
<p>
A mutable variable behaves just like an immutable one, only that 
the mutable variable may have a new value assigned to it after it was created.
They can be created using the <c>mut</c>-keyword:
<gcb>\
mod example

proc main() {
    val a = 5
    mut b = 10
    std::io::println(a + b) // prints '15'
    b = 3
    std::io::println(a + b) // prints '8'
}
</gcb>
</p>

<h>Uninitialized Variables</h>
<p>
A variable may be created without a value. A value must be assigned afterwards
before the variable can be accessed. Variables created with <c>val</c> 
may still only be assigned to once.
<gcb>\
mod example

proc main() {
    val a
    mut b
    a = 5
    b = 4
    std::io::println(a + b) // prints '9'
    b = 9
    std::io::println(a + b) // prints '14'
}
</gcb>
</p>

<h>Global Variables</h>
<p>
A variable may be created globally by creating it outside of any procedure.
Note that it must be created using <c>val</c> and that it must have a value.
<gcb>\
mod example

// names of constants like this are usually in SCREAMING_CASE
val A = 25

proc main() {
    val b = 10
    std::io::println(A + b) // prints '35'
}
</gcb>
</p>
        `
    },

    {
        name: "Modules",
        id: "modules",
        body: `
        <p>
Modules simply are collections of procedures, variables and other modules.
Their structure is completely independent of the files they are in.
Writing <c>foo::bar</c> denotes some thing <c>bar</c> inside of the module <c>foo</c>.
</p>

<h>Declaration</h>
<p>
Modules may be declared using the <c>mod</c>-keyword, followed by the
full path of the module. Everything declared below it (up to the next module declaration)
then is contained inside of that module. The same module may not be declared twice.
<gcb>\
// module names are usually in snake_case
// 'math_stuff' is a module in the module 'cool_utilities'
mod cool_utilities::math_stuff

// 'add' is a procedure in the module 'cool_utilities::math_stuff'
proc add(x, y) = x + y


// 'other_stuff' is a module in the module 'cool_utilities'
mod cool_utilities::other_stuff

// 'log' is a procedure in the module 'cool_utilities::other_stuff'
proc log(thing) = std::io::println(thing)
</gcb>
</p>

<h>Public Module Contents</h>
<p>
To allow code from other modules to access a thing in a module, that thing
has to be made public using the <c>pub</c>-keyword.
<gcb>\
mod cool_utilities::math_stuff

// can be accessed from another module
pub val PI = 3.1415

// cannot be accessed from another module
proc multiply(x, y) = x * y

// can be accessed from another module
pub proc add(x, y) = x + y
</gcb> 
</p>

<h>Accessing Modules</h>
<p>
To access something from another module simply write out its full path.
For example, to access <c>println</c> from the module <c>std::io</c>,
simply write <c>std::io::println</c>.
<gcb>\
mod example

proc main() {
    std::io::println("Hello, world!")
}
</gcb> 
</p>

<h>Imports</h>
<p>
Because always writing down the full path of everything you access from other
modules would get fairly tiring fairly quickly, you can use the <c>use</c> keyword
to make your life easier. Simply write the thing you want to import behind <c>use</c>
and that thing will be available by simply writing its name without the need to write the module it's
in.
<gcb>\
mod example

use std::io::println
// the procedure 'std::io::println' is now available by simply writing 'println'

proc main() {
    println("Hello, world!") // same as calling 'std::io::println'
}
</gcb>
<gcb>\
mod example

use std::io
// the module 'std::io' is now available by simply writing 'io'

proc main() {
    io::println("Hello, world!") // same as calling 'std::io::println'
}
</gcb>
You can also write a list of things you want to include from a module in parentheses,
or you can use an asterisk to include everything from that module.
<gcb>\
mod example

use std::math::(PI, sin)
use std::io::*

proc main() {
    println(sin(PI)) // prints '0'
}
</gcb>
</p>

<h>Procedure Call Path Expansion</h>
<p>
In cases where you included two procedures with the same name from two different
modules and call one of the procedures, the types of the provided arguments
will be considered, and the last imported procedure that can be called with those
arguments will be chosen.
<gcb>\
mod foo
pub proc increment(x) = x + 1 // 'x' is an integer

mod bar
pub proc increment(x) = x + 1.0 // 'x' is a float

mod example
use std::io::println
use foo::increment
use bar::increment
proc main() {
    println(increment(1)) // calls 'foo::increment' since it takes an integer
    println(increment(3.0)) // calls 'bar::increment' since it takes a float
}
</gcb>
</p>
        `
    },

    {
        name: "Booleans",
        id: "booleans",
        body: `
<h>Values</h>
<p>
Booleans in Gera can either be <c>true</c> or <c>false</c>.
</p>

<h>Operations</h>
<p>
The following operations can be used with booleans:
<ul>
    <li>
        <c>!x</c> results in <c>true</c> if <c>x</c> is <c>false</c>
        and otherwise results in <c>false</c>.
    </li>
    <li>
        <c>a || b</c> results in <c>true</c> if either <c>a</c> or <c>b</c> is <c>true</c>
        and otherwise results in <c>false</c>.
        Note that the value of <c>b</c> will not be computed if <c>a</c> is <c>true</c>.
    </li>
    <li>
        <c>a && b</c> results in <c>true</c> if both <c>a</c> and <c>b</c> are <c>true</c>
        and otherwise results in <c>false</c>.
        Note that the value of <c>b</c> will not be computed if <c>a</c> is <c>false</c>.
    </li>
    <li>
        <c>a == b</c> results in <c>true</c> if <c>a</c> and <c>b</c> have the same value.
    </li>
    <li>
        <c>a != b</c> results in <c>true</c> if <c>a</c> and <c>b</c> have different values.
    </li>
</ul>
<gcb>\
mod example

// note: only works on Mondays
proc today_is_monday() {
    std::io::println("Warning: today is assumed to be Monday.")
    return true
} 

proc main() {
    val a = true
    val b = a || today_is_monday() // doesn't call 'today_is_monday'
    val c = a && !today_is_monday() // calls 'today_is_monday'
}
</gcb>
</p>
        `
    },

    {
        name: "Numbers",
        id: "numbers",
        body: `
<h>Integers</h>
<p>
Integers in Gera specifically are signed 64-bit integers, 
with the smallest possible value being -9223372036854775808
and the largest possible value being 9223372036854775807.
Simply write the value to create an integer value.
Integer arithmetic is defined to be wrap around on overflow.
<gcb>\
mod example

proc main() {
    val a = 5
    val b = 10
}
</gcb>
</p>

<h>Floats</h>
<p>
Floats in Gera specifically are double-precision 64-bit binary format (IEEE 754) floats.
To create a float value, write the number, making sure to include the decimal point.
Number literals without decimal points are interpreted as integers.
<gcb>\
mod example

proc main() {
    val a = 5.0
    val b = 3.14
    val c = 0.345
}
</gcb>
</p>

<h>Operations</h>
<p>
The following operations can be used with both types of numbers:
<ul>
    <li>
        <c>-x</c> negates <c>x</c> and results in the result.
    </li>
    <li>
        <c>a + b</c> results in the sum of <c>a</c> and <c>b</c>.
    </li>
    <li>
        <c>a - b</c> results in <c>b</c> subtracted from <c>a</c>.
    </li>
    <li>
        <c>a * b</c> results in the product of <c>a</c> and <c>b</c>.
    </li>
    <li>
        <c>a / b</c> results in <c>a</c> divided by <c>b</c>.
    </li>
    <li>
        <c>a % b</c> results in the remainder of <c>a</c> divided by <c>b</c>.
        Note that the result will have the same sign as <c>a</c>.
    </li>
    <li>
        <c>a < b</c> results in <c>true</c> if <c>a</c> is less than <c>b</c>
        and otherwise results in <c>false</c>.
    </li>
    <li>
        <c>a > b</c> results in <c>true</c> if <c>a</c> is greater than <c>b</c>
        and otherwise results in <c>false</c>.
    </li>
    <li>
        <c>a <= b</c> results in <c>true</c> if <c>a</c> is less than or equal to <c>b</c>
        and otherwise results in <c>false</c>.
    </li>
    <li>
        <c>a >= b</c> results in <c>true</c> if <c>a</c> is greater than or equal to <c>b</c>
        and otherwise results in <c>false</c>.
    </li>
    <li>
        <c>a == b</c> results in <c>true</c> if <c>a</c> and <c>b</c> have the same value.
    </li>
    <li>
        <c>a != b</c> results in <c>true</c> if <c>a</c> and <c>b</c> have different values.
    </li>
</ul>
<gcb>\
mod example

use std::io::println

proc main() {
    val a = 5
    val b = 3
    val c = a % b
    val d = c + 5
    println(d) // prints '7'
    println(d < a) // prints 'false'
}
</gcb>
</p>

<h>Conversions</h>
<p>
Numbers can be converted to integers and floats using the built-in <c>as_int</c>-
and <c>as_flt</c>-procedures. 
Note that <c>as_int</c> truncates floats, rounding them towards zero.
<gcb>\
mod example

proc main() {
    val pi = 3.1415
    println(as_int(pi)) // prints '3'
    println(as_flt(25) + 0.25) // prints '25.25'
}
</gcb>
</p>
        `
    },

    {
        name: "Piping",
        id: "piping",
        body: `
<p>
Consider the following program, which reads a line of input from the console,
parses it to a float, computes the square root and prints the result:
<gcb>\
mod example

use std::(io, math, opt, str)

proc main() {
    io::println(math::sqrt(opt::expect(
        str::parse_flt(io::inputln()), 
        "input is invalid!"
    )))
}
</gcb>
</p>
<p>
That is quite ugly. We could use variables to make it more readable, but luckily Gera 
has the perfect operator for a situation just like this, this being the pipe. 
<c>|></c> inserts the expression on the left of it as the first parameter
into the call on the right of it.
This means that writing <c>5 |> add(10)</c> is the same as writing <c>add(5, 10)</c>.
We can use this to make our code a lot more readable:
<gcb>\
mod example

use std::(io, str, opt, math)

proc main() {
    io::inputln()
        |> str::parse_flt()
        |> opt::expect("input is invalid!")
        |> math::sqrt()
        |> io::println()
}
</gcb>
</p>
<p>
The code now is a lot easier to read and understand. 
The values now flow from to procedure to procedure. 
As a final adjustment we can make the main procedure an expression: 
<gcb>\
mod example

use std::(io, str, opt, math)

proc main() = io::inputln()
    |> str::parse_flt()
    |> opt::expect("input is invalid!")
    |> math::sqrt()
    |> io::println()
</gcb>
</p>
        `
    },

    {
        name: "Strings",
        id: "strings",
        body: `
<p>
Strings in Gera are simply a completely immutable array of Unicode code points.
A string value can be created by putting the string's contents inbetween
double quotes:
<gcb>\
mod example

proc main() {
    std::io::println("Hello, world!")
}
</gcb>
</p>
<p>
String literals can go across multiple lines.
<p>
</p>
The backspace has a number of affects on the contents of a string:
<ul>
    <li>
        <c>\\</c> followed by a new line will not include the new line in the string.
    </li>
    <li>
        <c>\\0</c> results in the null character at that position in the string.
    </li>
    <li>
        <c>\\t</c> results in a horizontal tab at that position in the string.
    </li>
    <li>
        <c>\\n</c> results in a line feed at that position in the string.
    </li>
    <li>
        <c>\\r</c> results in a carriage feed at that position in the string.
    </li>
    <li>
        <c>\\xNN</c> results in the byte denoted by the two hexadecimal digits 
        <c>NN</c> at that position in the string.
    </li>
</ul>
</p>

<h>Length</h>
<p>
Get the length of a string in unicode code points by using the built-in
<c>length</c>-procedure:
<gcb>\
mod example

use std::io::println

proc main() {
    val greeting = "Hello, world!"
    println(length(greeting)) // prints '13'
}
</gcb>
</p>

<h>Substrings</h>
<p>
Create a new string from a part of another string using the built-in 
<c>substring</c>-procedure.
Note that negative indices will have the length of the source string added to them.
<gcb>\
mod example

use std::io::println

proc main() {
    val greeting = "Hello, world!"
    println(substring(greeting, 0, 4)) // prints 'Hell'
    println(substring(greeting, 7, -1)) // prints 'world'
}
</gcb>
</p>

<h>String Concatenation</h>
<p>
Join two strings together to create a new string by using the built-in 
<c>concat</c>-procedure.
<gcb>\
mod example

use std::io::println

proc greet(thing) = "Hello, "
    |> concat(thing)
    |> concat("!")

proc main() {
    println(greet("world")) // prints 'Hello, world!'
}
</gcb>
</p>

<h>Conversion to String</h>
<p>
Any value can be converted to a string by using the built-in <c>as_str</c>-procedure:
<gcb>\
mod example

use std::io::println

proc main() {
    val age = 23
    "You are "
        |> concat(as_str(age))
        |> concat(" years old.")
        |> println() // prints 'You are 23 years old.'
}
</gcb>
</p>
        `
    },

    {
        name: "Unit",
        id: "unit",
        body: `
<p>
The unit type in Gera is a type which only has a single value, this being <c>unit</c>.
This also means that there is no information associated with this type, since
it can only ever be one value. One could also consider <c>unit</c> to represent there
not being a value it all.
</p>

<h>Return Values</h>
<p>
The unit type can be useful for when you want to return nothing from a procedure.
In fact, when you don't return anything from a procedure at all,
the procedure is assumed to return <c>unit</c>. 
<gcb>\
mod example

proc main() {
    return unit
    std::io::println("noone will ever see this")
}
</gcb>
</p>

<h>Equality</h>
<p>
Note that since the unit type only has one value, using <c>==</c> on <c>unit</c>
always results in <c>true</c> and <c>!=</c> always results in <c>false</c>.
</p>
        
        `
    },

    {
        name: "Branching",
        id: "branching",
        body: `
<h>Conditional Branching</h>
<p>
Conditional branching is used to execute some part of your program only
if a certain condition is met. This can be achieved in Gera using <c>case</c>,
followed by the condition (which must evaluate to a boolean) and <c>-></c>:
<gcb>\
mod example

proc fib(n) {
    case n <= 1 -> return n
    return fib(n - 1) + fib(n - 2)
}
</gcb>
<c>else</c> can be used to execute a part of your program if the previous 
condition was not met:
<gcb>\
mod example

proc fizzbuzz(n) {
    case n % 3 == 0 && n % 5 == 0 -> return "FizzBuzz"
    else case n % 3 == 0 -> return "Fizz"
    else case n % 5 == 0 -> return "Buzz"
    else return as_str(n)
}
</gcb>
</p>

<h>Value-Based Branching</h>
<p>
<c>case</c> can also be used to execute one of multiple possible parts 
of your program based on a value. <c>else</c> then only gets executed if none
of the possible branches was executed.
<gcb>\
mod example

proc weekday(n) {
    case n {
        0 -> return "Monday"
        1 -> return "Tuesday"
        2 -> return "Wednesday"
        3 -> return "Thursday"
        4 -> return "Friday"
        5 -> return "Saturday"
        6 -> return "Sunday"
    } else return "[invalid input!]"
}
</gcb>
</p>
        `
    },

    {
        name: "Objects",
        id: "objects",
        body: `
<p>
Objects can be used to represent more complex data structures.
They can hold named members with a value for each member.
Objects are heap-allocated and referenced, meaning an object may have multiple
references to it and can be mutated and accessed from each of them.
</p>

<h>Object Literals</h>
<p>
Objects can be created by simply writing a list of name-value pairs inside of
curly braces. The expression results in a reference to the object.
<gcb>\
mod example

proc main() {
    // member names are ususally in snake_case
    val my_pet = { name = "Cookie", age = 5 }
}
</gcb>
Only writing the name of a member without a value makes the assumption that 
there is a variable with the same name, setting the member to that value.
<gcb>\
mod example

// returns a new object with the given values as members
proc create_cat(name, age) = { name, age }
</gcb>
</p>

<h>Accessing Objects</h>
<p>
To get or set a member of an object, simply use the <c>.name</c>-syntax:
<gcb>\
mod example

use std::io::println

proc main() {
    val my_pet = { name = "Cookie", age = 5 }
    println(my_pet.name) // prints 'Cookie'
    my_pet.name = "Snowball"
    println(my_pet.name) // prints 'Snowball'
}
</gcb>
</p>

<h>Equality</h>
<p>
When objects are compared with <c>==</c> and they have the same member types,
all of their members will be compared with <c>==</c> as well, even if the
references might refer to different objects. 
To check if two references refer to the exact same object (meaning modifying
the object behind one reference also modifies the object behind the other)
use the built-in <c>addr_eq</c>-procedure.
<gcb>\
mod example

use std::io::println

proc box(v) = { value = v }

proc main() {
    val a = box(5)
    val b = box(10)
    val c = box(5)
    val d = a
    println(a == b) // prints 'false'
    println(a == c) // prints 'true'
    println(a == d) // prints 'true'
    println(addr_eq(a, b)) // prints 'false'
    println(addr_eq(a, c)) // prints 'false'
    println(addr_eq(a, d)) // prints 'true'
}
</gcb>
</p>
        `
    },

    {
        name: "Arrays",
        id: "arrays",
        body: `
<p>
Arrays can be used to hold a dynamic number of values of the same type.
Although arrays may not be resized after they were created, 
they can be created with any length.
Just like objects arrays are heap-allocated and referenced, 
meaning an object may have multiple references to it and can be 
mutated and accessed from each of them.
</p>

<h>Array Literals</h>
<p>
To create an array with specific values for each element, you can simply
write the values as a list inside of square brackets:
<gcb>\
mod example

proc main() {
    val primes = [2, 3, 5, 7, 11]
}
</gcb>
To instead create an array by repeating a value a specific amount of times,
you can use the <c>[value; size]</c>-syntax:
<gcb>\
mod example

proc main() {
    val greetings = ["Hello!"; 16]
}
</gcb>
</p>

<h>Indexing into Arrays</h>
<p>
To get or set an element of an array at a specific position, write the position
(starting at 0) inside of square brackets:
<gcb>\
mod example

use std::io::println

proc main() {
    val primes = [2, 3, 5, 7, 11]
    println(primes[0]) // prints '2'
    println(primes[2]) // prints '5'
    println(primes[4]) // prints '11'
}
</gcb>
The index may also be negative, in which case the length of the array will
be added to it:
<gcb>\
mod example

use std::io::println

proc main() {
    val primes = [2, 3, 5, 7, 11]
    println(primes[-1]) // prints '11'
    println(primes[-2]) // prints '7'
    println(primes[-3]) // prints '5'
}
</gcb>
</p>

<h>Length</h>
<p>
Just like with strings, <c>length</c> may be used to get the length of an array:
<gcb>\
mod example

use std::io::println

proc main() {
    val primes = [2, 3, 5, 7, 11]
    println(length(primes)) // prints '5'
}
</gcb>
</p>

<h>Equality</h>
<p>
Just like with objects, <c>==</c> also compares all items (if the lengths match),
and <c>addr_eq</c> may be used to check if the references reference the same array.
</p>

        `
    },

    {
        name: "Unions",
        id: "unions",
        body: `
<p>
Unions in Gera are used to represent one of multiple different types.
Imagine them as enums, but every enum variant holds a single value,
and the types of the values may also differ.
</p>
<p>
Let's consider <a href="../docs/std/io.html#read_dir"><c>std::io::read_dir</c></a>,
which is a procedure that takes a path string and attempts to read the contents of the directory    
at that path. It's return type is <c>#ok [str] | #err str</c>, which means it's
a union of:
<ul>
    <li>the variant <c>ok</c>, having a value of type <c>[str]</c> (array of string)</li>
    <li>the variant <c>err</c>, having a value of type <c>str</c> (string)</li>
</ul>
Note that this means it will return one of the two, not both.
</p>

<h>Variant-Based Branching</h>
<p>
Just like <c>case</c> can be used to execute a specific branch based on some value,
it can also be used to execute a specific branch based on the variant of some union value.
For example, we can use it to handle both possible variants of the return value 
of <c>std::io::read_dir</c>:
<gcb>\
mod example

use std::io::println

proc main() {
    case std::io::read_dir("test") {
        #err error -> {
            "Unable to read directory: "
                |> concat(error)
                |> println()
        }
        #ok contents -> {
            "Directory has "
                |> concat(as_str(length(contents)))
                |> concat(" items")
                |> println()
        }
    }
}
</gcb>
Should a union be handled like this, it is enforced that it may only have
handled variants. In other words - unhandled union variants will always result
in an error. Adding an <c>else</c>-branch will handle all other union variants:
<gcb>\
mod example

// allows any union variant
// type of 'pet' would be 
// '(#cat { hunger = float, ... } | #dog { volume = float, ... } | ...)'
// ('...' means that the variant / object may have more members / variants)
proc feed(pet) {
    case pet {
        #cat c -> c.hunger = 0.0
        #dog d -> d.volume = 1.0 
    } else {
        // else nothing to do
    }
}
</gcb>
</p>

<h>Creating Union Values</h>
<p>
Unions can be created by simply instantiating variants using the 
<c>#name value</c> syntax. The union type is then the sum of all the possible
union variants.
<gcb>\
mod example

proc weekday(n) {
    case n {
        0 -> return #some "Monday"
        1 -> return #some "Tuesday"
        2 -> return #some "Wednesday"
        3 -> return #some "Thursday"
        4 -> return #some "Friday"
        5 -> return #some "Saturday"
        6 -> return #some "Sunday"
    } else return #none unit
}
</gcb>
In the above code, the procedure can either return the variant <c>some</c> with
a string value or the variant <c>none</c> with the unit value.
This means that the procedure returns the union <c>#some str | #none unit</c>.
</p>

<h>Variant Unwrap Operator</h>
<p>
The question mark operator can be used to make the assumption that
a union value has some specific variant. If it is not that variant,
the union value will be returned immediately. If it is that variant,
the expression results in the value of that variant.
For example, let's say we want to read a file, parse the contents
as a float, compute the square root and return it.
<gcb>\
mod example

proc file_sqrt(path) = path
    // return type: '#ok str | #err str'
    |> std::io::read_file()
    // return type: '#some str | #none unit' 
    |> std::res::get_ok() 
    // get the value or return early
    ?some 
    // return type: '#some float | #none unit'
    |> std::str::parse_flt() 
    // get the value or return early
    ?some
    |> std::math::sqrt()
</gcb>
</p>

<h>Equality</h>
<p>
Using <c>==</c> with union values will first check if they are the same variant
and if they are compare their values using <c>==</c>. To only check if the 
variants match you may use the built-in <c>tag_eq</c>-procedure.
<gcb>\
mod example

use std::io::println

proc main() {
    val a = #cat { name = "Snowball", hunger = 0.2 }
    val b = #cat { name = "Cookie", hunger = 0.6 }
    val c = #dog { name = "Rex", volume = 3.0 }
    val d = #cat { name = "Snowball", hunger = 0.2 }
    println(a == b) // prints 'false'
    println(a == c) // prints 'false'
    println(a == d) // prints 'true'
    println(tag_eq(a, b)) // prints 'true'
    println(tag_eq(a, c)) // prints 'false'
    println(tag_eq(a, d)) // prints 'true'
}
</gcb>
</p>
        `
    },

    {
        name: "Optionals",
        id: "optionals",
        body: `[todo]`
    },

    {
        name: "Results",
        id: "results",
        body: `[todo]`
    },

    {
        name: "Functions",
        id: "functions",
        body: `[todo]`
    },

    {
        name: "Iterators",
        id: "iterators",
        body: `[todo]`
    },

    {
        name: "The Core Module",
        id: "the-core-module",
        body: `[todo]`
    },

    {
        name: "Time of Evaluation",
        id: "time-of-evaluation",
        body: `[todo]`
    },

    {
        name: "Conditional Compilation",
        id: "conditional-compilation",
        body: `[todo]`
    },

    {
        name: "C and Javascript Interop",
        id: "c-and-javascript-interop",
        body: `[todo]`
    }

];