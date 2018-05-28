const { Event, Timestamp } = require("klasa");
const { WebhookClient } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../config");

module.exports = class extends Event {

    constructor(...args) {
        super(...args);

        this.webhook = new WebhookClient("435500732507226112", config.webhooks.guildEvent);
        this.timestamp = new Timestamp("dddd, MMMM Do YYYY");
    }

    async run(guild) {
        // Sending Message After Bot Being Added
        if (!guild.available) return;
        let channel = guild.channels.sort((a, b) => a.calculatedPosition - b.calculatedPosition)
            .find(c => c.type === "text" && c.permissionsFor(guild.me).has(19456));
        if (!channel) channel = guild.owner ? guild.owner : await guild.members.fetch(guild.ownerID).catch(() => null);
        if (!channel.postable) return;

        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.avatarURL())
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(`**__Thank You For Inviting Me To Your Guild!__**
Hey! I'm PenguBot, a friendly multi-purpose Discord bot, now that you know who I am let's start learning how to use me.\n
• **Main Commands:** \`p!help\` will list all the commands that you can use.\n
• **Music Commands:** To see detailed music commands information do \`p!music\`\n
• **User Friendly:** If you're not aware of the guild's prefix just tag Pengu and type your command, i.e. \`@PenguBot#9722 pengu\`\n
• **Support:** In case you need any help you can also join our guild at [**discord.gg/u8WYw5r**](https://discord.gg/u8WYw5r).\n
• **Agreement:** By using PenguBot in your guild you and your guild members agree that PenguBot may collect End User Data.\n
• **Website:** [**PenguBot.cc**](https://www.PenguBot.cc)
• **Author:** [**AdityaTD#5346**](https://adityatd.me/)`);

        if (channel) await channel.send({ embed });

        // Logging New Guilds
        const gcount = (await this.client.shard.fetchClientValues("guilds.size")).reduce((prev, val) => prev + val, 0);
        const guildlog = new MessageEmbed()
            .setAuthor("Added to a New Guild - PenguBot", this.client.user.avatarURL())
            .setColor("#5cb85c")
            .setTimestamp()
            .setFooter(`Total Guilds Count: ${gcount}`)
            .setDescription(`• **Name (ID):** ${guild.name} (${guild.id})
• **Owner:** ${guild.owner.user.tag} (${guild.owner.user.id})
• **Members / Bots / Total:** ${guild.members.filter(m => !m.user.bot).size} / ${guild.members.filter(m => m.user.bot).size} / ${guild.memberCount}
• **Created At:** ${this.timestamp.display(guild.createdAT)}`);
        if (guild.iconURL()) guildlog.setThumbnail(guild.iconURL());
        await this.webhook.send({ embeds: [guildlog] });

        // Posting Stats for a new guild being added
        await this.client.functions.postStats(this.client);

        // Patreon Checker
        if (this.client.config.main.patreon === true) {
            if (!this.client.configs.pGuilds.includes(guild.id)) {
                const owner = guild.owner ? guild.owner : await guild.members.fetch(guild.ownerID).catch(() => null);
                if (owner) await guild.owner.send("<:penguError:435712890884849664> ***You may not add the Patreon Only bot to your guild, to become a Patreon visit: https://www.patreon.com/PenguBot. If you think this is a mistake and you already have Patreon, join our support guild and contact a staff member to gain your access: https://discord.gg/u8WYw5r***"); // eslint-disable-line
                await guild.leave();
            }
        }
    }

};
