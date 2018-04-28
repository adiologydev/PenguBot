const { RichEmbed } = require("discord.js");

const ban = (client, banner, banee, reason) => {
    if (!canPost(client, banner.guild, "ban")) return;
    const channel = banner.guild.configs.logChannel;
    const embed = new RichEmbed()
        .setColor("#1C2331")
        .setDescription(`⏫ | **${banee.tag}** (${banee.id}) was **Banned** for \`${reason}\`\n\nBanned By: ${banner}`);
    return channel.sendEmbed(embed);
};

const softban = (client, banner, banee, reason) => {
    if (!canPost(client, banner.guild, "ban")) return;
    const channel = banner.guild.configs.logChannel;
    const embed = new RichEmbed()
        .setColor("#1C2331")
        .setDescription(`⏫ | **${banee.tag}** (${banee.id}) was **Soft Banned** for \`${reason}\`\n\nBanned By: ${banner}`);
    return channel.sendEmbed(embed);
};

const kick = (client, kicker, kickee, reason) => {
    if (!canPost(client, kicker.guild, "kick")) return;
    const channel = kicker.guild.configs.logChannel;
    const embed = new RichEmbed()
        .setColor("#3F729B")
        .setDescription(`⏫ | **${kickee.tag}** (${kickee.id}) was **Kicked** for \`${reason}\`\n\nBanned By: ${kicker}`);
    return channel.sendEmbed(embed);
};

// Method which checks for basic permissions and requirements
const canPost = (client, guild, key) => {
    if (!guild.configs.get(`logs.${key}`)) return false;
    const channel = guild.configs.logChannel;
    if (!channel) return false;
    if (channel.permissionsFor(client.user).missing(19456)) return false;
    return true;
};

module.exports.ban = ban;
module.exports.softban = softban;
module.exports.kick = kick;
