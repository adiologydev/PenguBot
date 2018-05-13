const { Extendable } = require("klasa");

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: ["Guild"] });
    }

    get extend() {
        return this.client.lavalink.get(this.id) || null;
    }

};
