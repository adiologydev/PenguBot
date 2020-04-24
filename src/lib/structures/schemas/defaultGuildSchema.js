/* eslint-disable no-inline-comments */
const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultGuildSchema

    // Logging
    .add("serverlogs", folder => folder
        .add("join", "boolean", { default: false })
        .add("leave", "boolean", { default: false })
        .add("moderation", "boolean", { default: false })
        .add("channels", "boolean", { default: false })
        .add("messages", "boolean", { default: false })
        .add("automod", "boolean", { default: false })
        .add("roles", "boolean", { default: false }))

    // Custom Commands
    .add("customcmds", "any", { array: true, configurable: false })

    // Starboard
    .add("starboard", folder => folder
        .add("channel", "textchannel")
        .add("required", "integer", { default: 3 }))

    // Inhibitors
    .add("disabledCommandsGroup", "string", { array: true, configurable: false })

    // Welcome & Leave
    .add("messages", folder => folder
        .add("leave", "string", { default: "It's sad to see you leave {USERNAME}, hope to see you again." })
        .add("join", "string", { default: "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!" }))

    // Automod
    .add("automod", folder => folder
        .add("perspective", filter => filter
            .add("TOXICITY", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("SEVERE_TOXICITY", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("THREAT", "any", { default: { enabled: true, threshold: 0.99 } })
            .add("SPAM", "any", { default: { enabled: true, threshold: 0.99 } })
            .add("OBSCENE", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("SEXUALLY_EXPLICIT", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("PROFANITY", "any", { default: { enabled: false, threshold: 0.99 } }))
        .add("invites", "boolean", { default: false }))

    // Patreon
    .add("patreon", folder => folder
        .add("premium", "boolean", { default: false, configurable: false })
        .add("patron", "user", { configurable: false }))

    // Misc
    .add("misc", folder => folder
        .add("leveluptype", "string", { default: "guild", configurable: false })
        .add("volume", "integer", { default: 100, max: 100, min: 0, configurable: false }))

    // Mod Logs
    .add("modlogs", "any", { array: true, configurable: false })

    // All Channels
    .add("channels", folder => folder
        .add("modlogs", "textchannel")
        .add("join", "textchannel")
        .add("leave", "textchannel")
        .add("logs", "textchannel"))

    // Toggles
    .add("toggles", folder => folder
        .add("joinmsg", "boolean", { default: true })
        .add("leavemsg", "boolean", { default: true })
        .add("autoroles", "boolean", { default: true })
        .add("perspective", "boolean", { default: false })
        .add("customcmds", "boolean", { default: true })
        .add("starboard", "boolean", { default: true })
        .add("levelroles", "boolean", { default: true })
        .add("modlogs", "boolean", { default: true })
        .add("djmode", "boolean", { default: false })
        .add("levelup", "boolean", { default: false })
        .add("staffbypass", "boolean", { default: true })
        .add("selfroles", "boolean", { default: true }))

    // Permissions
    .add("users", users => users
        .add("admin", "user", { array: true })
        .add("mod", "user", { array: true })
        .add("staff", "user", { array: true })
        .add("dj", "user", { array: true }))

    .add("roles", roles => roles
        .add("autorole", "role", { array: true })
        .add("selfrole", "role", { array: true })
        .add("levelrole", "any", { array: true, configurable: false })
        .add("admin", "role")
        .add("mod", "role")
        .add("staff", "role")
        .add("dj", "role")
        .add("muted", "role"));
