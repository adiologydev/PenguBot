const PenguClient = require("./structures/PenguClient");
const config = require("./config.json");
const Raven = require("raven");
Raven.config(config.keys.sentry).install();

function startBot() {
    new PenguClient({
        prefix: ["p!", "P!"],
        commandEditing: true,
        disableEveryone: true,
        regexPrefix: new RegExp(/^((?:Hey |Ok )?Pengu(?:,|!| ))/i),
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
            "VOICE_SERVER_UPDATE"
        ],
        pieceDefaults: {
            commands: { deletable: true },
            rawEvents: { enabled: true }
        },
        providers: {
            default: "rethinkdb",
            rethinkdb: { db: "pengubot", servers: [{ host: config.database.host, port: config.database.port }] }
        },
        console: { useColor: true },
        presence: { activity: { name: "PenguBot.com | v2.0 | p!help", type: "WATCHING" } }
    }).login(config.main.token);
}

process.on("unhandledRejection", e => {
    console.log("Unhandled Rejection at:", e.stack || e);
    Raven.captureException(e);
});

process.on("uncaughtException", e => {
    console.log("Uncaught Exception at:", e.stack || e);
    Raven.captureException(e);
});

Raven.context(() => {
    startBot();
});
