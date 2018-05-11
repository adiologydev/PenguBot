const { MessageEmbed } = require("discord.js");

module.exports = (type, guild, message) => {
    if (!canPost(guild)) return null;
    if (!isEnabled(guild, type)) return null;

    const embed = new MessageEmbed();
    if (type === "ban") {
        embed
            .setColor("#b71c1c")
            .setTimestamp()
            .setDescription(message);
        return embed;
    }
    if (type === "kick") {
        embed
            .setColor("#b71c1c")
            .setTimestamp()
            .setDescription(message);
        return embed;
    }
    if (type === "mute") {
        embed
            .setColor("#b71c1c")
            .setTimestamp()
            .setDescription(message);
        return embed;
    }
    if (type === "join") {
        embed
            .setColor("#2BBBAD")
            .setTimestamp()
            .setDescription(message);
        return embed;
    }
    if (type === "leave") {
        embed
            .setColor("#2196f3")
            .setTimestamp()
            .setDescription(message);
        return embed;
    }
    if (type === "channels") {
        embed
            .setColor("#33b5e5")
            .setTimestamp()
            .setDescription(message);
        return embed;
    }
    if (type === "message") {
        embed
            .setColor("#3F729B")
            .setTimestamp()
            .setDescription(message);
    }
    return null;
};

// Method which checks for basic permissions and requirements
const canPost = (guild) => {
    const channel = guild.configs.loggingChannel;
    if (!channel) return false;
    if (!guild.channels.get(channel).permissionsFor(guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"])) return false;
    return true;
};

const isEnabled = (guild, key) => guild.configs.get(`logs.${key}`);
