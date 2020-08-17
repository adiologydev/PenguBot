const { util: { fetch }, Function } = require("../index");

module.exports = class extends Function {

    async run(subreddit, options = { }) {
        let type;
        if (options.type) type = `/${options.type.toLowerCase()}`;
        const data = await fetch(`https://www.reddit.com/r/${subreddit}${type}/.json?limit=100`)
            .then(res => res.data)
            .catch(() => null);
        if (!data) throw "Houston we have a problem, please try again!";

        const random = data.children[Math.floor(Math.random() * data.children.length)];
        if (!random || !random.data) throw "Houston we have a problem, please try again!";

        return random.data;
    }

};
