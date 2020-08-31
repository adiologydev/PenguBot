const { ShardingManager } = require("kurasuta");
const { join } = require("path");
const config = require("../config.js");
const PenguClient = require("./lib/structures/PenguClient");

const status = config.patreon ? "💟 Thanks For Supporting - PenguBot.com - p!help" : "❤ p!donate for PenguBot Premium Access ➖ p!help | PenguBot.com";

const sharder = new ShardingManager(join(__dirname, "PenguBot"), {
    token: config.token,
    client: PenguClient,
    clientOptions: {
        prefix: "p!",
        commandEditing: true,
        disableEveryone: true,
        regexPrefix: /^((?:Hey |Ok )?Pengu(?:,|!| ))/i,
        typing: false,
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
            commands: { deletable: true, quotedStringSupport: true, bucket: 2 },
            rawEvents: { enabled: true }
        },
        providers: {
            default: "rethinkdb",
            rethinkdb: config.database
        },
        console: { useColor: true },
        production: config.production,
        presence: { activity: { name: status, type: "PLAYING" } },
        prefixCaseInsensitive: true,
        noPrefixDM: true,
        aliasFunctions: { returnMethod: "run", enabled: true, prefix: "funcs" },
        api: {
            port: 2006,
            prefix: "/"
        },
        messageSweepInterval: 480,
        messageCacheLifetime: 120,
        commandMessageLifetime: 120,
        owners: ["136549806079344640"],
        music: { nodes: config.nodes, lyrics: config.apis.lyrics, spotify: { buffer: config.apis.spotify, token: "" } }
    },
    shardCount: config.shards,
    ipcSocket: config.patreon ? 12168 : 12169,
    timeout: 60000
});

sharder.spawn()
    .catch(console.error);
