
const compiler = {
    loaded: false
};

function load_compiler() {
    import("./pkg/gerac_js.js").then((compiler_link) => {
        compiler_link.default().then(() => {
            compiler.compile = compiler_link.compile_to_js;
            compiler.loaded = true;
        });
    });
}

const stdlib = {
    loaded: false,
    files: [],
    linked_js: ""
};

function load_stdlib() {
    let loading_js_files = 0;
    const is_done = () => {
        for(const f of stdlib.files) {
            if(f.content === null) { return false; }
        }
        return loading_js_files === 0;
    };
    fetch("./std_gera_files.txt").then(r => r.text()).then(file_list_file => {
        for(const file_name of file_list_file.split("\n")) {
            if(file_name.length === 0) { continue; }
            const file_path = "./std/src/" + file_name;
            const file = { name: file_path, content: null };
            stdlib.files.push(file);
            fetch(file_path).then(r => r.text()).then(content => {
                file.content = content;
                if(is_done()) { stdlib.loaded = true; }
            });
        }
    });
    fetch("./std_js_files.txt").then(r => r.text()).then(file_list_file => {
        for(const file_name of file_list_file.split("\n")) {
            if(file_name.length === 0) { continue; }
            const file_path = "./std/src-js/" + file_name;
            loading_js_files += 1;
            fetch(file_path).then(r => r.text()).then(content => {
                stdlib.linked_js += content + "\n";
                loading_js_files -= 1;
                if(is_done()) { stdlib.loaded = true; }
            });
        }
    });
}