const { WebhookClient, RichEmbed } = require("discord.js");
const config = require("../config.json");
const moment = require("moment");
const hook = new WebhookClient("398069530167083008", config.WH.guild);

module.exports = async (client, guild) => {
    if (!guild.available) return;
    const gcount = (await client.shard.fetchClientValues("guilds.size")).reduce((prev, val) => prev + val, 0);

    const guildlog = new RichEmbed()
        .setAuthor("Left a Guild - PenguBot", client.user.displayAvatarURL)
        .setColor(2)
        .setTimestamp()
        .setFooter(`Guild ID: ${guild.id} | Guild Count: ${gcount}`, client.user.displayAvatarURL)
        .setThumbnail(guild.iconURL)
        .addField("Name", guild.name, true)
        .addField("Owner", `${guild.owner.user.tag} (${guild.owner.user.id})`, true)
        .addField("Members/Bots/Total", `${guild.members.filter(m => !m.user.bot).size}/${guild.members.filter(m => m.user.bot).size}/${guild.memberCount}`, true)
        .addField("Created At", moment(guild.createdAT).format("dddd, MMMM Do YYYY "), true);
    hook.send({ embeds: [guildlog] });
    client.functions.updateServercount(client);
};
