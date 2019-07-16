const { Extendable, Guild } = require("../index");

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, {
            appliesTo: [Guild],
            name: "Guild"
        });
    }

    get music() {
        return this.client.music.add(this);
    }

};
