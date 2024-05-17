
const example_name = "fib.gera";
const example_body = `\
mod fib

/// Returns an infinite iterator over
/// the Fibonacci sequence.
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

use std::(iter::*, io::println)

proc main() = fib()
    |> take(10)
    |> for_each(println)`;

window.onload = () => {
    const name = document.getElementById("example-name");
    const body = document.getElementById("example-body");
    name.innerText = example_name;
    highlighting.add_onload(() => {
        body.innerHTML = highlighting.highlight(example_body, "source.gera")
            + "⠀";
    });
};