const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultUserSchema

    // Profiles
    .add("daily", "integer", { default: 0, configurable: false })
    .add("xp", "integer", { default: 0, configurable: false })
    .add("snowflakes", "integer", { default: 0, configurable: false })
    .add("level", "integer", { default: 0, configurable: false })
    .add("profilebg", "string", { default: "default", configurable: false })
    .add("backgrounds", "string", { default: ["default"], array: true, configurable: false })
    .add("reps", "integer", { default: 0, configurable: false })
    .add("repcooldown", "integer", { default: 0, configurable: false })
    .add("title", "string", { default: "No Title Set", configurable: false, min: 1, max: 30 })
    .add("lastUpvote", "integer", { default: 0, configurable: false })

    // AFK
    .add("afk", folder => folder
        .add("afk", "boolean", { default: false, configurable: false })
        .add("reason", "string", { configurable: false }))

    // Patreon
    .add("patreon", folder => folder
        .add("paying", "boolean", { default: false, configurable: false })
        .add("guilds", "guild", { array: true, configurable: false })
        .add("pledged", "integer", { default: 0, configurable: false })
        .add("tokens", "integer", { default: 0, configurable: false }));

