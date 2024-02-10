
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
        <i>The documentation contains code examples like the above,
        which can be edited and executed right here in the browser.</i>
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

    pageList("<Work in progress, further pages will be added soon!>", []),
];