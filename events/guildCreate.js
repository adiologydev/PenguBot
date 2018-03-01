const { RichEmbed, WebhookClient } = require("discord.js");
const config = require("../config.json");
const moment = require("moment");
const hook = new WebhookClient("398069530167083008", config.WH.guild);

module.exports = async (client, guild) => {
    if (!guild.available) return;
    let channel = guild.channels.sort((a, b) => a.calculatedPosition - b.calculatedPosition)
        .find(c => c.type === "text" && c.permissionsFor(guild.me).has(19456));
    if (!channel) channel = await guild.fetchMember(guild.owner.user);
    const embed = new RichEmbed()
        .setColor("#1976D2")
        .setTimestamp()
        .setFooter("PenguBot Welcome Message")
        .setDescription(`**Thank you for inviting me to your server.**
Hey, I'm PenguBot a friendly multi-purpose bot, now that you know who I am let's start learning how to use PenguBot.

\`-\` **Core Commands:** \`p!help\` will list all commands that are usable to you, \`p!music\` will list all the music commands with details.
\`-\` **Useful Commands:** \`p!prefix\` will show the current prefix if no prefix is provided but you can do \`p!prefix new prefix\` to change the prefix.
\`-\` **Support:** In case you need any help you can also join the support server at [**discord.gg/u8WYw5r**](https://discord.gg/u8WYw5r).
\`-\` **Agreement:** By using PenguBot in your guild (Server) you and your guild members agree that PenguBot may collect End User Data.

\`-\` **Website:** [**PenguBot.cc**](https://www.PenguBot.cc)
\`-\` **Author:** [**AdityaTD#5346**](https://adityatd.me/)
\`-\` **Support Server:** [**discord.gg/u8WYw5r**](https://discord.gg/u8WYw5r)
`)
        .setThumbnail(client.user.displayAvatarURL);
    channel.send({ embed });
    const gcount = (await client.shard.fetchClientValues("guilds.size")).reduce((prev, val) => prev + val, 0);
    const guildlog = new RichEmbed()
        .setAuthor("Added To A New Guild - PenguBot", client.user.displayAvatarURL)
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
