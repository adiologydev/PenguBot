const { Event } = require("klasa");
const { WebhookClient } = require("discord.js");
const moment = require("moment");
const config = require("../config");

const webhook = new WebhookClient("435500732507226112", config.webhooks.guildEvent);

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(guild) {
        // Sending Message After Bot Being Added
        if (!guild.available) return;
        let channel = guild.channels.sort((a, b) => a.calculatedPosition - b.calculatedPosition)
            .find(c => c.type === "text" && c.permissionsFor(guild.me).has(19456));
        if (!channel) channel = await guild.fetchMember(guild.owner.user);

        const embed = new this.client.methods.Embed()
            .setThumbnail(this.client.user.avatarURL())
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(`**__Thank You For Inviting Me To Your Guild!__**
Hey! I'm PenguBot, a friendly multi-purpose Discord bot, now that you know who I am let's start learning how to use me.\n
• **Main Commands:** \`p!help\` will list all the commands that you can use.
• **User Friendly:** If you're not of the guild's prefix just tag Pengu and type your command, i.e. \`@PenguBot#9722 pengu\`
• **Support:** In case you need any help you can also join our guild at [**discord.gg/u8WYw5r**](https://discord.gg/u8WYw5r).
• **Agreement:** By using PenguBot in your guild you and your guild members agree that PenguBot may collect End User Data.
• **Website:** [**PenguBot.cc**](https://www.PenguBot.cc)
• **Author:** [**AdityaTD#5346**](https://adityatd.me/)`);

        channel.sendEmbed(embed);

        // Logging New Guilds
        const gcount = (await this.client.shard.fetchClientValues("guilds.size")).reduce((prev, val) => prev + val, 0);
        const guildlog = new this.client.methods.Embed()
            .setAuthor("Added to a New Guild - PenguBot", this.client.user.avatarURL())
            .setColor("#5cb85c")
            .setTimestamp()
            .setFooter(`Total Guilds Count: ${gcount}`)
            .setThumbnail(guild.iconURL())
            .setDescription(`• **Name (ID):** ${guild.name} (${guild.id})
• **Owner:** ${guild.owner.user.tag} (${guild.owner.user.id})
• **Members / Bots / Total:** ${guild.members.filter(m => !m.user.bot).size} / ${guild.members.filter(m => m.user.bot).size} / ${guild.memberCount}
• **Created At:** ${moment(guild.createdAT).format("dddd, MMMM Do YYYY ")}`);

        webhook.send({ embeds: [guildlog] });

        // Posting Stats for a new guild being added
        this.client.functions.postStats(this.client);
    }

};
