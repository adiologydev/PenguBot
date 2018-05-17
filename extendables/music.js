const { Extendable } = require("klasa");

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: ["Guild"] });
    }

    extend() {
        return this.client.music.get(this.id) || this.client.music.add(this);
    }

};
