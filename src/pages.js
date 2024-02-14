
function page(name, body) {
    return { name, body };
}

function pageList(name, pages) {
    return { name, pages };
}

const pages = [

    page("Introduction", `
        <h>The Gera Programming Language</h>
        <br><br>
        This is the documentation for the Gera programming language.
        It assumes existing knowledge of a high-level programming language,
        such as Javascript, Python, Java, C# and similar languages, and therefore
        won't explain core programming concepts, but instead only how they
        are used in the Gera programming language.
        <br><br>
        <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    std::io::println("Hello, Gera!")
}
        </span></gc></pre>
        <i>The Gera compiler has been embedded into this site, allowing
        code inside of any of the examples (which can be edited)
        to be compiled to Javascript and executed right here in your browser
        as soon as you press</i> <c>Run</c>.
    `),

    page("Installation", `
        <h>Installing Rust and C</h>
        <br><br>
        The first step to installing Gera is installing <a href="https://www.rust-lang.org/">the Rust programming language</a>.
        We will need Rust to build <c>gerac</c> (the Gera compiler) from source.
        <br>
        If you plan on compiling Gera to machine code (executable binaries),
        also install a C compiler, such as gcc or clang.

        <br><br>
        <h>Installing the Gera Compiler</h>
        <br><br>
        The next step is downloading <a href="https://github.com/geralang/gerac">the <c>gerac</c> source code</a>
        and running <c>cargo build --release</c> in the folder that contains <c>Cargo.toml</c> to build <c>gerac</c> from source.
        The resulting executable file is in <c>target/release</c>.

        <br><br>
        <h>Installing the Gera Package Manager</h>
        <br><br>
        Now that we have the Gera compiler, the last step before we can start using Gera is installing <a href="https://github.com/geralang/gerap"><c>gerap</c>, the Gera package manager</a>.
        <br>
        As <c>gerap</c> is stable, we can download pre-built binaries for Windows, Linux and macOS on x86-64.
        Alternatively, you can also build it from source by following the instructions provided in the README (this will require a C compiler).
        <br>
        Finally, we just need to tell <c>gerap</c> where <c>gerac</c> (and our C compiler) actually is.
        This can be achieved by putting it into the PATH environment variable or
        by setting the <c>GERAP_GERAC_PATH</c> environment variable to the full path of the <c>gerac</c> binary
        (see the README for more environment variables, such as C compiler path or Javascript runtime path).
        <br>
        It is also recommended to put <c>gerap</c> itself into the PATH (to make using it easier).

        <br><br>

        Congratulations! You have now installed the Gera programming language.
        <br>
        Run <c>gerap new my_first_gera_project</c> to create a new project, and run <c>gerap run</c> in the newly created folder to run it.
    `),

    pageList("The Language", [

        page("Syntax", `
            <h>Syntax</h>
            <br><br>
            The Gera programming language ignores whitespace characters (including new lines)
            and does not use any symbols for statement termination.
            <br>
            Comments start with <c>//</c> and end at the next line break.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

// this is the program entry point
proc main() {
    var x = 5 + 15
    std::io::println(x) // prints '20'
}
            </span></gc></pre>

        `),

        page("Procedures", `
            <h>Procedures</h>
            <br><br>
            Procedures simply are sections of your program,
            being able to accept values as parameters and return a value.
            <br>
            In Gera, they are defined by using the <c>proc</c>-keyword
            followed by the name of the procedure and a list of parameters.
            A procedure may not be defined inside of another procedure.
            <br>
            By convention, Gera procedure names are in snake case.
            <br>
            Each program starts off at the start of a procedure, this usually being
            <c>main</c>.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    // the program starts here
}
            </span></gc></pre>
            <br><br>
            Procedures may return a value by using the <c>return</c>-keyword,
            <b>always</b> followed by the value to return.
            If you do not wish to return a value, simply use <c>return unit</c>.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    // the program starts here
}

proc add(x, y) {
    return x + y
}
            </span></gc></pre>
            <br><br>
            A procedure can be called by writing its name
            followed by a list of parameter values. The expression
            will result in the value returned by the procedure.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    add(5, 10) // returns 15
}

proc add(x, y) {
    return x + y
}
            </span></gc></pre>
        `),

        page("Variables", `
            <h>Variables</h>
            <br><br>
            A variable in Gera may be defined by using the <c>var</c>-keyword,
            followed by its name and a value.
            <br>
            By convention, Gera variable names are in snake case.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    var x = 5
    var y = 10
}
            </span></gc></pre>
            Variables defined outside of a procedure or function are global variables,
            which may be accessed from anywhere.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

var x = 5

proc main() {
    var y = x
}
            </span></gc></pre> 
            <br><br>
            Variables in Gera are immutable by default, not allowing us to assign a new value
            after the variable has already been defined.
            This means that the following will produce an error:
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    var x = 5
    x = 25
}
            </span></gc></pre>
            To allow a new value to be assigned to the variable, we must define
            it as a <c>mut var</c>.
            However, note that global variables may not be defined as mutable.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    mut var x = 5
    x = 25
}
            </span></gc></pre>
        `),
        
        page("Modules", `
            <h>Modules</h>
            <br><br>
            Each file containing Gera source code represents a module.
            The full path of the module is defined at the top of the file,
            using the <c>mod</c>-keyword.
            <br>
            The module path is independent of the file's location, but there may never
            be two or more files sharing the same module path.
            <br>
            In the examples provided in the documentation,
            this will almost always simply be <c>example</c>, but a more
            complex path may be used, such as <c>std::io</c> or <c>foo::bar::baz</c>.
            <br>
            The <c>::</c> is used to denote that something is part of a module,
            meaning that <c>std::io</c> is a submodule of the module <c>std</c>,
            and that <c>std::io::println</c> is a procedure called <c>println</c>
            in the module <c>std::io</c>.
            <br><br>
            To access a procedure or variable from some module,
            simply specify its full module path,
            such as <c>std::io::println</c> or <c>std::math::PI</c>.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    std::io::println(std::math::PI)
}
            </span></gc></pre>
            <br><br>
            By default, all procedures and global variables in all modules
            are private, making the following is invalid:
            <br>
            <pre><gc main="example::bar::main">
                <span ext="gera" hls="source.gera">
mod example::foo

proc add(x, y) {
    return x + y
}
                </span>
                <span ext="gera" hls="source.gera">
mod example::bar

proc main() {
    std::io::println(example::foo::add(5, 10))
}
                </span>
            </gc></pre>            
            <br>
            To allow other modules to access a procedure or variable,
            use the <c>pub</c>-keyword followed by the thing you want to be public:
            <br>
            <pre><gc main="example::bar::main">
                <span ext="gera" hls="source.gera">
mod example::foo

pub proc add(x, y) {
    return x + y
}
                </span>
                <span ext="gera" hls="source.gera">
mod example::bar

proc main() {
    std::io::println(example::foo::add(5, 10))
}
                </span>
            </gc></pre>      
            <br><br>
            Always typing out the full path to access something can become fairly dreadful.
            <br>
            You can use the <c>use</c>-keyword to shorten things.
            Writing <c>use foo::bar::baz</c> will make <c>foo::bar::baz</c>
            available by simply writing <c>baz</c>.
            This works for modules, procedures and variables,
            meaning to get <c>std::io::println</c>,
            you may <c>use std::io</c> and write <c>io::println</c> or
            <c>use std::io::println</c> and write <c>println</c>.
            <br>
            Additionally, to do this for all procedures and variables in a module,
            use the <c>*</c>-operator. Writing <c>use std::io::*</c> will turn
            anything inside of that module into the full path.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io // turns 'io' into 'std::io'
use std::math::PI // turns 'PI' into 'std::math::PI'
use std::math::(TAU, E) // use multiple things from the same module by using parentheses

proc main() {
    io::println(PI)
    io::println(TAU)
    io::println(E)
}
            </span></gc></pre>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println
use std::math::* // same as 'use std::math::(PI, TAU, sin, cos, pow, ...)'

proc main() {
    println(sin(PI)) // 'sin' and 'PI' are in 'std::math'
}
            </span></gc></pre>
        `),

        page("Booleans", `
            <h>Booleans</h>
            <br><br>
            Booleans in Gera may either be <c>true</c> or <c>false</c>.
            <br><br>
            There are a few operations available specifically to be used
            with booleans:
            <br>
            <ul>
                <li>
                    <c>!x</c> will result in <c>true</c>
                    if <c>x</c> is <c>false</c>, and vice-versa.
                </li>
                <li>
                    <c>x && y</c> will result in <c>true</c> if
                    both <c>x</c> and <c>y</c> are <c>true</c>. 
                    <br>
                    Note that <c>y</c> will not be evaluated
                    if <c>x</c> turns out to be <c>false</c>.
                </li>
                <li>
                    <c>x || y</c> will result in <c>true</c> if
                    either <c>x</c> or <c>y</c> are <c>true</c>. 
                    <br>
                    Note that <c>y</c> will not be evaluated
                    if <c>x</c> turns out to be <c>true</c>.
                </li>
            </ul>
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var x = true
    var y = !x || false
    println(y)
}
            </span></gc></pre>
        `),

        page("Numbers", `
            <h>Numbers</h>
            <br><br>
            In Gera, there are two types of numbers - integers and floats.
            Both types are 64 bits large and are signed.
            <br>
            Integers are denoted by simply writing the integer, and floats
            are denoted by writing the number, which must contain the decimal point.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    var x = 25 // 'x' is an integer
    var y = 3.14 // 'y' is a float
}
            </span></gc></pre>
            <br><br>
            There are a number of operations available to be used with numbers:
            <ul>
                <li><c>x + y</c> - adds <c>x</c> and <c>y</c></li>
                <li><c>x - y</c> - subtracts <c>y</c> from <c>x</c></li>
                <li><c>x * y</c> - multiplies <c>x</c> and <c>y</c></li>
                <li>
                    <c>x / y</c> - divides <c>y</c> by <c>x</c>
                    (integer division by zero will cause a panic at runtime)
                </li>
                <li>
                    <c>x % y</c> - computes the remainder of <c>x</c> divided by <c>y</c>
                    (integer division by zero will cause a panic at runtime)
                </li>
                <li><c>x < y</c> - asks if <c>x</c> is less than <c>y</c></li>
                <li><c>x > y</c> - asks if <c>x</c> is greater than <c>y</c></li>
                <li><c>x <= y</c> - asks if <c>x</c> is less than or equal to <c>y</c></li>
                <li><c>x >= y</c> - asks if <c>x</c> is greater than or equal to <c>y</c></li>
                <li><c>x == y</c> - asks if <c>x</c> is equal to <c>y</c></li>
                <li><c>x != y</c> - asks if <c>x</c> is not equal to <c>y</c></li>
            </ul>
            Note that in the above operations, the types of the numbers on both sides
            must be the same, meaning the following is not valid.
            <br>
            This is because when converting from a float to an int (and vice-versa),
            precision will inevitably be lost.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var x = 5
    var y = 2.5
    var z = x + y
    println(z)
}
            </span></gc></pre>
            To make the above work, use the built-in <c>as_flt</c>- and <c>as_int</c>-procedures,
            which both take a number and turn it into a float and integer.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var x = 5
    var y = 2.5
    var z = as_flt(x) + y
    println(z)
}
            </span></gc></pre>
        `),

        page("Strings", `
            <h>Strings</h>
            <br><br>
            Strings of text may be created by simply writing your text inside
            of double quotes. Strings can reach across lines.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println("Hello, world!")
}
            </span></gc></pre>
            <br><br>
            A backspace in the string literal may be used for a number of things:
            <ul>
                <li>
                    A backspace in front of a line break is used to not include the line break
                    in the result string.
                </li>
                <li>
                    Putting a backspace in front of double quotes (<c>\\"</c>)
                    will put the double quotes into the string instead of ending the string literal.
                </li>
                <li>
                    Two backspaces (<c>\\\\</c>) will put a single backspace into the string.
                </li>
                <li>
                    <c>\\n</c> will put a new line into the string.
                </li>
                <li>
                    <c>\\r</c> will put a carriage return into the string.
                </li>
                <li>
                    A backspace followed by an <c>x</c>
                    and two hexadecimal digits (0-9, a-f or A-F each) will put the byte
                    represented by the two hexademical digits into the string.
                    <br>
                    (example: <c>\\x51</c> would result in <c>Q</c>)
                </li>
            </ul>
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println("Hello,\\nworld!")
    println("Hello, \\
world!")
    println("Hello, 
world!")
    println("Hello, \\x47\\x65\\x72\\x61!") // refer to an ASCII table for more details
}
            </span></gc></pre>
            <br><br>
            To get the length of a string, use the built-in <c>length</c>-procedure.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println(length("Hello, Gera!"))
}
            </span></gc></pre>
            <br><br>
            Append one string to the end of another by using the built-in <c>concat</c>-function.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println(concat("Hello, ", "Gera!"))
}
            </span></gc></pre>
            <br><br>
            Get part of a string by using the built-in <c>substring</c>-function.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println(substring("Don't use Gera! It's really bad!", 6, 15))
}
            </span></gc></pre>
            <br><br>
            Strings can be compared using <c>==</c> and <c>!=</c>, in which case
            the lengths and contents of the strings will simply be compared.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var s = "I like cats"
    println(s == s)
    println("Gera" == "Gera")
    println("foo" == "bar")
}
            </span></gc></pre>
        `),

        page("Branching", `
            <h>Branching</h>
            <br><br>
            <c>case</c> may be used to create a branch in your program.
            <br>
            To simply check if some condition is met,
            use <c>case</c> followed by your condtion, <c>-></c> and the thing to do.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var owned_cats = 0 // play around with this value!
    case owned_cats == 0 -> {
        println("you should get a cat")
    }
}
            </span></gc></pre>
            <br><br>
            Use the <c>else</c>-keyword to chain conditions.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var owned_cats = 1 // play around with this value!
    case owned_cats == 0
        -> println("you should get a cat") // note that for a single statement, no braces are needed
    else case owned_cats <= 2
        -> println("are you sure you don't want more?")
    else println("very nice")
}
            </span></gc></pre>
            <br><br>
            <c>case</c> can also be used to make a decision based on some value,
            by putting a block after the value (instead of <c>-></c>)
            and listing each value and its action inside of the block.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println(weekday(3))
}

use std::math::abs

proc weekday(i) {
    case i {
        0 -> return "Monday"
        1 -> return "Tuesday"
        2 -> return "Wednesday"
        3 -> return "Thursday"
        4 -> return "Friday"
        5 -> return "Saturday"
        6 -> return "Sunday"
    } else return panic("invalid input!") // 'panic' is a built-in procedure that crashes the program (it's defined to return any value)
}
            </span></gc></pre>
        `),

        page("Variants", `
            <h>Variants</h>
            <br><br>
            Variants represent the concept of tagged unions in Gera.
            <br>
            A tagged union is a type which may one of multiple variants (like an enum),
            each of which may hold a value of a different type as a value.
            <br>
            They may be created by using a <c>#</c> followed by the name of the variant and the value.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var my_pet = create_pet("Snowball", true)
    println(my_pet)
}

proc create_pet(name, is_cat) {
    case is_cat
        -> return #cat name
    return #dog name
}
            </span></gc></pre>
            <br><br>
            To get the value associated with a variant, you can use <c>case</c> to handle each possible variant.
            For this, simply write the variant name and optionally the name of the variable to put the value into.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var my_pet = create_pet("Snowball", true)
    case my_pet {
        #cat name -> {
            println("OMG IT'S A CAT 😍")
            println(name)
        }
        #dog -> println("Dogs are OK, I guess...")
    }
}

proc create_pet(name, is_cat) {
    case is_cat
        -> return #cat name
    return #dog name
}
            </span></gc></pre>
            <br><br>
            Variants may be compared with <c>==</c> and <c>!=</c>, which will check if both the tag
            (the variant name) and their values are equal. To only check if the tag is equal,
            the built-in <c>tag_eq</c>-procedure may be used.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println((#a 5) == (#a 5))
    println((#a 5) == (#a 10))
    println(tag_eq(#a 5, #a 10))
    println(tag_eq(#a 5, #b 10))
}
            </span></gc></pre>
        `),

        page("Functions", `
            <h>Functions</h>
            <br><br>
            In contrast to procedures, functions in Gera are values, just like numbers, booleans or strings.
            <br>
            Functions are defined by a list of parameters in side of two <c>|</c>
            either directly followed by the resulting expression or a block of statements.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var greet = || {
        println("Hello!")
        println("Bonjour!")
        println("Hallo!")
    }
    greet()
}
            </span></gc></pre>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var add = |x, y| x + y
    println(do_math(add, 5, 10))
}

proc do_math(op, a, b) {
    return op(a, b)
}
            </span></gc></pre>
            <br><br>
            Keep in mind that in contrast to procedures, which may be called with multiple different
            types as parameters for each call (as long as the type is valid), functions behave
            differently. A function can only accept one fixed type as a parameter, meaning
            the following works fine:
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc add(x, y) {
    return x + y
}

proc main() {
    println(add(5, 10)) // this call to 'add' uses integers
    println(add(5.0, 10.0)) // this call to 'add' uses floats
}
            </span></gc></pre>
            But the following (using a function instead) is not valid:
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var add = |x, y| x + y
    println(add(5, 10)) // 'add' is now a function that adds two integers...
    println(add(5.0, 10.0)) // ...meaning we can't use it with floats.
}
            </span></gc></pre>
            <br><br>
            All defined procedures may be used as functions by simply specifying their name.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    apply(println, "Hello, world!")
}

proc apply(f, val) {
    return f(val)
}
            </span></gc></pre>
            <br><br>
            Functions in Gera can also capture values from their environment.
            Gera functions capture by value, meaning changes to the variable
            outside of the function after the function has been created
            won't apply to the variable inside of the function, and vice-versa.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    mut var x = 1
    var increment = |y| x + y
    x = 25
    println(increment(4))
}
            </span></gc></pre>
            <br><br>
            Functions may be compared using <c>==</c> and <c>!=</c>, which will check
            if both sides are the exact same instance of that function.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var a = |x| x * 2
    var b = |x| x * 2
    var c = |x| x + 5
    println(a == a)
    println(a == b)
    println(a == c)
}
            </span></gc></pre>
        `),

        page("Objects", `
            <h>Objects</h>
            <br><br>
            Objects can be used to represent more complex data structures.
            They have a number of members,
            each of which being able to hold values of different types.
            <br>
            Objects are heap-allocated, meaning when you create them, you only
            get a reference to them, which you can copy (without copying the object).
            <br>
            They may be created by writing a list of name-value pairs inside of braces.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    var my_cat = {
        name = "Snowball",
        age = 5
    }
    var my_other_cat = my_cat
    // 'my_other_cat' and 'my_cat' refer to the same object!
}
            </span></gc></pre>
            <br><br>
            To access an object member, simply use the good old <c>.</c>-syntax.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var my_cat = {
        name = "Snowball",
        age = 5,
        hunger = 1.0
    }
    println(my_cat.hunger)
    feed(my_cat)
    println(my_cat.hunger)
}

proc feed(thing) {
    thing.hunger = 0.0
}
            </span></gc></pre>
            <br><br>
            Objects may be compared using <c>==</c> and <c>!=</c>, in which case each of their
            members will be compared. To check if both are the exact same instance of an object,
            use the built-in <c>addr_eq</c>-procedure.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println({ a = 5, b = 10 } == { a = 5, b = 10 })
    println({ a = 5, b = 10 } == { a = 5, b = 25 })
    println(addr_eq({ a = 5, b = 10 }, { a = 5, b = 10 }))
    var o = { a = 5, b = 10 }
    println(addr_eq(o, o))
}
            </span></gc></pre>
        `),

        page("Arrays", `
            <h>Arrays</h>
            <br><br>
            Just like objects, arrays in Gera are heap-allocated.
            You may create them by putting a list of values (of the same type) inside of <c>[...]</c>,
            or you may use the built-in <c>array</c>-procedure by creating an array of a given size from
            a given value.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    var yippie = array("yippie!", 10)
}
            </span></gc></pre>
            <br><br>
            To get an element from an array given a certain index, use the familiar bracket syntax.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    println(primes[0])
    println(primes[1])
    println(primes[2])
}
            </span></gc></pre>
            An invalid index will make the program panic at runtime.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    println(primes[10])
}
            </span></gc></pre>
            <br><br>
            To get the length of an array, use the built-in <c>length</c>-procedure.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    println(length(primes))
}
            </span></gc></pre>
        `),

        page("Unit", `
            <h>Unit</h>
            <br><br>
            <c>unit</c> in Gera is a type and value at the same time.
            This type has a size of zero and represents nothing.
            However, it can still be used as a value anywhere you want.
            <br>
            For example, it is often used for variants that don't have any
            value associated with them.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc main() {
    print_opt(#none unit)
    print_opt(#some 25)
}

use std::io::println

proc print_opt(o) {
    case o {
        #none -> println("There is no value!")
        #some v -> println(v)
    }
}
            </span></gc></pre>
            <br><br>
            <c>unit</c> can be compared using <c>==</c> (which will always result in <c>true</c>)
            and <c>!=</c> (which will always result in <c>false</c>):
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println(unit == unit)
    println(unit != unit)
}
            </span></gc></pre>
        `),

        page("Piping", `
            <h>Piping</h>
            <br><br><br>
            <h>Procedure Call Piping with <c>|></c></sh>
            <br><br>
            Deeply nested procedure calls can get pretty ugly fairly quickly.
            Gera provides syntactic sugar to help with this.
            <br>
            <c>x |> foo(y, z)</c> is the same as <c>foo(x, y, z)</c>.
            <br>
            This can be used to chain procedure calls, making things a lot easier to read.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc double(x) {
    return x + x
}

use std::opt // module for handling optional values
use std::io::println

proc main() {
    "3.14"
        // built-in that returns an optional float
        |> parse_flt()
        // expect the optional to have a value (for a given reason)
        |> opt::expect("should be valid") 
        |> double()
        |> println()
}
            </span></gc></pre>
            <br><br>
            <h>Method Calls with <c>.></c></sh>
            <br><br>
            "Method" refers to a member of an object that stores a function.
            This function accepts the thing its called as the first parameter,
            by convention usually called <c>self</c>.
            <br>
            To call these methods normally, you would have to write
            <c>x.foo(x, y)</c> (if <c>foo</c> was a method of <c>x</c>).
            However, Gera provides syntactic sugar to shorten this to
            <c>x .> foo(y)</c>.
            <br>
            This also allows it to be used in a chain together with <c>|></c>.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc create_cat(name) { return {
    name = name,
    hunger = 0.5,
    feed = |self| {
        self.hunger = 0.0
        return self
    }
} }

use std::io::println

proc main() {
    var my_cat = create_cat("Cookie")
        .> feed()
    my_cat.hunger
        |> println()
}
            </span></gc></pre>
        `),

        page("Evaluation During Compilation", `
            <h>Evaluation During Compilation</h>
            <br><br>
            There are a number of places where the Gera compiler will evaluate
            expressions at compile time and then simply insert the result value
            into the resulting program.
            <br>
            Expressions that are evaluated at compile time may not call out to any
            external code, so I/O, getting the time or doing any multithreading is not possible.
            <br>
            Objects and arrays that are the result of an expression that was evaluated at
            compile time are static and will live during the entire runtime of your program.
            <br><br>
            In <c>case</c>-arm values, the expression will be evaluated at compile time.
            This can easily be shown by making the value something computationally expensive,
            which will cause the compilation to take longer than usual.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc fib(n) {
    case n <= 1 -> return n
    return fib(n - 1) + fib(n - 2)
}

use std::io::println

proc main() {
    case 0 {
        fib(30) -> println("literally not possible")
        0 -> println("it's probably going to be this one")
    }
}
            </span></gc></pre>
            <br><br>
            Another context where values are evaluated at compilation time is the value of a global
            variable:
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc fib(n) {
    case n <= 1 -> return n
    return fib(n - 1) + fib(n - 2)
}

var fib30 = fib(30)

use std::io::println

proc main() {
    println(fib30)
}
            </span></gc></pre>
            <br><br>
            If you wish for any specific expression in your program to be evaluated at compile time,
            you may use the <c>static</c>-keyword to achieve this.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc fib(n) {
    case n <= 1 -> return n
    return fib(n - 1) + fib(n - 2)
}

use std::io::println

proc main() {
    println(static fib(30))
}
            </span></gc></pre>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    prime(2) |> println()
    prime(4) |> println()
}

proc prime(i) {
    var primes = static [2, 3, 5, 7, 11] // array is only created once
    return primes[i]
}
            </span></gc></pre>
        `),

        page("Conditional Compilation", `
            <h>Conditional Compilation</h>
            <br><br>
            The <c>target</c>-syntax allows you to only include a piece of code if the current
            compilation target format matches the one you specified.
            The standard library uses this to only include specific functions on the targets
            that support them.
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    target c {
        println("This will not run as examples are compiled to Javascript")
    }
    target js {
        println("This will run")
    }
}
            </span></gc></pre>
        `),

    ]),

    page("The Core Module", `
        <h>The <c>core</c>-Module</h>
        <br><br>
        The core module contains procedures that are cruicial when working with Gera.
        Many of the procedures in this module have already been mentioned
        in previous parts of the documentation.
        <br>
        All procedures in this module are imported by default (as if one did <c>use core::*</c>),
        meaning instead of writing <c>core::panic</c>, one can simply write <c>panic</c>.
        <br><br><br>
        <sh><c>range(start, end)</c></sh>
        <br><br>
        <b>Gera provides syntax sugar for this procedure.
        <c>start..end</c> will be replaced with <c>range(start, end)</c>.</b>
        <br>
        Returns an iterator over all integers starting at the integer <c>start</c>
        up to (excluding) the integer <c>end</c>. This also works if <c>start > end</c>,
        in which case it will behave as if <c>start</c> and <c>end</c> have been swapped.
        <br><br><br>
        <sh><c>range_incl(start, end)</c></sh>
        <br><br>
        <b>Gera provides syntax sugar for this procedure.
        <c>start..=end</c> will be replaced with <c>range_incl(start, end)</c>.</b>
        <br>
        Returns an iterator over all integers starting at the integer <c>start</c>
        up to (including) the integer <c>end</c>.
        This also works if <c>start > end</c>, in which case it will behave
        as if <c>start</c> and <c>end</c> have been swapped.
        <br><br><br>
        <sh><c>addr_eq(a, b)</c></sh>
        <br><br>
        Takes two objects of the same type <c>a</c> and <c>b</c>
        and returns a boolean representing if the addresses of the object match
        (if the passed references belong to the same object).
        <br><br><br>
        <sh><c>tag_eq(a, b)</c></sh>
        <br><br>
        Takes two variants <c>a</c> and <c>b</c>
        and returns a boolean representing if the tags of the variants match.
        <br><br><br>
        <sh><c>length(thing)</c></sh>
        <br><br>
        Takes a string or array <c>thing</c>
        and returns the number of elements (if <c>thing</c> is an array)
        or the number of code points (if <c>thing</c> is a string) as an integer.
        <br><br><br>
        <sh><c>array(value, size)</c></sh>
        <br><br>
        Creates a new array with <c>size</c> elements by repeating <c>value</c> <c>size</c> times.
        <br><br><br>
        <sh><c>exhaust(iter)</c></sh>
        <br><br>
        Takes a function <c>iter</c>, which takes no parameters
        and returns either the variant <c>#next</c> or <c>#end</c> (any values),
        and calls that function over and over again until it returns <c>#end</c>.
        <br><br><br>
        <sh><c>panic(message)</c></sh>
        <br><br>
        Crashes the program, displaying the given error reason <c>message</c>.
        This error is irrecoverable, so it should only be used for situations
        where the programmer did something wrong.
        For recoverable errors, use <i>results</i> instead.
        <br><br><br>
        <sh><c>as_str(thing)</c></sh>
        <br><br>
        Returns the string representation of the given value <c>thing</c>.
        <br><br><br>
        <sh><c>as_int(number)</c></sh>
        <br><br>
        Takes an integer or float <c>number</c>
        and returns the number as an integer.
        When a float is passed, the float will be rounded down.
        <br><br><br>
        <sh><c>as_flt(number)</c></sh>
        <br><br>
        Takes an integer or float <c>number</c> and returns the number as a float.
        <br><br><br>
        <sh><c>substring(source, start, end)</c></sh>
        <br><br>
        Returns a part of the string <c>source</c>, starting at the code point at index <c>start</c>
        up to (excluding) the code point at index <c>end</c>.
        If <c>start</c> or <c>end</c> are negative,
        the length of <c>source</c> will be added to them.
        <br><br><br>
        <sh><c>concat(string_a, string_b)</c></sh>
        <br><br>
        Returns a new string by appending <c>string_b</c> to the end of <c>string_a</c>.
        <br><br><br>
        <sh><c>parse_int(source)</c></sh>
        <br><br>
        Attempts to parse <c>source</c> as an integer.
        If successful, the variant <c>#some</c>
        (where the value is the parsed integer) will be returned.
        If unsuccessful, the variant <c>#none</c> (where the value is <c>unit</c>) will be returned.
        <br><br><br>
        <sh><c>parse_flt(source)</c></sh>
        <br><br>
        Attempts to parse <c>source</c> as a float.
        If successful, the variant <c>#some</c>
        (where the value is the parsed float) will be returned.
        If unsuccessful, the variant <c>#none</c> (where the value is <c>unit</c>) will be returned.
        <br><br><br>
        <sh><c>string(repeated, times)</c></sh>
        <br><br>
        Creates a new string by repeating the string <c>repeated</c> <c>times</c> times.
        <br><br><br>
        <sh><c>hash(value)</c></sh>
        <br><br>
        Creates a 64-bit hash of the given <c>value</c>.
        This procedure will hash references to objects, arrays and functions,
        not the values they hold.
        This means that <c>hash(x) == hash(y)</c> will only be true
        for objects and arrays where <c>addr_eq(x, y)</c>.
    `),

    pageList("The Standard Library", [
        
        page("The Base Module", `
            <h>The <c>std</c>-Module</h>
            <br><br>
            This is the module that contains all the standard library sub-modules.
            <br>
            It is also home to a few procedures of its own.
            <br><br><br>
            <sh><c>if_else(cond, if_true, if_false)</c></sh>
            <br><br>
            Returns <c>if_true</c> if <c>cond</c> is <c>true</c>, and otherwise
            returns <c>if_false</c>.
            <br><br><br>
            <sh><c>if_else_lazy(cond, if_true, if_false)</c></sh>
            <br><br>
            Calls <c>if_true</c> without arguments and returns the returned value
            if <c>cond</c> is <c>true</c>,
            and otherwise calls <c>if_false</c> without arguments
            and returns the returned value.
        `),

        page("Array Utilities", `
            <h>The <c>std::arr</c>-Module</h>
            <br><br>
            This module contains utilities for working with arrays.
            <br><br><br>
            <sh><c>subarray(a, start, end)</c></sh>
            <br><br>
            Returns a part of the array <c>a</c>,
            starting at the index <c>start</c> and including all elements
            up to the index (not including) <c>end</c>. If <c>start</c> or
            <c>end</c> are negative, the length of <c>a</c> is added to them.
            <br><br><br>
            <sh><c>subarray_until(a, end)</c></sh>
            <br><br>
            Returns a part of the array <c>a</c>, including all elements
            up to the index (not including) <c>end_index</c>. If <c>end_index</c> is negative,
            the length of <c>a</c> is added to it. 
            <br><br><br>
            <sh><c>subarray_after(a, end)</c></sh>
            <br><br>
            Returns a part of the array <c>a</c>, including all elements
            at and after the index <c>start_index</c>. If <c>start_index</c> is negative,
            the length of <c>a</c> is added to it.
            <br><br><br>
            <sh><c>concat(a, b)</c></sh>
            <br><br>
            Creates a new array by appending all elements of the array <c>b</c> to the end
            of the array <c>a</c>.
            <br><br><br>
            <sh><c>clone(a)</c></sh>
            <br><br>
            Creates a shallow copy of the array <c>a</c>.
            <br><br><br>
            <sh><c>reversed(a)</c></sh>
            <br><br>
            Creates a new array by reversing the order of the elements in <c>a</c>.
            <br><br><br>
            <sh><c>iter(a)</c></sh>
            <br><br>
            Creates a new iterator over the elements in <c>a</c>.
            <br><br><br>
            <sh><c>collect(i)</c></sh>
            <br><br>
            Collects all the elements from the iterator <c>i</c> into a new array.
            Make sure the passed iterator is finite if you want this procedure to return
            before the heat death of the universe.
            <br><br><br>
            <sh><c>sorted(a, comp)</c></sh>
            <br><br>
            Uses <c>std::sort::quicksort</c> to return a new sorted shallow copy <c>a</c>
            sorted according to the comparison function <c>comp</c>
            (use <c>std::sort::ascending(f)</c> or <c>std::sort::descending(f)</c>,
            where <c>f</c> is a function that takes an element and returns an integer or float
            to sort according to).
        `),

        page("Bitwise Operations", `
            <h>The <c>std::bw</c>-Module</h>
            <br>
            <i>C and Javascript only</i>
            <br><br>
            This module contains procedures for bitwise operations.
            <br><br><br>
            <sh><c>and(x, y)</c></sh>
            <br><br>
            For each bit in the integers <c>x</c> and <c>y</c>, the resulting integer's bit
            is <c>1</c> if both the corresponding bit in <c>x</c> and <c>y</c> are <c>1</c>.
            <br><br><br>
            <sh><c>or(x, y)</c></sh>
            <br><br>
            For each bit in the integers <c>x</c> and <c>y</c>, the resulting integer's bit
            is <c>1</c> if either a corresponding bit in <c>x</c> or <c>y</c> is <c>1</c>.
            <br><br><br>
            <sh><c>xor(x, y)</c></sh>
            <br><br>
            For each bit in the integers <c>x</c> and <c>y</c>, the resulting integer's bit
            is <c>1</c> if the corresponding bits in <c>x</c> and <c>y</c> are not the same.
            <br><br><br>
            <sh><c>not(x)</c></sh>
            <br><br>
            For each bit in the integer <c>x</c>, the resulting integer's bit
            is <c>1</c> if the corresponding bit in <c>x</c> is <c>0</c>.
            <br><br><br>
            <sh><c>lshift(x, b)</c></sh>
            <br><br>
            Shifts the bits in the integer <c>x</c> by <c>b</c> bits to the left.
            The leftmost bits fall off, and newly inserted bits are <c>0</c>.
            <br><br><br>
            <sh><c>rshift(x, b)</c></sh>
            <br><br>
            <b>Preserves the sign! For zero-fill shifting, use <c>std::bw::urshift</c>.</b>
            <br>
            Shifts the bits in the integer <c>x</c> by <c>b</c> bits to the right.
            The rightmost bits fall off, and newly inserted bits are copies of the leftmost bit.
            <br><br><br>
            <sh><c>urshift(x, b)</c></sh>
            <br><br>
            <b>Does not preserve the sign!
            For sign-preserving shifting, use <c>std::bw::rshift</c>.</b>
            <br>
            Shifts the bits in the integer <c>x</c> by <c>b</c> bits to the right.
            The rightmost bits fall off, and newly inserted bits are <c>0</c>.
        `),

        pageList("Collections", [

            page("Hash Maps", `
                <h>The <c>std::coll::HashMap</c>-Module</h>
                <br><br>
                This module contains a simple hash map implementation.
                It provides the following procedures for creating them:
                <br><br><br>
                <sh><c>new()</c></sh>
                <br><br>
                Creates a new empty hash map.
                <br><br><br>
                <sh><c>collect(from_iter)</c></sh>
                <br><br>
                Collects all the items from the iterator <c>from_iter</c> into a new hash map.
                Expects the iterator items to be of type <c>{ key = K, value = V }</c>,
                where <c>K</c> is the type of the map keys,
                and <c>V</c> is the type of the map values.
                Make sure the passed iterator is finite if you want this procedure to return
                before the release of Portal 3.
                <br><br><br>
                <h>Properties</h>
                <br><br>
                A hash map created by <c>new</c> and <c>collect</c> has the following properties:
                <br><br><br>
                <sh><c>hasher</c></sh>
                <br><br>
                A function that takes a map key and returns its hash.
                Unless overwritten, this is <c>core::hash</c>.
                <br><br><br>
                <sh><c>load_factor</c></sh>
                <br><br>
                A float used to determine when the map should grow.
                The map will grow if <c>size > bucket_count * load_factor</c>.
                <br><br><br>
                <sh><c>size</c></sh>
                <br><br>
                Used to keep track of the number of key-value pairs in the map.
                <br><br><br>
                <sh><c>set(self, key, value)</c></sh>
                <br><br>
                A method that associates the value <c>value</c> with the key <c>key</c>.
                If there is already a value associated with <c>key</c>, it will be replaced.
                Returns <c>self</c>.
                <br><br><br>
                <sh><c>at(self, key)</c></sh>
                <br><br>
                A method that optionally returns the value assotiated with <c>key</c>.
                <br><br><br>
                <sh><c>has(self, key)</c></sh>
                <br><br>
                A method that returns a boolean representing if there is any value
                associated with <c>key</c>.
                <br><br><br>
                <sh><c>remove(self, key)</c></sh>
                <br><br>
                A method that removes the value associated with <c>key</c>,
                should there be any. Optionally returns the removed value.
                <br><br><br>
                <sh><c>iter(self)</c></sh>
                <br><br>
                A method that returns a new iterator over the key-value pairs
                inside of <c>self</c>. Each item in the iterator is of type
                <c>{ key = K, value = V }</c>, where <c>K</c> is a key
                and <c>V</c> is the value associated with it.
                <br><br><br>
                <sh><c>iter_keys(self)</c></sh>
                <br><br>
                A method that returns a new iterator over the keys inside of <c>self</c>.
                <br><br><br>
                <sh><c>iter_values(self)</c></sh>
                <br><br>
                A method that returns a new iterator over the values inside of <c>self</c>.
                <br><br><br>
                <sh><c>clone(self)</c></sh>
                <br><br>
                A method that returns a shallow copy of <c>self</c>.
            `),

            page("Vectors", `
                <h>The <c>std::coll::Vector</c>-Module</h>
                <br><br>
                This module contains a simple vector implementation.
                It provides the following procedures for creating them:
                <br><br><br>
                <sh><c>new()</c></sh>
                <br><br>
                Creates a new empty vector.
                <br><br><br>
                <sh><c>collect(from_iter)</c></sh>
                <br><br>
                Collects all the items from the iterator <c>from_iter</c> into a new vector.
                Make sure the passed iterator is finite if you want this procedure to return
                before the release of Grand Theft Auto VI.
                <br><br><br>
                <h>Properties</h>
                <br><br>
                A vector created by <c>new</c> and <c>collect</c> has the following properties:
                <br><br><br>
                <sh><c>size</c></sh>
                <br><br>
                Used to keep track of the number of elements in the vector.
                <br><br><br>
                <sh><c>push(self, item)</c></sh>
                <br><br>
                A method that pushes the item <c>item</c> to the end of the vector.
                Returns <c>self</c>.
                <br><br><br>
                <sh><c>append_arr(self, appended_array)</c></sh>
                <br><br>
                A method that appends all items in the array <c>appended_array</c>
                to the end of the vector.
                Returns <c>self</c>.
                <br><br><br>
                <sh><c>append_vec(self, appended_vector)</c></sh>
                <br><br>
                A method that appends all items in the vector <c>appended_vector</c>
                to the end of the vector.
                Returns <c>self</c>.
                <br><br><br>
                <sh><c>insert(self, index, item)</c></sh>
                <br><br>
                A method that inserts the item <c>item</c> into the vector,
                making it so it will be at the index <c>index</c>.
                All elements previously at and after <c>index</c> will have 1
                added to their index.
                If <c>index</c> is negative, the size of the vector will be added to <c>index</c>.
                Returns <c>self</c>.
                <br><br><br>
                <sh><c>pop(self)</c></sh>
                <br><br>
                A method that tries to remove the last element from the vector,
                optionally returning it if there is one.
                <br><br><br>
                <sh><c>remove(self, index)</c></sh>
                <br><br>
                A method that removes the element at index <c>index</c>.
                All elements previously after <c>index</c> will have 1
                subtracted their index.
                If <c>index</c> is negative, the size of the vector will be added to <c>index</c>.
                Returns the removed element.
                <br><br><br>
                <sh><c>at(self, index)</c></sh>
                <br><br>
                A method that returns the element at index <c>index</c>.
                If <c>index</c> is negative, the size of the vector will be added to <c>index</c>.
                <br><br><br>
                <sh><c>set(self, index, value)</c></sh>
                <br><br>
                A method that replaces the element at index <c>index</c> with <c>value</c>.
                If <c>index</c> is negative, the size of the vector will be added to <c>index</c>.
                Returns <c>self</c>.
                <br><br><br>
                <sh><c>clone(self)</c></sh>
                <br><br>
                A method that returns a shallow copy of <c>self</c>.
                <br><br><br>
                <sh><c>reverse(self)</c></sh>
                <br><br>
                A method that reverses the order of the elements in <c>self</c>,
                modifying <c>self</c>. Returns <c>self</c>.
                <br><br><br>
                <sh><c>iter(self)</c></sh>
                <br><br>
                A method that returns an iterator over all the elements in <c>self</c>.
                <br><br><br>
                <sh><c>as_array(self)</c></sh>
                <br><br>
                A method that returns a shallow copy of <c>self</c> as an array.
                <br><br><br>
                <sh><c>sort(self, comp)</c></sh>
                <br><br>
                Uses <c>std::sort::quicksort</c> to sort <c>self</c>, modifying <c>self</c>.
                The elements are sorted according to the comparison function <c>comp</c>
                (use <c>std::sort::ascending(f)</c> or <c>std::sort::descending(f)</c>,
                where <c>f</c> is a function that takes an element and returns an integer or float
                to sort according to).
            `),

        ]),

        pageList("Concurrency", [

            page("Mutexes", `
                <h>The <c>std::conc::Mutex</c>-Module</h>
                <br>
                <i>C only</i>
                <br><br>
                This module contains a simple mutex implementation.
                <br><br><br>
                <sh><c>new()</c></sh>
                <br><br>
                Creates a new mutex.
                <br><br><br>
                <h>Properties</h>
                <br><br>
                A mutex created by <c>new</c> has the following properties:
                <br><br><br>
                <sh><c>try_lock(self)</c></sh>
                <br><br>
                A method that attempts to lock the Mutex for the calling thread.
                If the mutex is already locked, <c>false</c> is returned immediately.
                If the mutex is not locked, the mutex will be locked
                and <c>true</c> will be returned.
                <br><br><br>
                <sh><c>lock(self)</c></sh>
                <br><br>
                A method that locks the Mutex for the calling thread.
                If the thread is already locked, the call will block until
                the mutex is free again.
                Returns <c>self</c>.
                <br><br><br>
                <sh><c>is_locked(self)</c></sh>
                <br><br>
                A method that returns <c>true</c> if <c>self</c> is locked by any
                thread, and otherwise <c>false</c>.
                <br><br><br>
                <sh><c>unlock(self)</c></sh>
                <br><br>
                A method that unlocks the mutex.
                Assumes that the mutex has been locked by the calling thread.
            `),

            page("Threads", `
                <h>The <c>std::conc::Thread</c>-Module</h>
                <br>
                <i>C only</i>
                <br><br>
                This module contains a simple thread implementation.
                <br><br><br>
                <sh><c>new(task)</c></sh>
                <br><br>
                Creates a new thread, executing the given function <c>task</c>
                without any parameters, and returns a handle object for it.
                <br><br><br>
                <sh><c>wait()</c></sh>
                <br><br>
                Makes the calling thread wait until <c>notify</c> was called
                on its handle object.
                <br><br><br>
                <sh><c>sleep(time)</c></sh>
                <br><br>
                Makes the calling thread for <c>time</c> milliseconds.
                <br><br><br>
                <h>Properties</h>
                <br><br>
                A thread created by <c>new</c> has the following properties:
                <br><br><br>
                <sh><c>notify(self)</c></sh>
                <br><br>
                A method that makes the thread the handle object represents resume execution if it previously called <c>wait</c>.
                <br><br><br>
                <sh><c>join(self)</c></sh>
                <br><br>
                A method that blocks the calling thread until the thread the handle object represents stops execution.
            `),

        ]),

        page("Environment", `
            <h>The <c>std::env</c>-Module</h>
            <br>
            <i>C only</i>
            <br><br>
            This module contains procedures for managing information provided by the environment.
            <br><br><br>
            <sh><c>args()</c></sh>
            <br><br>
            Returns the program's command line arguments as an array of strings.
            <br><br><br>
            <sh><c>vars()</c></sh>
            <br><br>
            Returns the names of all environment variables as an array of strings.
            <br><br><br>
            <sh><c>get_var(name)</c></sh>
            <br><br>
            Returns the value of the environment variable <c>name</c> as a string.
            <br><br><br>
            <sh><c>set_var(value, name)</c></sh>
            <br><br>
            Sets the value of the environment variable <c>name</c> to the string <c>value</c>.
            <br><br><br>
            <sh><c>delete_var(name)</c></sh>
            <br><br>
            Deletes the environment variable <c>name</c>.
            <br><br><br>
            <sh><c>run(command)</c></sh>
            <br><br>
            Runs the shell command string <c>command</c>, blocking until the command has been executed and returning the exit code. For more control over the child process use <c>std::prc::Process</c>.
            <br><br><br>
            <sh><c>is_windows()</c></sh>
            <br><br>
            Returns <c>true</c> if the program is being run on Windows, and otherwise <c>false</c>.
            <br><br><br>
            <sh><c>is_osx()</c></sh>
            <br><br>
            Returns <c>true</c> if the program is being run on macOS, and otherwise <c>false</c>.
            <br><br><br>
            <sh><c>is_ios()</c></sh>
            <br><br>
            Returns <c>true</c> if the program is being run on iOS, and otherwise <c>false</c>.
            <br><br><br>
            <sh><c>is_linux()</c></sh>
            <br><br>
            Returns <c>true</c> if the program is being run on Linux, and otherwise <c>false</c>.
            <br><br><br>
            <sh><c>is_android()</c></sh>
            <br><br>
            Returns <c>true</c> if the program is being run on Android, and otherwise <c>false</c>.
            <br><br><br>
            <sh><c>is_unix()</c></sh>
            <br><br>
            Returns <c>true</c> if the program is being run on UNIX, and otherwise <c>false</c>.
        `),

        page("Input / Output", `
            <h>The <c>std::io</c>-Module</h>
            <br>
            <i>C and Javascript only</i>
            <br><br>
            This module contains procedures for writing to stdout and stderr,
            reading from stdin and interacting with the filesystem.
            <br><br><br>
            <sh><c>println(thing)</c></sh>
            <br><br>
            Uses <c>core::as_str</c> to convert <c>thing</c> to its string representation,
            and then writes it to the standard output, followed by a new line.
            <br><br><br>
            <sh><c>eprintln(thing)</c></sh>
            <br><br>
            Uses <c>core::as_str</c> to convert <c>thing</c> to its string representation,
            and then writes it to the standard error output, followed by a new line.
            <br><br><br>
            <h>The <c>std::io</c>-Module</h>
            <br>
            <i>C only</i>
            <br><br><br>
            <sh><c>inputln()</c></sh>
            <br><br>
            Reads a line of text as input from stdin (blocking), then returns it as a string.
            <br><br><br>
            <sh><c>print(thing)</c></sh>
            <br><br>
            Uses <c>core::as_str</c> to convert <c>thing</c> to its string representation,
            and then writes it to the standard output, <b>not followed by a new line</b>.
            <br><br><br>
            <sh><c>eprint(thing)</c></sh>
            <br><br>
            Uses <c>core::as_str</c> to convert <c>thing</c> to its string representation,
            and then writes it to the standard error output, <b>not followed by a new line</b>.
            <br><br><br>
            <sh><c>set_cwd(path)</c></sh>
            <br><br>
            Sets the program's current working directory to <c>path</c>.
            <br><br><br>
            <sh><c>get_cwd()</c></sh>
            <br><br>
            Returns the program's current working directory as an absolute path.
            <br><br><br>
            <sh><c>file_exists(path)</c></sh>
            <br><br>
            Returns <c>true</c> if there is a file or directory at the path
            specified by <c>path</c>, and otherwise returns <c>false</c>.
            <br><br><br>
            <sh><c>canonicalize(path)</c></sh>
            <br><br>
            Attempts to convert <c>path</c> to an absolute path,
            and returns the absolute path as a result with a string error.
            <br><br><br>
            <sh><c>is_dir(path)</c></sh>
            <br><br>
            Returns <c>true</c> if there is a directory at the path
            specified by <c>path</c>, and otherwise returns <c>false</c>.
            <br><br><br>
            <sh><c>create_dir(path)</c></sh>
            <br><br>
            Attempts to create a new directory at the path specified by <c>path</c>.
            Returns <c>unit</c> as a result with a string error.
            <br><br><br>
            <sh><c>read_dir(path)</c></sh>
            <br><br>
            Attemps to read the contents of the directory at the path <c>path</c>.
            Returns a string array with the content names as a result with a string error.
            <br><br><br>
            <sh><c>delete_dir(path)</c></sh>
            <br><br>
            Attemps to delete the directory at the path <c>path</c>.
            Returns <c>unit</c> as a result with a string error.
            <br><br><br>
            <sh><c>is_file(path)</c></sh>
            <br><br>
            Returns <c>true</c> if there is a file at the path
            specified by <c>path</c>, and otherwise returns <c>false</c>.
            <br><br><br>
            <sh><c>write_file(content, path)</c></sh>
            <br><br>
            Attempts to write the string <c>content</c> to a file at the path <c>path</c>,
            creating a new file or overwriting the existing one (UTF-8).
            Returns <c>unit</c> as a result with a string error.
            <br><br><br>
            <sh><c>read_file(path)</c></sh>
            <br><br>
            Attempts to read the contents of the file at the path <c>path</c> (UTF-8).
            Returns the file contents as a string as a result with a string error.
            <br><br><br>
            <sh><c>delete_file(path)</c></sh>
            <br><br>
            Attempts to delete the file at the path <c>path</c>.
            Returns <c>unit</c> as a result with a string error.
            <br><br><br>
            <sh><c>file_sep()</c></sh>
            <br><br>
            Returns the file separator (<c>\\</c> for Windows, <c>/</c> for UNIX)
            for the system the program is running on.
            <br><br><br>
            <sh><c>path_sep()</c></sh>
            <br><br>
            Returns the file path separator (<c>;</c> for Windows, <c>:</c> for UNIX)
            for the system the program is running on.
        `),

        page("Iterators", `
            <h>The <c>std::iter</c>-Moduke</h>
            <br><br>
            This module contains procedures for working with iterators.
            Iterators are Gera's alternative to loops.
            <br>
            Gera iterators are lazy, meaning (for example) when an iterator
            is mapped using a function, the function will only actually be
            called when the iterator is asked for that value.
            <br>
            In theory, a Gera iterator is simply defined as a function
            without arguments that returns either the variant <c>#next</c>
            (where the value is the next element in the sequence) or
            <c>#end</c> (with any value), meaning the end of the iterator has been reached.
            <br>
            Meaning to write your own iterator, you can simply return a function
            that returns either <c>#next ...</c> or <c>#end unit</c>. For example,
            here is an infinite iterator over the Fibonacci sequence:
            <br>
            <pre><gc main="example::main"><span ext="gera" hls="source.gera">
mod example

proc fib() {
    mut var a = 0
    mut var b = 1
    return || {
        var c = a + b
        a = b
        b = c
        return #next c
    }
}

use std::(iter, io)

proc main() {
    fib()
        |> iter::take(11)
        |> iter::for_each(io::println) 
}
            </span></gc></pre>
            <br><br><br>
            <sh><c>map(iter, mapping)</c></sh>
            <br><br>
            Returns a new iterator over the items of <c>iter</c>, where each item is mapped
            to the result of calling <c>mapping</c> with the item.
            <br><br><br>
            <sh><c>filter(iter, condition)</c></sh>
            <br><br>
            Returns a new iterator over the items of <c>iter</c>,
            only including the items for which <c>condition</c> returns <c>true</c>.
            <br><br><br>
            <sh><c>reduce(iter, reduction, intitial)</c></sh>
            <br><br>
            Starting with the current value being <c>initial</c>,
            fully exhausts the iterator <c>iter</c>, passing the current value (first argument)
            and the current item from <c>iter</c> (second argument) to <c>reduction</c>,
            making the result the new current value.
            After the end of <c>iter</c> has been reached, the current value is returned.
            <br><br><br>
            <sh><c>take(iter, n)</c></sh>
            <br><br>
            Returns a new iterator over the items in <c>iter</c>.
            Ends if either the end of <c>iter</c> has been reached or <c>n</c> elements
            have been taken from <c>iter</c>.
            <br><br><br>
            <sh><c>take_while(iter, cond)</c></sh>
            <br><br>
            Returns a new iterator over the items in <c>iter</c>.
            Ends if either the end of <c>iter</c> has been reached or the function <c>cond</c>
            returns <c>false</c> when being passed the current item.
            <br><br><br>
            <sh><c>skip(iter, n)</c></sh>
            <br><br>
            Returns a new iterator over the items in <c>iter</c>, skipping the next <c>n</c> items.
            <br><br><br>
            <sh><c>for_each(iter, action)</c></sh>
            <br><br>
            Fully exhausts <c>iter</c>, calling <c>action</c> with each item.
            <br><br><br>
            <sh><c>zip(iter_a, iter_b, combinator)</c></sh>
            <br><br>
            Returns a new iterator where each item in the sequence is the result of calling
            <c>combinator</c> with the next items from <c>iter_a</c> and <c>iter_b</c>.
            The iterator ends if either <c>iter_a</c> or <c>iter_b</c> end.
            <br><br><br>
            <sh><c>chain(iter_a, iter_b)</c></sh>
            <br><br>
            Returns a new iterator over the items of <c>iter_a</c>.
            If the end of <c>iter_a</c> is reached,
            the next items from <c>iter_b</c> will be returned.
            The iterator ends if both <c>iter_a</c> and <c>iter_b</c> end.
            <br><br><br>
            <sh><c>count(iter)</c></sh>
            <br><br>
            Fully exhausts <c>iter</c>, returning the number of items the iterator
            returned until the end was reached.
            <br><br><br>
            <sh><c>next(iter)</c></sh>
            <br><br>
            Optionally returns the next item from the iterator <c>iter</c>.
            <br><br><br>
            <sh><c>last(iter)</c></sh>
            <br><br>
            Fully exhausts <c>iter</c>,
            optionally returning the last returned item from the iterator.
            <br><br><br>
            <sh><c>find(iter, condition)</c></sh>
            <br><br>
            Exhausts <c>iter</c> until an item for which <c>condition</c> returns <c>true</c>
            has been returned. Optionally returns the found element.
            <br><br><br>
            <sh><c>find_last(iter, condition)</c></sh>
            <br><br>
            Fully exhausts <c>iter</c>,
            optionally returning the last item for which <c>condition</c> returns <c>true</c>.
            <br><br><br>
            <sh><c>enumerate(iter)</c></sh>
            <br><br>
            Returns a new iterator over objects
            where <c>idx</c> is the index of the item (0 is the first, 1 the second, ...)
            and <c>val</c> is the item from <c>iter</c>.
            The iterator ends if <c>iter</c> ends.
            <br><br><br>
            <sh><c>has(iter, element)</c></sh>
            <br><br>
            Exhausts <c>iter</c> until an item <c>i</c> for which <c>i == element</c>
            has been returned. Returns <c>true</c> if one has been found,
            and otherwise <c>false</c>.
            <br><br><br>
            <sh><c>empty()</c></sh>
            <br><br>
            Returns a new empty iterator.
            <br><br><br>
            <sh><c>over_value(value)</c></sh>
            <br><br>
            Returns a new iterator that only returns <c>value</c> once,
            afterwards reaching the end.
            <br><br><br>
            <sh><c>repeat_over(f)</c></sh>
            <br><br>
            Returns a new infinite iterator, where each item in the sequence is the value
            returned by <c>f</c>.
        `),

        page("Math", `
            <h>The <c>std::math</c>-Module</h>
            <br><br>
            This module contains constants and procedures for general math-related operations.
            <br><br><br>
            <sh><c>INT_MIN</c></sh>
            <br><br>
            <c>-9223372036854775808</c>
            <br><br><br>
            <sh><c>INT_MAX</c></sh>
            <br><br>
            <c>9223372036854775807</c>
            <br><br><br>
            <sh><c>INF</c></sh>
            <br><br>
            The float infinity value. The result of <c>1.0 / 0.0</c>.
            <br><br><br>
            <sh><c>NAN</c></sh>
            <br><br>
            The float "not a number" value. The result of <c>0.0 / 0.0</c>.
            <br><br><br>
            <sh><c>PI</c></sh>
            <br><br>
            <c>3.14159265358979323846264338327950288</c>
            <br><br><br>
            <sh><c>TAU</c></sh>
            <br><br>
            <c>6.28318530717958647692528676655900577</c>
            <br><br><br>
            <sh><c>E</c></sh>
            <br><br>
            <c>2.718281828459045</c>
            <br><br><br>
            <sh><c>abs(x)</c></sh>
            <br><br>
            Returns the absolute value of the float or integer <c>x</c>.
            <br><br><br>
            <sh><c>max(a, b)</c></sh>
            <br><br>
            Returns the larger integer or float of <c>a</c> and <c>b</c>.
            <br><br><br>
            <sh><c>min(a, b)</c></sh>
            <br><br>
            Returns the smaller integer or float of <c>a</c> and <c>b</c>.
            <br><br><br>
            <sh><c>clamp(x, min, max)</c></sh>
            <br><br>
            Returns the integer or float <c>x</c>
            limited to being at least as large as <c>min</c> 
            and being at most as large as <c>max</c>.
            <br><br><br>
            <h>The <c>std::math</c>-Module</h>
            <br>
            <i>C and Javascript only</i>
            <br><br><br>
            <sh><c>exp(x)</c></sh>
            <br><br>
            Returns <c>e</c> raised to the power of the float <c>x</c>.
            <br><br><br>
            <sh><c>expm1(x)</c></sh>
            <br><br>
            Returns <c>e</c> raised to the power of the float <c>x</c>,
            subtracted by 1.
            <br><br><br>
            <sh><c>log(x)</c></sh>
            <br><br>
            Returns the natural logarithm (base <c>e</c>) of the float <c>x</c>.
            <br><br><br>
            <sh><c>log10(x)</c></sh>
            <br><br>
            Returns the base 10 logarithm of the float <c>x</c>.
            <br><br><br>
            <sh><c>log2(x)</c></sh>
            <br><br>
            Returns the base 2 logarithm of the float <c>x</c>.
            <br><br><br>
            <sh><c>log1p(x)</c></sh>
            <br><br>
            Returns the natural logarithm (base <c>e</c>) of the float <c>x + 1</c>.
            <br><br><br>
            <sh><c>pow(x, n)</c></sh>
            <br><br>
            Returns the float <c>x</c> raised to the power of the float <c>n</c>.
            <br><br><br>
            <sh><c>sqrt(x)</c></sh>
            <br><br>
            Returns the square root of the float <c>x</c>.
            <br><br><br>
            <sh><c>cbrt(x)</c></sh>
            <br><br>
            Returns the cubic root of the float <c>x</c>.
            <br><br><br>
            <sh><c>hypot(a, b)</c></sh>
            <br><br>
            Returns the square root of the sum of squares of the floats <c>a</c> and <c>b</c>.
            <br><br><br>
            <sh><c>sin(x)</c></sh>
            <br><br>
            Returns the sine of the float <c>x</c> in radians.
            <br><br><br>
            <sh><c>cos(x)</c></sh>
            <br><br>
            Returns the cosine of the float <c>x</c> in radians.
            <br><br><br>
            <sh><c>tan(x)</c></sh>
            <br><br>
            Returns the tangent of the float <c>x</c> in radians.
            <br><br><br>
            <sh><c>asin(x)</c></sh>
            <br><br>
            Returns the inverse sine of the float <c>x</c> in radians.
            <br><br><br>
            <sh><c>acos(x)</c></sh>
            <br><br>
            Returns the inverse cosine of the float <c>x</c> in radians.
            <br><br><br>
            <sh><c>atan(x)</c></sh>
            <br><br>
            Returns the inverse tangent of the float <c>x</c> in radians.
            <br><br><br>
            <sh><c>atan2(x)</c></sh>
            <br><br>
            Returns the angle in the plane in radians
            between the positive x-axis and the ray from (0, 0) to the point <c>(x, y)</c>.
            <br><br><br>
            <sh><c>sinh(x)</c></sh>
            <br><br>
            Returns the hyperbolic sine of the float <c>x</c>.
            <br><br><br>
            <sh><c>cosh(x)</c></sh>
            <br><br>
            Returns the hyperbolic cosine of the float <c>x</c>.
            <br><br><br>
            <sh><c>tanh(x)</c></sh>
            <br><br>
            Returns the hyperbolic tangent of the float <c>x</c>.
            <br><br><br>
            <sh><c>asinh(x)</c></sh>
            <br><br>
            Returns the inverse hyperbolic sine of the float <c>x</c>.
            <br><br><br>
            <sh><c>acosh(x)</c></sh>
            <br><br>
            Returns the inverse hyperbolic cosine of the float <c>x</c>.
            <br><br><br>
            <sh><c>atanh(x)</c></sh>
            <br><br>
            Returns the inverse hyperbolic tangent of the float <c>x</c>.
            <br><br><br>
            <sh><c>ceil(x)</c></sh>
            <br><br>
            Returns the the float <c>x</c> rounded up the nearest integer.
            <br><br><br>
            <sh><c>floor(x)</c></sh>
            <br><br>
            Returns the the float <c>x</c> rounded down the nearest integer.
            <br><br><br>
            <sh><c>trunc(x)</c></sh>
            <br><br>
            Returns the the integer part of the float <c>x</c> by removing any fractional digits.
            <br><br><br>
            <sh><c>round(x)</c></sh>
            <br><br>
            Returns the the float <c>x</c> rounded to the nearest integer.
        `),

    ]),

    page("External Mappings", `
        <i>
            Info: This page explains how your Gera code can interact with code written in another
            language, such as Javascript or C. If this is not your goal, you may simply skip
            this page.
        </i>
        <br><br>
        <h>External Mappings</h>
        <br><br>
        <b>G</b>era <b>e</b>xternal <b>m</b>apping files (<c>.gem</c>) are files which contain
        mappings to external functions written in another programming language.
        <br>
        Because the compiler only knows what you tell it about the external functions and variables,
        Gera requires type annotations for external procedures and variables.
        <br><br>
        <h>Types</h>
        <br><br>
        There are a number of types to choose from, these being:
        <ul>
            <li>
                <c>unit</c> - The unit type.
                <br>
                In C, this translates to <c>void</c>.
                <br>
                In JS, this translates to <c>undefined</c>.
            </li>
            <li>
                <c>bool</c> - A boolean.
                <br>
                In C, this translates to <c>gbool</c>.
                <br>
                In JS, this translates to a Javascript boolean.
            </li>
            <li>
                <c>int</c> - A 64-bit signed integer.
                <br>
                In C, this translates to <c>gint</c>.
                <br>
                In JS, this translates to a <c>BigInt</c>.
            </li>
            <li>
                <c>float</c> - A 64-bit floating-point number.
                <br>
                In C, this translates to <c>gfloat</c>.
                <br>
                In JS, this translates to a Javascript number.
            </li>
            <li>
                <c>str</c> - A string.
                <br>
                In C, this translates to <c>GeraString</c>.
                <br>
                In JS, this translates to a Javascript string.
            </li>
            <li>
                <c>[T]</c> - An array with element type <c>T</c>.
                <br>
                In C, this translates to <c>GeraArray</c>.
                <br>
                In JS, this translates to a Javascript array.
            </li>
            <li>
                <c>|A1, A2, A3, ...| -> R</c> - A closure with parameter types
                <c>A1</c>, <c>A2</c>, <c>A3</c>, ... and return type <c>R</c>.
                <br>
                In C, this translates to <c>GERA_CLOSURE(R, A1, A2, A3, ...)</c>
                (or <c>GERA_CLOSURE_NOARGS(R)</c> if there are no arguments).
                <br>
                In JS, this translates to a Javascript object
                with a <c>call</c>-method with the same argument types and the same return type.
            </li>
            <li>
                <c>{ m1 = M1, m2 = M2, m3 = M3, ... }</c> - An object with members
                <c>m1</c> (of type <c>M1</c>), <c>m2</c> (of type <c>M2</c>), <c>m3</c> (of type <c>M3</c>), ... .
                <br>
                In C, this translates to a <c>struct { M1 m1; M2 m2; M3 m3; }</c>
                (C passes the struct directly, copying it)
                <br>
                In JS, this translates to a Javascript object with the same members.
                (JS passes a reference to the object)
            </li>
        </ul>
        <i>Please refer to
        <a href="https://github.com/geralang/ccoredeps/blob/main/geratypes.h">geralang/ccoredeps/geratypes.h</a>
        and
        <a href="https://github.com/geralang/ccoredeps/blob/main/gera.h">geralang/ccoredeps/gera.h</a>
        for the exact C type and macro definitions.
        </i>
        <br><br>
        Complex types may be given a name using the <c>type</c>-keyword.
        The type name may only be used below the declaration, and is only available for the file
        it was declared in.
        <br>
        <pre><gc main="example::main">
            <span ext="gem" hls="source.gem">
type JsMath = { PI = float, E = float }
            </span>
            <span ext="gera" hls="source.gera">
mod example

proc main() {}
            </span>
        </gc></pre>
        <br><br>
        <h>External Variables</h>
        <br><br>
        External variables may be defined using the <c>var</c>-keyword,
        followed by the full Gera module path, the variable type, <c>=</c> and the name
        it should be mapped to.
        <br>
        <pre><gc main="example::main">
            <span ext="gem" hls="source.gem">
type JsMath = { PI = float, E = float }

var js::math JsMath = Math
            </span>
            <span ext="gera" hls="source.gera">
mod example

use std::io::println

proc main() {
    println(js::math.PI)
}
            </span>
        </gc></pre>
        <br><br>
        <h>External Procedures</h>
        <br><br>
        External procedures may be defined using the <c>proc</c>-keyword,
        followed by the full Gera module path,
        the parameter types in parentheses,
        optionally <c>-></c> and the return type,
        <c>=</c> and the name it should be mapped to.
        <br>
        <pre><gc main="example::main">
            <span ext="gem" hls="source.gem">
proc js::alert(str) = alert
proc js::is_nan(float) -> bool = isNaN
            </span>
            <span ext="gera" hls="source.gera">
mod example

proc main() {
    js::is_nan(25.0)
        |> as_str()
        |> js::alert()
}
            </span>
        </gc></pre>

    `),

    page("Playground", `
        <pre><gc main="example::main">
            <span ext="gem" hls="source.gem">
// external mappings
            </span>
            <span ext="gera" hls="source.gera">
mod example

proc main() {
    std::io::println("Hello, world!")
}
            </span>
        </gc></pre>
    `),
];