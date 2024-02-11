
import { createStarryNight } from 'https://esm.sh/@wooorm/starry-night@3?bundle';
import { toHtml } from "https://esm.sh/hast-util-to-html@9?bundle";
import sourceGera from './source.gera.js';
import sourceGem from './source.gem.js';

window.highlighting = {
    loaded: false,
    onload: [],
    add_onload: function(callback) {
        if(this.loaded) {
            callback();
            return;
        }
        this.onload.push(callback);
    },
    highlight: null
};

const starryNight = await createStarryNight([sourceGera, sourceGem]);

window.highlighting.highlight = (source, scope) => {
    const tree = starryNight.highlight(source, scope);
    return toHtml(tree).replaceAll("\n", "<br>");
}
window.highlighting.loaded = true;
for(const callback of window.highlighting.onload) {
    callback();
}
window.highlighting.onload = [];
