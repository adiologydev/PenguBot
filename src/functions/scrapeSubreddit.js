const { util: { fetch }, Function } = require("../index");

module.exports = class extends Function {

    async run(subreddit) {
        const data = await fetch(`https://www.reddit.com/r/${subreddit}/.json?limit=100`)
            .then(res => res.data)
            .catch(() => null);
        if (!data) throw "There was an issue with the tissue, try again!";

        const random = data.children[Math.floor(Math.random() * data.children.length)];
        return random.data.url;
    }

};
