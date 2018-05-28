const { Event, Timestamp } = require("klasa");
const { WebhookClient } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../config");

module.exports = class extends Event {

    constructor(...args) {
        super(...args);

        this.weebhook = new WebhookClient("435500732507226112", config.webhooks.guildEvent);
        this.timestamp = new Timestamp("dddd, MMMM Do YYYY");
    }

    async run(guild) {
        const gcount = (await this.client.shard.fetchClientValues("guilds.size")).reduce((prev, val) => prev + val, 0);
        const guildlog = new MessageEmbed()
            .setAuthor("Left a Guild - PenguBot", this.client.user.avatarURL())
            .setColor("#d9534f")
            .setTimestamp()
            .setFooter(`Total Guilds Count: ${gcount}`)
            .setDescription(`• **Name (ID):** ${guild.name} (${guild.id})
• **Owner:** ${guild.owner.user.tag} (${guild.owner.user.id})
• **Members / Bots / Total:** ${guild.members.filter(m => !m.user.bot).size} / ${guild.members.filter(m => m.user.bot).size} / ${guild.memberCount}
• **Created At:** ${this.timestamp.display(guild.createdAT)}`);
        if (guild.iconURL()) guildlog.setThumbnail(guild.iconURL());
        await this.webhook.send({ embeds: [guildlog] });
    }

};
