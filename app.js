const PenguClient = require("./lib/structures/PenguClient");
const config = require("./config.json");
const Raven = require("raven");

// Bot
function startBot() {
    new PenguClient({
        prefix: ["p!"],
        commandEditing: true,
        disableEveryone: true,
        regexPrefix: /^((?:Hey |Ok )?Pengu(?:,|!| )|P!|P! )/,
        ownerID: "136549806079344640",
        typing: true,
        disabledEvents: [
            "GUILD_SYNC",
            "CHANNEL_PINS_UPDATE",
            "USER_NOTE_UPDATE",
            "RELATIONSHIP_ADD",
            "RELATIONSHIP_REMOVE",
            "USER_SETTINGS_UPDATE",
            "VOICE_STATE_UPDATE",
            "VOICE_SERVER_UPDATE",
            "TYPING_START",
            "PRESENCE_UPDATE"
        ],
        pieceDefaults: {
            commands: { deletable: true, quotedStringSupport: true },
            rawEvents: { enabled: true }
        },
        providers: {
            default: "rethinkdb",
            rethinkdb: { db: "pengubot", servers: [{ host: config.database.host, port: config.database.port }] }
        },
        console: { useColor: true },
        production: config.main.production,
        presence: { activity: { name: "PenguBot.com | v2.0 | p!help", type: "WATCHING" } }
    }).login(config.main.token);
}

// Raven
Raven.config(config.keys.sentry).install();

process.on("unhandledRejection", e => {
    console.log("Unhandled Rejection at:", e.stack || e);
    Raven.captureException(e);
});
