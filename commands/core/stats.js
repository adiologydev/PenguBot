const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class StatsCMD extends Command {

    constructor(client) {
        super(client, {
            name: "stats",
            group: "core",
            aliases: ["statistics", "botinfo", "status"],
            memberName: "stats",
            description: "Get statistics about Pengu.",
            throttling: {
                usages: 1,
                duration: 10
            },
            usage: ["<prefix>stats"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const c = await this.client.shard.fetchClientValues("channels.size");
        const g = await this.client.shard.fetchClientValues("guilds.size");
        const u = await this.client.shard.fetchClientValues("users.size");
        const v = await this.client.shard.fetchClientValues("player.size");
        const m = await this.client.shard.broadcastEval(`(process.memoryUsage().heapUsed / 1024 / 1024)`);

        const channels = c.reduce((prev, val) => prev + val, 0);
        const num = g.reduce((prev, val) => prev + val, 0);
        const users = u.reduce((prev, val) => prev + val, 0);
        const voiceConnections = v.reduce((prev, val) => prev + val, 0);
        const mem = m.reduce((prev, val) => prev + val, 0).toFixed(2);

        const botstats = new Discord.RichEmbed()
            .setAuthor("Statistics - PenguBot", this.client.user.avatarURL)
            .setDescription("Detailed statistics about PenguBot on Discord and it's backend.")
            .setColor("RANDOM")
            .setFooter("© PenguBot", this.client.user.avatarURL)
            .setTimestamp()
            .addField("Guilds", num, true)
            .addField("Users", users, true)
            .addField("Memory Usage", `${mem} MB`, true)
            .addField("Lavalink Streams", voiceConnections, true)
            .addField("Channels", channels, true)
            .addField("Shards S/C", `${this.client.shard.id}/${this.client.shard.count}`, true)
            .addField("Invite Pengu", "[**bit.ly/PenguBotInvite**](https://bit.ly/PenguBotInvite)", true)
            .addField("GitHub", "[**AdityaTD/PenguBot**](https://www.github.com/AdityaTD/PenguBot)", true)
            .addField("Join PenguBot's Guild", "[**discord.gg/u8WYw5r**](https://discord.gg/u8WYw5r)", true);
        return msg.embed(botstats);
    }

};
