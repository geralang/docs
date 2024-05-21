
window.onload = () => {
    const topics_c = document.getElementById("topics");

    for(const topic of topics) {
        const a = document.createElement("a");
        a.href = `./section.html?topic=${topic.id}`;
        a.innerText = topic.name;
        topics_c.appendChild(a);
        topics_c.appendChild(document.createElement("br"));
    }
};