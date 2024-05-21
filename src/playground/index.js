
function toggle_js_output(button) {
    const output = document.getElementById("js-output");
    output.hidden = !button.checked;
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
    stdout.innerText = "";
    const start_time = window.performance.now();
    const result = gerac.compile(
        ["playground.gera"], [input.value], "playground::main"
    )
    const end_time = window.performance.now();
    const taken_time = end_time - start_time;
    if(result.successful()) {
        console.log(`\x1b[90mCompiled successfully in ${taken_time}ms.\x1b[0m\n`);
        stdout.appendChild(document.createElement("hr"));
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
        console.error(`\x1b[90mCompilation failed after ${taken_time}ms.\x1b[0m\n`);
        stdout.appendChild(document.createElement("hr"));
        output.innerHTML = "<span class=\"console-ansi-90\">&lt;compilation failed&gt;</span>";
        console.error(result.value());
    }
}

window.onload = () => {
    toggle_js_output(document.getElementById("show_output_box"));
    const stdout = document.getElementById("cli-output-area");
    const console_out = console.log;
    const console_err = console.error;
    const print = (text) => {
        let i = 0;
        const sequence = [];
        while(i < text.length) {
            if(text[i] === "\u001b") {
                i += 2;
                const end = i + text.substring(i).search("m");
                const added = text.substring(i, end).split(";");
                if(added.length === 0) {
                    added.push("0");
                }
                for(const c of added) {
                    if(c === "0") {
                        sequence.splice(0, sequence.length);
                    } else {
                        sequence.push(c);
                    }
                }
                i = end + 1;
            }
            const start = i;
            while(i < text.length && text[i] !== "\x1b") {
                i += 1;
            }
            const section = document.createElement("span");
            section.innerText = text.substring(start, i);
            for(const c of sequence) {
                section.classList.add(`console-ansi-${c}`);
            }
            stdout.appendChild(section);
        }
        stdout.scrollTo({ top: stdout.scrollHeight });
    };
    console.log = (thing) => {
        console_out(thing);
        print(thing + "");
    };
    console.error = (thing) => {
        console_err(thing);
        print(thing + "");
    };
};