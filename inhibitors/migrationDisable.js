const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: false });
    }

    run(msg) {
        throw msg.author.id !== "136549806079344640";
    }

};
