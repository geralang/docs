
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
        body: `[todo]`
    },

    {
        name: "Unit",
        id: "unit",
        body: `[todo]`
    },

    {
        name: "Branching",
        id: "branching",
        body: `[todo]`
    },

    {
        name: "Objects",
        id: "objects",
        body: `[todo]`
    },

    {
        name: "Arrays",
        id: "arrays",
        body: `[todo]`
    },

    {
        name: "Unions",
        id: "unions",
        body: `[todo]`
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