const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg) {
        if (msg.author.id !== "136549806079344640") throw true;
    }

};
