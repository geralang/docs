
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
        <pre><gc>
mod example

proc main() {
    std::io::println("Hello, Gera!")
}
        </gc></pre>
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
            <pre><gc>
mod example

// this is the program entry point
proc main() {
    var x = 5 + 15
    std::io::println(x) // prints '20'
}
            </gc></pre>

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
            <pre><gc>
mod example

proc main() {
    // the program starts here
}
            </gc></pre>
            <br><br>
            Procedures may return a value by using the <c>return</c>-keyword,
            <b>always</b> followed by the value to return.
            If you do not wish to return a value, simply use <c>return unit</c>.
            <br>
            <pre><gc>
mod example

proc main() {
    // the program starts here
}

proc add(x, y) {
    return x + y
}
            </gc></pre>
            <br><br>
            A procedure can be called by writing its name
            followed by a list of parameter values. The expression
            will result in the value returned by the procedure.
            <br>
            <pre><gc>
mod example

proc main() {
    add(5, 10) // returns 15
}

proc add(x, y) {
    return x + y
}
            </gc></pre>
        `),

        page("Variables", `
            <h>Variables</h>
            <br><br>
            A variable in Gera may be defined by using the <c>var</c>-keyword,
            followed by its name and a value.
            <br>
            By convention, Gera variable names are in snake case.
            <br>
            <pre><gc>
mod example

proc main() {
    var x = 5
    var y = 10
}
            </gc></pre>
            Variables defined outside of a procedure or function are global variables,
            which may be accessed from anywhere.
            <br>
            <pre><gc>
mod example

var x = 5

proc main() {
    var y = x
}
            </gc></pre> 
            <br><br>
            Variables in Gera are immutable by default, not allowing us to assign a new value
            after the variable has already been defined.
            This means that the following will produce an error:
            <br>
            <pre><gc>
mod example

proc main() {
    var x = 5
    x = 25
}
            </gc></pre>
            To allow a new value to be assigned to the variable, we must define
            it as a <c>mut var</c>.
            However, note that global variables may not be defined as mutable.
            <br>
            <pre><gc>
mod example

proc main() {
    mut var x = 5
    x = 25
}
            </gc></pre>
        `),
        
        page("Modules", `
            <h>Modules</h>
            <br><br>
            Each file containing Gera source code represents a module.
            The full path of the module is defined at the top of the file,
            using the <c>mod</c>-keyword.
            <br>
            In the examples provided in the documentation,
            this will almost always simply be <c>example</c>, but a more
            complex path may be used, such as <c>std::io</c> or <c>foo::bar::baz</c>.
            <br>
            The <c>::</c> is used to denote a submodule,
            meaning <c>std::io</c> is a submodule of the module <c>std</c>.
            <br><br>
            By default, all procedures and global variables in all modules
            are private, meaning other modules may not access them.
            <br>
            To allow other modules to access a procedure or variable,
            use the <c>pub</c>-keyword followed by the thing you want to be public.
            <br>
            <pre><gc>
mod example

proc main() {}

pub proc add(x, y) {
    return x + y
}
            </gc></pre>
            <br><br>
            To access a procedure or variable from another module,
            simply specify its full module path,
            such as <c>std::io::println</c> or <c>std::math::PI</c>.
            <br>
            <pre><gc>
mod example

proc main() {
    std::io::println(std::math::PI)
}
            </gc></pre>
            <br><br>
            However, always typing out the full path can become fairly dreadful.
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
            <pre><gc>
mod example

use std::io // turns 'io' into 'std::io'
use std::math::PI // turns 'PI' into 'std::math::PI'
use std::math::(TAU, E) // use multiple things from the same module by using parentheses

proc main() {
    io::println(PI)
    io::println(TAU)
    io::println(E)
}
            </gc></pre>
            <pre><gc>
mod example

use std::io::println
use std::math::* // same as 'use std::math::(PI, TAU, sin, cos, pow, ...)'

proc main() {
    println(sin(PI)) // 'sin' and 'PI' are in 'std::math'
}
            </gc></pre>
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
            <pre><gc>
mod example

use std::io::println

proc main() {
    var x = true
    var y = !x || false
    println(y)
}
            </gc></pre>
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
            <pre><gc>
mod example

