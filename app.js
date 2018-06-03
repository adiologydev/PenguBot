const PenguClient = require("./structures/PenguClient");
const config = require("./config.json");

new PenguClient({
    presence: { activity: { name: "PenguBot.cc | v2.0 | p!help", type: "WATCHING" } },
    prefix: "p!",
    commandEditing: true,
    disableEveryone: true,
    typing: true,
    providers: {
        default: "rethinkdb",
        rethinkdb: { db: "pengubot", timeout: 100 }
    },
    disabledEvents: [
        "GUILD_SYNC",
        "CHANNEL_PINS_UPDATE",
        "USER_NOTE_UPDATE",
        "RELATIONSHIP_ADD",
        "RELATIONSHIP_REMOVE",
        "USER_SETTINGS_UPDATE"],
    readyMessage: c => `${c.user.tag}, Ready to serve ${c.guilds.size} guilds and ${c.users.size} users.`
}).login(config.main.token);
