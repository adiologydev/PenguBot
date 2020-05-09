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
            port: 4000,
            prefix: "/"
        },
        messageSweepInterval: 480,
        messageCacheLifetime: 120,
        commandMessageLifetime: 120,
        owners: ["136549806079344640", "152386257568137216"]
    },
    shardCount: config.shards,
    ipcSocket: config.patreon ? 9545 : 9454,
    timeout: 60000
});

sharder.spawn();
