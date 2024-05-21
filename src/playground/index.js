
function toggle_js_output(button) {
    const output = document.getElementById("js-output");
    output.hidden = !output.hidden;
    if(!output.hidden) {
        button.innerText = "Hide Compiler Output";
    } else {
        button.innerText = "Show Compiler Output";
    }
}

function filter_displayed_output(output) {
    const lines = output.split("\n");
    const out_lines = [];
    for(let lineI = 0; lineI < lines.length; lineI += 1) {
        const line = lines[lineI];
        const is_builtin = line.startsWith("function gera___")
            || line.startsWith("const gera___");
        if(is_builtin) {
            lineI += 1;
            while(!lines[lineI].startsWith("}")) {
                lineI += 1;
            }
        } else {
            const skipped = line.trim().length === 0
                && out_lines.length > 0
                && out_lines.at(-1).trim().length === 0;
            if(!skipped) {
                out_lines.push(line);
            }
        }
    }
    return out_lines.join("\n");
}

function run_input() {
    const input = document.getElementById("gera-input-area");
    const output = document.getElementById("js-output-area");
    const stdout = document.getElementById("cli-output-area");
    const result = gerac.compile(
        ["playground.gera"], [input.value], "playground::main"
    )
    stdout.innerText = "";
    if(result.successful()) {
        const displayed_output = filter_displayed_output(result.value());
        output.innerText = displayed_output;
        highlighting.add_onload(() => {
            output.innerHTML = highlighting
                .highlight(displayed_output, "source.js");
        });
        try {
            eval(result.value());
        } catch(e) {
            console.error(e);
            throw e;    
        }
    } else {
        output.innerText = "[no output]";
        console.error(result.value());
    }
}

window.onload = () => {
    const stdout = document.getElementById("cli-output-area");
    const console_out = console.log;
    const console_err = console.error;
    console.log = (thing) => {
        console_out(thing);
        stdout.innerText += thing;
    };
    console.error = (thing) => {
        console_err(thing);
        stdout.innerText += thing;
    };
};