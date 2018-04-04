const { Client } = require("klasa");

class PenguClient extends Client {

    constructor(options) { //eslint-disable-line
        super(options);
        this.config = require("../config.json");
        this.functions = require("../utils/functions.js");
    }

}

const client = new PenguClient({
    clientOptions: {
        fetchAllMembers: false,
        ownerID: "136549806079344640"
    },
    prefix: "p!",
    cmdEditing: true,
    typing: true,
    provider: { default: "mongodb" },
    gateways: {
        guilds: { provider: "mongodb" },
        users: { provider: "mongodb" }
    },
    readyMessage: (c) => `${c.user.tag}, Ready to serve ${c.guilds.size} guilds and ${c.users.size} users.`
});

module.exports = client;