proc main() {
    var x = 25 // 'x' is an integer
    var y = 3.14 // 'y' is a float
}
            </gc></pre>
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
            <pre><gc>
mod example

use std::io::println

proc main() {
    var x = 5
    var y = 2.5
    var z = x + y
    println(z)
}
            </gc></pre>
            To make the above work, use the built-in <c>as_flt</c>- and <c>as_int</c>-procedures,
            which both take a number and turn it into a float and integer.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var x = 5
    var y = 2.5
    var z = as_flt(x) + y
    println(z)
}
            </gc></pre>
        `),

        page("Strings", `
            <h>Strings</h>
            <br><br>
            Strings of text may be created by simply writing your text inside
            of double quotes. Strings can reach across lines.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    println("Hello, world!")
}
            </gc></pre>
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
            <pre><gc>
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
            </gc></pre>
            <br><br>
            To get the length of a string, use the built-in <c>length</c>-procedure.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    println(length("Hello, Gera!"))
}
            </gc></pre> 
        `),

        page("Branching", `
            <h>Branching</h>
            <br><br>
            <c>case</c> may be used to create a branch in your program.
            <br>
            To simply check if some condition is met,
            use <c>case</c> followed by your condtion, <c>-></c> and the thing to do.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var owned_cats = 0 // play around with this value!
    case owned_cats == 0 -> {
        println("you should get a cat")
    }
}
            </gc></pre>
            <br><br>
            Use the <c>else</c>-keyword to chain conditions.
            <br>
            <pre><gc>
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
            </gc></pre>
            <br><br>
            <c>case</c> can also be used to make a decision based on some value,
            by putting a block after the value (instead of <c>-></c>)
            and listing each value and its action inside of the block.
            <br>
            <pre><gc>
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
            </gc></pre>
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
            <pre><gc>
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
            </gc></pre>
            <br><br>
            To get the value associated with a variant, you can use <c>case</c> to handle each possible variant.
            For this, simply write the variant name and optionally the name of the variable to put the value into.
            <br>
            <pre><gc>
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
            </gc></pre>
            <br><br>
            Variants may be compared with <c>==</c> and <c>!=</c>, which will check if both the tag
            (the variant name) and their values are equal. To only check if the tag is equal,
            the built-in <c>tag_eq</c>-procedure may be used.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    println((#a 5) == (#a 5))
    println((#a 5) == (#a 10))
    println(tag_eq(#a 5, #a 10))
    println(tag_eq(#a 5, #b 10))
}
            </gc></pre>
        `),

        page("Functions", `
            <h>Functions</h>
            <br><br>
            In contrast to procedures, functions in Gera are values, just like numbers, booleans or strings.
            <br>
            Functions are defined by a list of parameters in side of two <c>|</c>
            either directly followed by the resulting expression or a block of statements.
            <br>
            <pre><gc>
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
            </gc></pre>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var add = |x, y| x + y
    println(do_math(add, 5, 10))
}

proc do_math(op, a, b) {
    return op(a, b)
}
            </gc></pre>
            <br><br>
            Keep in mind that in contrast to procedures, which may be called with multiple different
            types as parameters for each call (as long as the type is valid), functions behave
            differently. A function can only accept one fixed type as a parameter, meaning
            the following works fine:
            <br>
            <pre><gc>
mod example

use std::io::println

proc add(x, y) {
    return x + y
}

proc main() {
    println(add(5, 10)) // this call to 'add' uses integers
    println(add(5.0, 10.0)) // this call to 'add' uses floats
}
            </gc></pre>
            But the following (using a function instead) is not valid:
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var add = |x, y| x + y
    println(add(5, 10)) // 'add' is now a function that adds two integers...
    println(add(5.0, 10.0)) // ...meaning we can't use it with floats.
}
            </gc></pre>
            <br><br>
            All defined procedures may be used as functions by simply specifying their name.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    apply(println, "Hello, world!")
}

proc apply(f, val) {
    return f(val)
}
            </gc></pre>
            <br><br>
            Functions in Gera can also capture values from their environment.
            Gera functions capture by value, meaning changes to the variable
            outside of the function after the function has been created
            won't apply to the variable inside of the function, and vice-versa.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    mut var x = 1
    var increment = |y| x + y
    x = 25
    println(increment(4))
}
            </gc></pre>
            <br><br>
            Functions may be compared using <c>==</c> and <c>!=</c>, which will check
            if both sides are the exact same instance of that function.
            <br>
            <pre><gc>
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
            </gc></pre>
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
            <pre><gc>
mod example

proc main() {
    var my_cat = {
        name = "Snowball",
        age = 5
    }
    var my_other_cat = my_cat
    // 'my_other_cat' and 'my_cat' refer to the same object!
}
            </gc></pre>
            <br><br>
            To access an object member, simply use the good old <c>.</c>-syntax.
            <br>
            <pre><gc>
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
            </gc></pre>
            <br><br>
            Objects may be compared using <c>==</c> and <c>!=</c>, in which case each of their
            members will be compared. To check if both are the exact same instance of an object,
            use the built-in <c>addr_eq</c>-procedure.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    println({ a = 5, b = 10 } == { a = 5, b = 10 })
    println({ a = 5, b = 10 } == { a = 5, b = 25 })
    println(addr_eq({ a = 5, b = 10 }, { a = 5, b = 10 }))
    var o = { a = 5, b = 10 }
    println(addr_eq(o, o))
}
            </gc></pre>
        `),

        page("Arrays", `
            <h>Arrays</h>
            <br><br>
            Just like objects, arrays in Gera are heap-allocated.
            You may create them by putting a list of values (of the same type) inside of <c>[...]</c>,
            or you may use the built-in <c>array</c>-procedure by creating an array of a given size from
            a given value.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    var yippie = array("yippie!", 10)
}
            </gc></pre>
            <br><br>
            To get an element from an array given a certain index, use the familiar bracket syntax.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    println(primes[0])
    println(primes[1])
    println(primes[2])
}
            </gc></pre>
            An invalid index will make the program panic at runtime.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    println(primes[10])
}
            </gc></pre>
            <br><br>
            To get the length of an array, use the built-in <c>length</c>-procedure.
            <br>
            <pre><gc>
