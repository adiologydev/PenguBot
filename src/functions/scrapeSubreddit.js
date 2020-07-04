const { util: { fetch, shuffleArray }, Function } = require("../index");
const mediaregex = /(http(s?):)([/|.|\w|\s|-])*\.(?:bmp|jpe?g|png|gif|webp|mp4|tiff|gif?v)(?:\?([^#]*))?(?:#(.*))?$/ig;

module.exports = class extends Function {

    async run(subreddit = "puppies") {
        const data = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?sort=top&t=day&limit=100`)
            .then(res => res.data)
            .catch(() => null);
        if (!data) throw "There was an issue with the tissue, try again!";
        const random = shuffleArray(data.children);
        for (const t of random) {
            if (mediaregex.test(t.data.url)) return t.data.url;
            else continue;
        }
    }

};
