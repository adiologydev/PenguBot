const { Function } = require("@kcp/functions");
const { util: { fetch } } = require("../index");

module.exports = class extends Function {

    run(subreddit) {
        subreddit = typeof subreddit === "string" && subreddit.length !== 0 ? subreddit : "puppies";
        return fetch(`https://imgur.com/r/${subreddit}/hot.json`)
            .then(res => {
                if (!res.data) return;
                const img = res.data[Math.floor(Math.random() * res.data.length)];
                if (!img) return null;
                return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
            });
    }

};