mod example

use std::io::println

proc main() {
    var primes = [2, 3, 5, 7, 11]
    println(length(primes))
}
            </gc></pre>
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
            <pre><gc>
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
            </gc></pre>
        `),

        page("Piping", `
            <h>Piping</h>
            <br><br><br>
            <h>Procedure Call Piping with <c>|></c></h>
            <br><br>
            Deeply nested procedure calls can get pretty ugly fairly quickly.
            Gera provides syntactic sugar to help with this.
            <br>
            <c>x |> foo(y, z)</c> is the same as <c>foo(x, y, z)</c>.
            <br>
            This can be used to chain procedure calls, making things a lot easier to read.
            <br>
            <pre><gc>
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
            </gc></pre>
            <br><br>
            <h>Method Calls with <c>.></c></h>
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
            <pre><gc>
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
            </gc></pre>
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
            <pre><gc>
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
            </gc></pre>
            <br><br>
            Another context where values are evaluated at compilation time is the value of a global
            variable:
            <br>
            <pre><gc>
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
            </gc></pre>
            <br><br>
            If you wish for any specific expression in your program to be evaluated at compile time,
            you may use the <c>static</c>-keyword to achieve this.
            <br>
            <pre><gc>
mod example

proc fib(n) {
    case n <= 1 -> return n
    return fib(n - 1) + fib(n - 2)
}

use std::io::println

proc main() {
    println(static fib(30))
}
            </gc></pre>
            <pre><gc>
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
            </gc></pre>
        `),

        page("Conditional Compilation", `
            <h>Conditional Compilation</h>
            <br><br>
            The <c>target</c>-syntax allows you to only include a piece of code if the current
            compilation target format matches the one you specified.
            The standard library uses this to only include specific functions on the targets
            that support them.
            <br>
            <pre><gc>
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
            </gc></pre>
        `),

    ]),

    // page("External Mappings", `Todo!`),

    // page("The Core Module", "Todo!"),

    // pageList("The Standard Library", [
    //     page("Todo!", `Todo!`),
    // ]),

    page("Playground", `
        <pre><gc>
mod example

proc main() {
    std::io::println("Hello, world!")
}
        </gc></pre>
    `),
];