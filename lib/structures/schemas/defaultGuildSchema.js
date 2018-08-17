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
        .add("kick", "boolean", { default: false })
        .add("ban", "boolean", { default: false })
        .add("join", "boolean", { default: false })
        .add("leave", "boolean", { default: false })
        .add("channels", "boolean", { default: false })
        .add("messages", "boolean", { default: false })
        .add("roles", "boolean", { default: false })
        .add("mute", "boolean", { default: false }))

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
        .add("admins", "user", { array: true })
        .add("mods", "user", { array: true }))

    // Automod
    .add("automod", folder => folder
        .add("invites", "boolean", { default: false }))

    // Self Roles
    .add("selfroles", folder => folder
        .add("roles", "role", { array: true })
        .add("enabled", "boolean", { default: true }))

    // Misc
    .add("musicVolume", "integer", { default: 90, max: 100, min: 0 })
    .add("djOnly", "boolean", { default: false })
    .add("levelup", "boolean", { default: false });
