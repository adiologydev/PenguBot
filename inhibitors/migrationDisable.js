const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

    async run(msg) {
        return msg.author.id !== "136549806079344640";
    }

};
