const { MessageEmbed } = require("discord.js");

module.exports = (type, guild, message, title, avatar) => {
    if (!canPost(guild)) return null;
    if (!isEnabled(guild, type)) return null;

    switch (type) {
        case "ban": return generateEmbed(message, "#b71c1c");
        case "kick": return generateEmbed(message, "#b71c1c");
        case "mute": return generateEmbed(message, "#ff5252");
        case "join": return generateEmbed(message, "#2BBBAD");
        case "leave": return generateEmbed(message, "#2196f3");
        case "channels": return generateEmbed(message, "#33b5e5");
        case "messages": return generateEmbed(message, "#3F729B", title, avatar);
        case "roles": return generateEmbed(message, "#3949ab");
        default: return null;
    }
};

// Method which checks for basic permissions and requirements
const canPost = guild => {
    const channel = guild.configs.loggingChannel;
    if (!channel) return false;
    if (!guild.channels.get(channel).permissionsFor(guild.me).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"])) return false;
    return true;
};

// Check if the log type is enabled in the guild
const isEnabled = (guild, key) => guild.configs.get(`logs.${key}`);

// Create an embed with required fields
const generateEmbed = (message, color, title, avatar) => {
    const embed = new MessageEmbed()
        .setColor(color)
        .setTimestamp()
        .setDescription(message);
    if (title) embed.setAuthor(title, avatar);
    return embed;
};
