
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
    println(sin(PI)) // prints a value very close to (if not) zero
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
The following operations can be used with both integers and floats 
(although they may not both be involved in the same operation):
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
Let's consider <a target="_blank" href="../docs/std/io.html#read_dir"><c>std::io::read_dir</c></a>,
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

use std::io::println

// allows any union variant
// type of 'pet' would be 
// '(#cat { hunger = float, ... } | #dog { volume = float, ... } | ...)'
// ('...' means that the variant / object may have more members / variants)
proc feed(pet) {
    case pet {
        #cat c -> c.hunger = 0.0
        #dog d -> d.volume = 1.0
        // you can also not specify a variable for the value to ignore it
        #dodo -> println("wtf how do you have that")
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
as a float, compute the square root and return it:
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
variants match (without checking the value) you may use the 
built-in <c>tag_eq</c>-procedure.
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

<h>Optional Values</h>
<p>
Just like demonstrated above, one can use a union to represent    
optional values.
By convention an optional value is simply of type <c>#some T | #none unit</c>
(where <c>T</c> is the actual type of the value).
The 
<a target="_blank" href="../docs/std/opt.html"><c>std::opt</c></a>-module 
provides general procedures for working with these.
</p>

<h>Result Values</h>
<p>
Result values are values that can either be an actual result value or an error value.
By convention a result value is simply of type <c>#ok V | #err E</c>
(where <c>V</c> is the actual value type and <c>E</c> the error type).
The 
<a target="_blank" href="../docs/std/res.html"><c>std::res</c></a>-module 
provides general procedures for working with these.
</p>
        `
    },

    {
        name: "Functions",
        id: "functions",
        body: `
<p>
Functions (or closures) are essentially procedures which are values. 
They also have access to variables declared outside of their own body.
</p>

<h>Creating Functions</h>
<p>
Functions can be created by writing a list of parameter names inbetween two
pipes, followed by either a block of statements in curly braces or an expression
to return:
<gcb>\
mod example

use std::io::println

proc main() {
    val greet = |thing| {
        case length(thing) == 0 -> return unit
        "Hello, "
            |> concat(thing)
            |> concat("!")
            |> println()
    }
    val add = |x, y| x + y
}
</gcb>
Using an arrow instead of the argument list creates a function with a
single argument called <c>it</c>:
<gcb>\
mod example

proc main() {
    val double = -> it * 2.0
}
</gcb>
One can also use any procedure as a function by simply writing it's name:
<gcb>\
mod example

proc double(x) = x * 2.0

proc main() {
    val d = double // 'd' is now a function that executes 'double'
}
</gcb>
</p>

<h>Calling Functions</h>
<p>
Functions can be called just like procedures:
<gcb>\
mod example

use std::io::println

proc main() {
    val greet = |thing| {
        case length(thing) == 0 -> return unit
        "Hello, "
            |> concat(thing)
            |> concat("!")
            |> println()
    }
    greet("world") // prints 'Hello, world!'
    greet("Gera") // prints 'Hello, Gera!'
    val add = |x, y| x + y
    println(add(5, 10)) // prints '15'
    println(add(3, 5)) // prints '8'
}
</gcb>
<gcb>\
mod example

use std::io::println

proc main() {
    mut x = 0
    val add = |y| x + y
    println(add(5)) // prints '5'
    x = 25
    println(add(3)) // prints '28'
}
</gcb>
<gcb>\
mod example

use std::io::println

proc main() {
    mut i = 0
    val next = || {
        val n = i
        i = i + 1
        return n
    }
    println(next()) // prints '0'
    println(next()) // prints '1'
    println(next()) // prints '2'
    println(next()) // prints '3'
}
</gcb>
</p>

<h>Methods</h>
<p>
Methods are simply functions that are values of members of an object,
and which take an object as the first parameter (this being the object they
are called as a method of).
A method can be called using the method pipe operator <c>.&gt;</c>,
with which <c>x .&gt; some_method(y)</c> expands to <c>x.some_method(x, y)</c>:
<gcb>\
mod example

use std::io::println

proc create_cat(name, age) = {
    name, age,
    hunger = 0.0,

    // by convention functions which are supposed to act as methods
    // take 'self' as the first parameter
    feed = |self, amount| {
        self.hunger = self.hunger - amount
    }
}

proc main() {
    val my_cat = create_cat("Cookie", 2)
    my_cat.hunger = 0.6
    println(my_cat.hunger) // prints '0.6'
    my_cat .> feed(0.4)
    println(my_cat.hunger) // prints '0.2'
}
</gcb>
</p>

<h>Procedures VS. Functions</h>
<p>
There is one big difference between functions and procedures.
Consider the following procedure:
<gcb>\
mod example

proc add(x, y) = x + y

proc main() {
    add(5, 10)
    add(3.2, 4.35)
}
</gcb>
In the above code <c>add</c> is called both with integers and floats.
This is completely valid. However, the following is not:
<gcb>\
mod example

proc main() {
    val add = |x, y| x + y
    add(5, 10)     // this is fine
    add(3.2, 4.35) // this doesn't work!
}
</gcb>
Why doesn't this work? Well, it's quite simple. When the function for <c>add</c>
is created, it starts off with being a function that takes two numeric values 
and adds them. However, after the first call (which passes integers),
the function has now become a function that takes two integers and adds them.
When we now attempt to pass two floats, a type error occurs, since the
function already takes integers. In this case, you could create
two separate functions:
<gcb>\
mod example

proc add() = |x, y| x + y

proc main() {
    add()(5, 10)
    add()(3.2, 4.35)
}
</gcb>
</p>
        `
    },

    {
        name: "Iterators",
        id: "iterators",
        body: `
<p>
Iterators in Gera simply are functions which return the next element in a
sequence. Specifically they are functions which have a return type of 
<c>#next T | #end unit</c> (where <c>T</c> is the type of the sequence values).
</p>

<p>
For example, one could write a simple infinite iterator over the Fibonacci sequence:
<gcb>\
mod example

proc fib() {
    mut a = 0
    mut b = 1
    // return the iterator (the function that returns the next element)
    return || {
        // classic Fibonacci shenanigans
        val c = a + b
        a = b
        b = c
        // return the next element
        return #next c
    }
}
</gcb>
</p>

<p>
Or how about a procedure that takes an iterator and returns a new iterator
over the items in the given iterator, only that each of them is passed through
a given function?
<gcb>\
// there is no real need for us to write this ourselves,
// it's already in 'std::iter'
proc map(src, f) = || {
    case f() {
        #next v -> return #next f(v)
        #end -> return #end unit
    }
}
</gcb>
</p>

<p>
You can easily create iterators over integer ranges by using <c>start..end</c>
(excludes end) and <c>start..=end</c> (includes end).
</p>

<p>
Using the procedures provided by the module 
<a target="_blank" href="../docs/std/iter.html"><c>std::iter</c></a>,
you can achieve anything a loop could:
<gcb>\
use std::iter::find
use std::opt::is_none

proc is_prime(n) = 2..(n / 2)
    |> find(-> n % it == 0)
    |> is_none()
</gcb>
<gcb>\
use std::math::min
use std::iter::find
use std::str::(at, codepoint_at)
use std::opt::(map, unwrap_or_else)

proc strcmp(a, b) = 0..min(length(a), length(b))
    |> find(|i| at(a, i) != at(b, i))
    |> map(|i| codepoint_at(a, i) - codepoint_at(b, i))
    |> unwrap_or_else(|| length(a) - length(b))
</gcb>
</p>

        `
    },

    {
        name: "The Core Module",
        id: "the-core-module",
        body: `
<p>
The <c>core</c>-module is a very special module containing built-in procedures.
Everything from this module is imported by default, as if you did 
<c>use core::*</c> at the top of every file.
</p>

<h>addr_eq</h>
<p>
Either takes two objects or two arrays
and returns <c>true</c> if modifying the object or array behind one of 
the references will also modify the object or array behind the other.
In other words it doesn't check if the referenced objects or arrays are equal, 
but rather if they refer to the exact same object or array.
<gcb>\
mod example

use std::io::println

proc main() {
    val a = { value = 5 }
    val b = { value = 10 }
    val c = { value = 5 }
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

<h>as_flt</h>
<p>
Returns the given integer or float as a float.
<gcb>\
mod example

proc any_sqrt(x) = x
    |> as_flt()
    |> std::math::sqrt()

proc main() {
    std::io::println(any_sqrt(25)) // prints '5.0'
    std::io::println(any_sqrt(16)) // prints '4.0'
    std::io::println(any_sqrt(4.0)) // prints '2.0'
}
</gcb>
</p>

<h>as_int</h>
<p>
Returns the given integer or float as an integer.
Floats are truncated (rounded towards zero).
<gcb>\
mod example

proc int_div(a, b) = as_flt(as_int(a) / as_int(b))

proc main() {
    std::io::println(int_div(4.1, 2.5)) // prints '2.0'
    std::io::println(int_div(9.4, 3.2)) // prints '3.0'
    std::io::println(int_div(4.2, 4.6)) // prints '1.0'
}
</gcb>
</p>

<h>as_str</h>
<p>
Returns the given value as a string.
<gcb>\
mod example

proc greet(thing) = "Hello, _!"
    |> std::str::fmt([ as_str(thing) ]) // replaces '_'s with contents of array
    |> std::io::println()

proc main() {
    greet("world") // prints 'Hello, world!'
    greet({ name = "Cookie" }) // prints 'Hello, &lt;object&gt;!'
    greet(std::math::PI) // prints 'Hello, 3.141593!'
}
</gcb>
</p>

<h>concat</h>
<p>
Returns a new string by appending the second string to the end of the first.
<gcb>\
mod example

proc main() {
    val a = "Hello, "
    val b = "world!"
    val c = "Gera!"
    std::io::println(concat(a, b)) // prints 'Hello, world!'
    std::io::println(concat(a, c)) // prints 'Hello, Gera!'
}
</gcb>
</p>

<h>exhaust</h>
<p>
Gets and discards the next elements from the given iterator until the iterator
reaches the end. This is the backbone of the entire iterator API.
<gcb>\
mod example

use std::iter::map
use std::io::println

// this is exactly how 'std::iter::for_each' works
proc for_each(iter, f) = iter
    // create a new iterator with the values of the old mapped using a function
    |> map(f)
    // doesn't matter what type of value 'f' returns, even if it's unit,
    // since it's discarded by 'exhaust'
    |> exhaust()

proc main() {
    0..10 |> for_each(println)
}
</gcb>
</p>

<h>hash</h>
<p>
Returns a 64-bit hash of the given value. Note that hash objects, arrays and
closures are hashed by their references, not the values they contain.
<gcb>\
mod example

use std::io::println

proc main() {
    val a = { name = "Cookie", age = 5 }
    println(hash(a)) // prints a different number each time
    println(hash(a.name)) // prints the same value each time
    println(hash(a.age)) // prints the same value each time
}
</gcb>
</p>

<h>length</h>
<p>
Returns the length of the given string (in code points) or array (in elements)
as an integer.
<gcb>\
mod example

use std::io::println

proc main() {
    println(length("Hello")) // prints '5'
    println(length([2, 3, 5, 7])) // prints '4'
    println(length("This string is 28 chars long")) // prints '28'
}
</gcb>
</p>

<h>panic</h>
<p>
Logs the given string reason along with other information useful for debugging
and makes the program exit immediately.
</p>
<p>
This mechanism is supposed to be used in situations where the programmer made a 
mistake, not an actual valid state of the program.
That's also why you're not able to handle a panic in any way. Use a
<a target="_blank" href="../docs/std/res.html">result</a> if you want the error
to be handled.
</p>
<p>
Since the procedure never actually returns, it returns a theoretical
value of type <c>any</c>, meaning it may be used as a placeholder for any other
value.
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
    } return panic("Invalid input!") // used as a placeholder for a string here
}
</gcb>
</p>

<h>range</h>
<p>
Returns an iterator over all integers starting at the first argument up to
(not including) the integer passed as the second argument.
This procedure is called when you use the <c>start..end</c>-syntax.
<gcb>\
mod example

use std::(iter::for_each, io::println)

proc main() {
    0..10 |> for_each(println) // prints '0', '1', ..., '8', '9'
}
</gcb>
</p>

<h>range_incl</h>
<p>
Returns an iterator over all integers starting at the first argument up to
(including) the integer passed as the second argument.
This procedure is called when you use the <c>start..=end</c>-syntax.
<gcb>\
mod example

use std::(iter::for_each, io::println)

proc main() {
    0..=10 |> for_each(println) // prints '0', '1', ..., '9', '10'
}
</gcb>
</p>

<h>substring</h>
<p>
Creates a new string by copying the part of the given source string
provided by the first argument starting at the code point index 
provided by the second argument up to the code point index provided by
the third argument. If any index is negative, the length of the source string
will be added to it.
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

<h>tag_eq</h>
<p>
Given two union values, this procedure compares them only by their variant,
not the value they hold.
<gcb>\
mod example

use std::io::println

proc main() {
    val a = #cat { name = "Snowball", hunger = 0.2 }
    val b = #cat { name = "Cookie", hunger = 0.6 }
    val c = #dog { name = "Rex", volume = 3.0 }
    val d = #cat { name = "Snowball", hunger = 0.2 }
    println(tag_eq(a, b)) // prints 'true'
    println(tag_eq(a, c)) // prints 'false'
    println(tag_eq(a, d)) // prints 'true'
}
</gcb>
</p>
        `
    },

    {
        name: "Time of Evaluation",
        id: "time-of-evaluation",
        body: `
<p>
Up to this point, all Gera code we have seen has been executed when the
program itself was executed. However, the Gera compiler features an interpreter,
which makes it possible to execute Gera code while it is being compiled.
</p>
<p>
There are a number of "static" contexts in which any code will be evaluated
at time of compilation, these being:
<ul>
    <li>global variables / constants</li>
    <li><c>case</c> branch values</li>
    <li><c>static</c> expressions</li>
</ul>
</p>

<h>Static Context</h>
<p>
Almost all expressions may be evaluated at compilation time, even procedure calls.
The only limitations are that it may not use I/O and that it's slower since it's
interpreted. As an example, let's compute the 30th Fibonacci number at compile time
using our beloved linear Fibonacci sequence iterator:
<gcb>\
mod example

use std::(iter::*, opt::expect, io::println)

// Iterator over the Fibonacci sequence
proc fib() {
    mut a = 0
    mut b = 1
    return || {
        val c = a + b
        a = b
        b = c
        return #next c
    }
}

// compute the 30th Fibonacci number at compile time
val fib30 = fib()
    |> skip(30)
    |> next()
    |> expect("is infinite")

proc main() {
    println(fib30) // prints '2178309'
}
</gcb>
</p>

<h>The <c>static</c>-Keyword</h>
<p>
You can insert a static expression at any point by simply writing <c>static</c>
in front of it. This will cause the compiler to evaluate the expression at
compile time, making it unable to access any variables declared in the scope
around it. As an example we can use this to remove the global variable from
our example above:
<gcb>\
mod example

use std::(iter::*, opt::expect, io::println)

// Iterator over the Fibonacci sequence
proc fib() {
    mut a = 0
    mut b = 1
    return || {
        val c = a + b
        a = b
        b = c
        return #next c
    }
}

proc main() {
    // compute the 30th Fibonacci number at compile time,
    // then simply insert the value into the variable at runtime
    val fib30 = static fib()
        |> skip(30)
        |> next()
        |> expect("is infinite")
    println(fib30)
}
</gcb>
</p>

<h>A Blurry Line</h>
<p>
To demonstrate how blurry the line between compile time and runtime can be,
consider this piece of code, which demonstrates that functions can capture
local variables at compile time and use and modify them at runtime:
<gcb>\
mod example

use std::io::println

proc next_getter() {
    // this gets executed at compile time
    mut i = 0
    return || {
        // this gets executed at runtime
        val c = i
        i = i + 1
        return c
    }
}

proc main() {
    val next = static next_getter()
    println(next()) // prints '0'
    println(next()) // prints '1'
    println(next()) // prints '2'
    println(next()) // prints '3'
    println(next()) // prints '4'
}
</gcb>
</p>
        
        `
    },

    {
        name: "Conditional Compilation",
        id: "conditional-compilation",
        body: `
<p>
You can use the <c>target ... { ... }</c>-syntax to only include a piece of code
when compiling to a specific target output format, 
these being <c>c</c> and <c>js</c>:
<gcb>\
mod example

target c {
    proc add(x, y) = x + y
}

proc main() {
    target c {
        println("We are compiling to C!")
        println(add(5, 10))
    }
    target js {
        println("We are compiling to JS!")
        // 'add' isn't available
    }
}
</gcb>
</p>
        
        `
    },

    {
        name: "C and Javascript Interop",
        id: "c-and-javascript-interop",
        body: `
<p>
To interact with external C or Javascript code, Gera uses external 
mappings files. These define external functions, variables and data structres.
Their file extension is <c>.gem</c>, and they can simply be placed alongside
your Gera source files.
</p>

<p>
External C code that should be compiled alongside the C output generated by
the Gera compiler shall be put into a new <c>src-c</c>-directory placed in
the same directory as your <c>src</c>-directory. Same thing for Javascript,
which goes into the <c>src-js</c>-directory instead. The Gera package manager
automatically detects these directories and deals with their contents.
</p>

<h>Built-in Types</h>
<p>
The following types are available in external mappings files:
<ul>
    <li>
        <c>unit</c> 
            - the unit type 
            - <c>undefined</c> in Javascript and <c>void</c> in C
            (arguments or members that are of type <c>unit</c> are simply removed)
    </li>
    <li>
        <c>bool</c> - a boolean - a boolean in Javascript and a <c>gbool</c> in C
    </li>
    <li>
        <c>int</c> - an integer - a <c>BigInt</c> in Javascript and a <c>gint</c> in C
    </li>
    <li>
        <c>float</c> - a float - a number in Javascript and a <c>gfloat</c> in C
    </li>
    <li>
        <c>str</c> - a string - a string in Javascript and a <c>GeraString</c> in C
    </li>
    <li>
        <c>|Arg1T, Arg2T, Arg3T, ...| -> RetT</c> 
            - a function with the specified argument types and return type 
            (a return type must always be specified)
            - a function in JS and a <c>GeraClosure</c> in C
            (more info in the next section)
    </li>
    <li>
        <c>{ mem_1_name = Mem1T, mem_2_name = Mem2T, ... }</c>
            - an object with the specified member types
            - an object in JS and a <c>GeraObject</c> in C
            (more info in the next section)
    </li>
    <li>
        <c>[ElemT]</c>
            - an array with the specified element type
            - an array in JS and a <c>GeraArray</c> in C 
            (more info in the next section)
    </li>
</ul>
</p>

<h>Type Definitions</h>
<p>
In external mapping files a new type can be declared using 
the <c>type ... = ...</c> syntax. This makes the type
available under the new name for the rest of the file starting at that point:
<ecb>\
type Cat = { name = str, age = int, hunger = float }
type LitterBox = { level = float, users = [Cat] }
</ecb>
</p>

<h>Procedures</h>
<p>
In external mapping files an externally implemented procedure may be defined 
using the <c>proc</c>-keyword:
<ecb>\
// available for Gera code as 'some_module::add'
// needs to be implemented in C or JS as 'some_module_add'
proc some_module::add(int, int) -> int = some_module_add

// available for Gera code as 'some_module::println'
// needs to be implemented in C or JS as 'some_module_println'
// no return type specified - therefore implicitly returns 'unit'
proc some_module::println(str) = some_module_println
</ecb>
</p>

<h>Variables</h>
<p>
To declare an externally implemented global variable in external mapping files,
use the <c>val</c>-keyword:
<ecb>\
// -- example.gem --
// mapping for Javascript 'Math'
val js::Math { PI = float, sin = |float| -> float }
</ecb>
<gcb>\
// -- example.gera --
mod example

use std::io::println
use js::Math

proc main() {
    println(Math.sin(Math.PI)) // prints a value very close to (if not) zero
}
</gcb>
</p>
        `
    },

    {
        name: "Writing External C",
        id: "writing-external-c",
        body: `
<p>
There are a few things you have to keep in mind when writing C that interoperates
with Gera, which shall be explained in this section. 
It's a lot more technical than the previous sections and requires knowledge
of the C programming language, so unless you want to write Gera code that
interoperates with C code feel free to skip this section.
</p>

<h>About Referenced Types</h>
<p>
When working with Gera types in C, you must handle referenced types with
extra care. These types are always written in PascalCase, and they always
have an <c>allocation</c>-property.
</p>
<p>
When you create a copy of one of these types, you need to pass their
<c>allocation</c>-property to <c>gera___ref_copied</c>.
</p>
<p>
When a copy is deleted, you need to pass their 
<c>allocation</c>-property to <c>gera___ref_deleted</c>.
</p>
<p>
Gera uses these functions to manage memory. For example, let's consider
the following external definition (external mapping file):
<ecb>\
proc example::println(str) = example_println
</ecb>
And now let's implement it in C:
<ccb>\
#include &lt;gera.h&gt;
#include &lt;stdio.h&gt;

void example_println(GeraString line) {
    // write string contents to stdout using 'fwrite'
    fwrite(line.data, sizeof(char), line.length_bytes, stdout);
    putchar('\\n');
    // reference is deleted at the end of this scope
    gera___ref_deleted(line.allocation);
}
</ccb>
</p>

<h>About <c>GeraAllocation</c></h>
<p>
To create your own instances of referenced types, you will need to create
a <c>GeraAllocation*</c>. You can achieve this by using the 
<c>gera___alloc</c>-function, which takes the allocation size and a free handler
function (taking the <c>GeraAllocation*</c> as an argument and returning nothing).
</p>
<p>
Let's say we want to allocate an array of 16 integers, then we'd write
<ccb>\
// passing null for the free handler is also valid
GeraAllocation* a = gera___alloc(sizeof(gint) * 16, NULL);
gint* data = (gint*) a->data;
// now we can write our integers to 'data'
GeraArray array = (GeraArray) { .allocation = a, .length = 16 };
</ccb>
</p>

<h>About <c>GeraString</c></h>
<p>
A <c>GeraString</c> has the following definition:
<ccb>\
typedef struct GeraString {
    GeraAllocation* allocation;
    size_t length; // length of the string in unicode code points
    size_t length_bytes; // length of the string in bytes
    const char* data; // string data
} GeraString;
</ccb>
</p>
<p>
The <c>gera___alloc_string</c>-procedure allows you to create a <c>GeraString</c>
from a null-terminated string.
<c>gera___wrap_static</c> does the same, but does not allocate any memory
(and therefore requires the given string to be static, like a string literal).
<c>core::substring</c> and <c>core::concat</c> are available as C functions
as <c>gera___substring</c> and <c>gera___concat</c>. However, note that their C
counterparts do not do bounds checking or handle negative indices in any way.
</p>

<h>About <c>GeraClosure</c></h>
<p>
A <c>GeraClosure</c> has the following definition:
<ccb>\
typedef struct GeraClosure {
    GeraAllocation* allocation;
    const void* body; // function pointer to the body
} GeraClosure;
</ccb>
</p>
<p>
To call a <c>GeraClosure</c> you will need to get an actual function pointer
from it, which can be achieved using the <c>GERA_CLOSURE_FPTR</c> and
<c>GERA_CLOSURE_FPTR_NOARGS</c>-macros.
</p>
<p>
<c>GERA_CLOSURE_FPTR(closure, ret, ...)</c> takes the given <c>GeraClosure</c>,
return type and argument types and returns a function pointer that takes
the <c>allocation</c>-property of the closure together with the provided 
argument types and returns the specified type. 
</p>
<p>
<c>GERA_CLOSURE_FPTR_NOARGS(closure, ret)</c> takes the given <c>GeraClosure</c>
and return type and returns a function pointer that takes
the <c>allocation</c>-property of the closure and returns the specified type. 
</p>
<p>
For example, let's consider the following external mappings file:
<ecb>\
proc do_math(|float, float| -> float, float, float) -> float = do_math
</ecb>
And now let's implement it in C:
<ccb>\
#include &lt;gera.h&gt;

gfloat do_math(GeraClosure op, gfloat a, gfloat b) {
    // call 'op', passing 'a' and 'b'
    gfloat r = (GERA_CLOSURE_FPTR(op, gfloat, gfloat, gfloat))(op.allocation, a, b);
    gera___ref_deleted(op);
    return r;
}
</ccb>
</p>

<h>About <c>GeraArray</c></h>
<p>
A <c>GeraArray</c> has the following definition:
<ccb>\
typedef struct GeraArray {
    GeraAllocation* allocation;
    size_t length;
} GeraArray;
</ccb>
</p>
<p>
The array data is available under <c>my_array.allocation->data</c> 
(cast that pointer to a pointer to the element type).
</p>
<p>
For example, let's consider this external mapping
definition of an int array sum function:
<ecb>\
proc example::int_arr_sum([int]) -> int = int_arr_sum
</ecb>
And now let's implement it in C:
<ccb>\
#include &lt;gera.h&gt;

gint int_arr_sum(GeraArray vals) {
    gint* data = (gint*) vals.allocation->data;
    gint sum = 0;
    for(size_t i = 0; i < vals.length; i += 1) {
        sum += data[i];
    }
    gera___ref_deleted(vals.allocation);
    return sum;
}
</ccb>
</p>

<h>About <c>GeraObject</c></h>
<p>
A <c>GeraObject</c> has the following definition:
<ccb>\
typedef struct GeraObject {
    GeraAllocation* allocation;
} GeraObject;
</ccb>
</p>
<p>
The object data may be accessed by casting the pointer in the 
<c>data</c>-property of the <c>allocation</c>-property to a <c>struct</c>
with the same layout as declared in the external mappings file.
</p>
<p>
For example, let's consider the following external mappings file:
<ecb>\
type Cat = { 
    name = str, 
    age = int, 
    hunger = float 
}
proc example::feed_cat(Cat) = feed_cat
</ecb>
And now let's implement <c>feed_cat</c> in C:
<ccb>\
#include &lt;gera.h&gt;

// make sure this is the same order and the same types
// as in the external mappings file!
typedef struct CatLayout {
    GeraString name;
    gint age;
    gfloat hunger;
} CatLayout;

void feed_cat(GeraObject cat) {
    CatLayout* data = (CatLayout*) cat.allocation->data;
    data->hunger = 0.0;
    gera___ref_deleted(cat.allocation);
}
</ccb>
</p>
        
        `
    }

];