const { Client } = require("klasa");
const { Client: IdioticAPI } = require("idiotic-api");
const permissionLevels = require("./PermissionLevels");

class PenguClient extends Client {

    constructor(options) {
        super({ ...options, permissionLevels });

        this.config = require("../config.json");
        this.functions = require("../utils/functions.js");
        this.lavalink = null;
        this.idiotic = new IdioticAPI(this.config.keys.idiotic, { dev: true });
        this.queue = new Map();
    }

}

module.exports = PenguClient;
