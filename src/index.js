
let navigatorVisible = true;
function toggleNavigator() {
    navigatorVisible = !navigatorVisible;
    const navigator = document.getElementById("navigator");
    if(navigatorVisible) {
        navigator.style.marginLeft = "0px";
    } else {
        navigator.style.marginLeft = `-${navigator.offsetWidth}px`;
    }
}

function loadNavigatorPages() {
    const navigatorContent = document.getElementById("navigator-content");
    const displayPageList = pages => {
        const list = document.createElement("ol");
        for(let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
            const page = pages[pageIndex];
            const item = document.createElement("li");
            const anchor = document.createElement("pages" in page? "span" : "a");
            anchor.innerText = page.name;
            item.appendChild(anchor);
            if("pages" in page) {
                item.appendChild(displayPageList(page.pages));
            } else {
                anchor.onclick = () => {
                    loadPage(page.body);
                };
            }
            list.appendChild(item);   
        }
        return list;
    }; 
    navigatorContent.appendChild(displayPageList(pages));
    loadPage(pages[0].body);
}

function renderReader() {
    let currentOutput = null;
    const replacements = {
        h: h => {
            const heading = document.createElement("span");
            heading.classList.add("heading");
            heading.innerHTML = h.innerHTML;
            return heading;
        },
        c: c => {
            const codespan = document.createElement("span");
            codespan.classList.add("codespan");
            codespan.innerHTML = c.innerHTML;
            return codespan;
        },
        gc: gc => {
            const playground = document.createElement("div");
            playground.classList.add("playground");
            const editors = [];
            for(const definedEditor of gc.children) {
                const highlightingScope = definedEditor.getAttribute("hls");
                const editorWrapper = document.createElement("div");
                editorWrapper.classList.add("playground-editor-wrapper");
                const editor = document.createElement("textarea");
                editor.value = definedEditor.innerText.trim();
                editor.classList.add("playground-editor");
                const resizeEditor = () => {
                    editor.style.height = "2px";
                    editor.style.height = `${editor.scrollHeight}px`;
                };
                setTimeout(resizeEditor, 10);
                editor.setAttribute("spellcheck", false);
                const highlighted = document.createElement("div");
                highlighted.classList.add("playground-editor-highlighted");
                const highlight = () => highlighting.add_onload(() => {
                    highlighted.innerHTML = highlighting.highlight(editor.value, highlightingScope)
                        + "⠀"; // braille pattern blank - hack to make trailing <br> appear
                });
                editor.oninput = () => {
                    resizeEditor();
                    highlight();
                };
                highlight();
                editorWrapper.appendChild(highlighted);
                editorWrapper.appendChild(editor);
                playground.appendChild(editorWrapper);
                editors.push({
                    input: editor,
                    ext: definedEditor.getAttribute("ext")
                });
            }
            const output = document.createElement("div");
            const runButton = document.createElement("button");
            runButton.classList.add("playground-run-button");
            runButton.innerText = "Run";
            runButton.onclick = () => {
                output.innerHTML = "";
                if(!compiler.loaded || !stdlib.loaded) {
                    output.innerText = "The compiler has not yet been loaded!"
                        + " Please wait a moment and try again.";
                    return;
                }
                let files = [];
                files.push(...stdlib.files);
                for(let editorIdx = 0; editorIdx < editors.length; editorIdx += 1) {
                    const editor = editors[editorIdx];
                    files.push({
                        name: `playground${editorIdx}.${editor.ext}`,
                        content: editor.input.value
                    });
                }
                const result = compiler.compile(files, gc.getAttribute("main"));
                currentOutput = output;
                if(result.success) {
                    try {
                        eval(stdlib.linked_js + result.content);
                    } catch(e) {
                        console.error(e);
                    }
                } else {
                    console.error(result.content);
                }
            };
            playground.appendChild(runButton);
            output.classList.add("playground-output");
            const oldstdout = console.log;
            console.log = thing => {
                oldstdout(thing);
                if(output !== currentOutput) { return; }
                const item = document.createElement("span");
                item.innerText = `${thing}`;
                output.appendChild(item);
                output.appendChild(document.createElement("br"));
                output.scrollTo({ top: output.scrollHeight, behavior: 'smooth' });
            };
            const oldstderr = console.error;
            console.error = thing => {
                oldstderr(thing);
                if(output !== currentOutput) { return; }
                const item = document.createElement("span");
                item.classList.add("playground-output-error");
                item.innerText = `${thing}`;
                output.appendChild(item);
                output.appendChild(document.createElement("br"));
                output.scrollTo({ top: output.scrollHeight, behavior: 'smooth' });
            };
            playground.appendChild(output);
            return playground;
        }
    }
    const update = () => {
        for(const tagName in replacements) {
            for(const element of document.getElementsByTagName(tagName)) {
                element.replaceWith(replacements[tagName](element));
            }
        }
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

function loadPage(content) {
    const reader = document.getElementById("reader");
    reader.innerHTML = content;
}

load_compiler();
load_stdlib();

window.onload = () => {
    const navigator = document.getElementById("navigator");
    if(document.body.offsetWidth <= document.body.offsetHeight) {
        navigator.style.position = "absolute";
        navigator.style.zIndex = 1;
        toggleNavigator();
    }
    setTimeout(() => {
        navigator.style.transition = "margin-left 0.25s ease-in-out";
    }, 10);
    loadNavigatorPages();
    renderReader();
};