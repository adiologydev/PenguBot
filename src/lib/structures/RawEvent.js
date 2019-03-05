const { Piece } = require("klasa");

class RawEvent extends Piece {

    constructor(client, store, file, core, options = {}) {
        super(client, store, file, core, options);
    }

}

module.exports = RawEvent;
