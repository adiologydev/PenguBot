const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultGuildSchema

    // Custom Commands
    .add("customcmds", folder => folder
        .add("cmds", "any", { array: true, configurable: false })
        .add("enabled", "boolean", { default: true }))

    // Inhibitors
    .add("disabledCommandsGroup", "string", { array: true, configurable: false })

    // Auto Roles
    .add("autoroles", folder => folder
        .add("roles", "role", { array: true })
        .add("enabled", "boolean", { default: true }))

    // Logging
    .add("loggingChannel", "textchannel")
    .add("logs", folder => folder
        .add("join", "boolean", { default: false })
        .add("leave", "boolean", { default: false })
        .add("channels", "boolean", { default: false })
        .add("messages", "boolean", { default: false })
        .add("roles", "boolean", { default: false }))

    // Starboard
    .add("starboard", folder => folder
        .add("enabled", "boolean", { default: true })
        .add("channel", "textchannel")
        .add("required", "integer", { default: 3 }))

    // Welcome & Leave
    .add("messages", folder => folder
        .add("leave", leave => leave
            .add("enabled", "boolean", { default: false })
            .add("channel", "textchannel")
            .add("message", "string", { default: "It's sad to see you leave {USERNAME}, hope to see you again." }))
        .add("welcome", welcome => welcome
            .add("enabled", "boolean", { default: false })
            .add("channel", "textchannel")
            .add("message", "string", { default: "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!" })))

    // Permissions
    .add("permissions", folder => folder
        .add("dj", "user", { array: true })
        .add("djRole", "role", { array: true })
        .add("admins", "user", { array: true })
        .add("adminsRole", "role", { array: true })
        .add("mods", "user", { array: true })
        .add("modsRole", "role", { array: true })
        .add("mutedRole", "role", { configurable: false }))

    // Automod
    .add("automod", folder => folder
        .add("enabled", "boolean", { default: false })
        .add("filters", filter => filter
            .add("TOXICITY", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("SEVERE_TOXICITY", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("THREAT", "any", { default: { enabled: true, threshold: 0.99 } })
            .add("SPAM", "any", { default: { enabled: true, threshold: 0.99 } })
            .add("OBSCENE", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("SEXUALLY_EXPLICIT", "any", { default: { enabled: false, threshold: 0.99 } })
            .add("PROFANITY", "any", { default: { enabled: false, threshold: 0.99 } }))
        .add("invites", "boolean", { default: false }))

    // Self Roles
    .add("selfroles", folder => folder
        .add("roles", "role", { array: true })
        .add("enabled", "boolean", { default: true }))

    // Level Roles
    .add("levelroles", folder => folder
        .add("roles", "any", { array: true, configurable: false })
        .add("enabled", "boolean", { default: true }))

    // Patreon
    .add("patreon", folder => folder
        .add("enabled", "boolean", { default: false, configurable: false })
        .add("patron", "user", { configurable: false }))

    // Misc
    .add("musicVolume", "integer", { default: 100, max: 100, min: 0 })
    .add("djOnly", "boolean", { default: false })
    .add("levelup", "boolean", { default: false })
    .add("leveltype", "string", { default: "guild", configurable: false })

    // Mod Logs
    .add("modlogs", folder => folder
        .add("logs", "any", { array: true, configurable: false })
        .add("logsEnabled", logs => logs
            .add("kick", "boolean", { default: true })
            .add("ban", "boolean", { default: true })
            .add("automod", "boolean", { default: true })
            .add("mute", "boolean", { default: true })))

    // All Channels
    .add("channels", folder => folder
        .add("modlogs", "textchannel")
        .add("starboard", "textchannel")
        .add("join", "textchannel")
        .add("leave", "textchannel")
        .add("logs", "textchannel"));
