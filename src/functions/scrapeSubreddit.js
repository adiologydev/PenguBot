const { util: { fetch }, Function } = require("../index");

module.exports = class extends Function {

    run(subreddit = "puppies") {
        return fetch(`https://imgur.com/r/${subreddit}/hot.json`)
            .then(res => {
                if (!res.data) return;
                const img = res.data[Math.floor(Math.random() * res.data.length)];
                if (!img) return null;
                return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
            });
    }

};
