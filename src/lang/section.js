
let window_load_handlers = [];

function on_window_load(callback) {
    if(document.readyState === "complete") {
        callback();
    } else {
        window_load_handlers.push(callback);
    }
}

window.onload = () => {
    for(const callback of window_load_handlers) {
        callback();
    }
};


const url_params = new URLSearchParams(window.location.search);
const topic_id = url_params.get("topic");
let topic = unknown_topic;
let topic_idx = -1;
for(let i = 0; i < topics.length; i += 1) {
    if(topics[i].id != topic_id) { continue; }
    topic = topics[i];
    topic_idx = i;
    break;
}
configure_page(topic, topic_idx);

function configure_page(topic, topic_idx) {
    const section_name = document.getElementById("section-name");
    section_name.innerText = topic.name;
    const section_body = document.getElementById("section-body");
    section_body.innerHTML = topic.body
        .split("<h>").join("<div class=\"subheading\">")
        .split("</h>").join("</div>")
        .split("<c>").join("<span class=\"codespan\">")
        .split("</c>").join("</span>")
        .split("<cb>").join("<div class=\"codeblock\">")
        .split("</cb>").join("</div>")
        .split("<gcb>").join("<div class=\"codeblock codeblock-gera\">")
        .split("</gcb>").join("</div>")
        .split("<ecb>").join("<div class=\"codeblock codeblock-gem\">")
        .split("</ecb>").join("</div>")
        .split("<ccb>").join("<div class=\"codeblock codeblock-c\">")
        .split("</ccb>").join("</div>");
    highlight_gera_blocks();
    const connections = document.createElement("div");
    connections.id = "connections";
    section_body.appendChild(connections);
    add_prev_button(connections, topic_idx);
    add_next_button(connections, topic_idx);
}

function highlight_gera_blocks() {
    for(const block of document.getElementsByClassName("codeblock-gera")) {
        on_window_load(() => {
            highlighting.add_onload(() => {
                block.innerHTML = highlighting.highlight(
                    block.innerText, "source.gera"
                );
            });
        });
    }
    for(const block of document.getElementsByClassName("codeblock-gem")) {
        on_window_load(() => {
            highlighting.add_onload(() => {
                block.innerHTML = highlighting.highlight(
                    block.innerText, "source.gem"
                );
            });
        });
    }
    for(const block of document.getElementsByClassName("codeblock-c")) {
        on_window_load(() => {
            highlighting.add_onload(() => {
                block.innerHTML = highlighting.highlight(
                    block.innerText, "source.c"
                );
            });
        });
    }
}

function add_prev_button(connections, topic_idx) {
    const prev = document.createElement("a");
    prev.id = "connection-prev";
    prev.classList.add("connection-link");
    const title = document.createElement("div");
    title.innerText = "Previous";
    prev.appendChild(title);
    const descr = document.createElement("span");
    prev.appendChild(descr);
    if(topic_idx > 0) {
        const prev_topic = topics[topic_idx - 1];
        descr.innerText = prev_topic.name;
        prev.href = `./section.html?topic=${prev_topic.id}`;
    } else if(topic_idx == 0) {
        descr.innerText = "Overview";
        prev.href = `./index.html`;
    }
    if(topic_idx >= 0) {
        connections.appendChild(prev);
    }
}

function add_next_button(connections, topic_idx) {
    const next = document.createElement("a");
    next.id = "connection-next";
    next.classList.add("connection-link");
    const title = document.createElement("div");
    title.innerText = "Next";
    next.appendChild(title);
    const descr = document.createElement("span");
    next.appendChild(descr);
    if(topic_idx >= 0 && topic_idx + 1 < topics.length) {
        const next_topic = topics[topic_idx + 1];
        descr.innerText = next_topic.name;
        next.href = `./section.html?topic=${next_topic.id}`;
    } else {
        descr.innerText = "Overview";
        next.href = `./index.html`;
    }
    connections.appendChild(next);
}