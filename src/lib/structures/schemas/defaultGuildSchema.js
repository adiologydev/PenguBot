/* eslint-disable no-inline-comments */
const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultGuildSchema

// DEPRECATED START -------------------

    // Auto Roles
    .add("autoroles", folder => folder // delete after transfer
        .add("roles", "role", { array: true })
        .add("enabled", "boolean", { default: true }))

    // Permissions - delete after transfer
    .add("permissions", folder => folder
        .add("dj", "user", { array: true })
        .add("djRole", "role", { array: true })
        .add("admins", "user", { array: true })
        .add("adminsRole", "role", { array: true })
        .add("mods", "user", { array: true })
        .add("modsRole", "role", { array: true })
        .add("mutedRole", "role", { configurable: false }))

    // Self Roles - NEW FOLDER
    .add("selfroles", folder => folder
        .add("roles", "role", { array: true })
        .add("enabled", "boolean", { default: true }))

    .add("loggingChannel", "textchannel") // delete after transfer
    .add("logsEnabled", logs => logs // delete after transfer
        .add("kick", "boolean", { default: true })
        .add("ban", "boolean", { default: true })
        .add("unban", "boolean", { default: true })
        .add("softban", "boolean", { default: true })
        .add("unmute", "boolean", { default: true })
        .add("automod", "boolean", { default: true })
        .add("mute", "boolean", { default: true }))

    // Level Roles
    .add("levelroles", folder => folder // delete after transfer
        .add("roles", "any", { array: true, configurable: false })
        .add("enabled", "boolean", { default: true }))

    .add("djOnly", "boolean", { default: false }) // delete after transfer
    .add("levelup", "boolean", { default: false }) // delete after transfer

// DEPRECATED END ---------------------

    // Logging
    .add("logs", folder => folder
        .add("join", "boolean", { default: false })
        .add("leave", "boolean", { default: false })
        .add("channels", "boolean", { default: false })
        .add("messages", "boolean", { default: false })
        .add("roles", "boolean", { default: false }))

    // Custom Commands
    .add("customcmds", folder => folder
        .add("cmds", "any", { array: true, configurable: false })
        .add("enabled", "boolean", { default: true })) // delete after transfer

    // Starboard
    .add("starboard", folder => folder
        .add("enabled", "boolean", { default: true }) // delete after transfer
        .add("channel", "textchannel")
        .add("required", "integer", { default: 3 }))

    // Inhibitors
    .add("disabledCommandsGroup", "string", { array: true, configurable: false })

    // Welcome & Leave
    .add("messages", folder => folder
        .add("leave", leave => leave
            .add("enabled", "boolean", { default: false }) // delete after transfer
            .add("channel", "textchannel") // delete after transfer
            .add("message", "string", { default: "It's sad to see you leave {USERNAME}, hope to see you again." }))
        .add("welcome", welcome => welcome
            .add("enabled", "boolean", { default: false }) // delete after transfer
            .add("channel", "textchannel") // delete after transfer
            .add("message", "string", { default: "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!" })))

    // Automod
    .add("automod", folder => folder
        .add("enabled", "boolean", { default: false }) // delete after transfer
        .add("filters", filter => filter
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
        .add("enabled", "boolean", { default: false, configurable: false })
        .add("patron", "user", { configurable: false }))

    // Misc
    .add("musicVolume", "integer", { default: 100, max: 100, min: 0 })
    .add("leveltype", "string", { default: "guild", configurable: false })

// New Schema Start -------

    // Mod Logs
    .add("modlogs", folder => folder
        .add("logs", "any", { array: true, configurable: false })
        .add("logsEnabled", logs => logs
            .add("warn", "boolean", { default: true })
            .add("kick", "boolean", { default: true })
            .add("ban", "boolean", { default: true })
            .add("unban", "boolean", { default: true })
            .add("softban", "boolean", { default: true })
            .add("unmute", "boolean", { default: true })
            .add("automod", "boolean", { default: true })
            .add("mute", "boolean", { default: true })))

    // All Channels
    .add("channels", folder => folder
        .add("modlogs", "textchannel")
        .add("join", "textchannel")
        .add("leave", "textchannel")
        .add("logs", "textchannel"))

    // Toggles
    .add("toggles", folder => folder
        .add("autorole", "boolean", { default: true })
        .add("perspective", "boolean", { default: true })
        .add("levelroles", "boolean", { default: true })
        .add("djmode", "boolean", { default: false })
        .add("levelup", "boolean", { default: false })
        .add("selfrole", "boolean", { default: true }))

    // Permissions
    .add("users", users => users
        .add("admin", "user", { array: true })
        .add("mod", "user", { array: true })
        .add("dj", "user", { array: true }))
    .add("roles", roles => roles
        .add("autorole", "role", { array: true })
        .add("selfrole", "role", { array: true })
        .add("leveledrole", "any", { array: true, configurable: false })
        .add("admin", "role")
        .add("mod", "role")
        .add("dj", "role")
        .add("muted", "role", { configurable: false }));
