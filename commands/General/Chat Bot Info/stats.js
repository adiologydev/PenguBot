const { Command, Duration } = require("klasa");
const { version: discordVersion, MessageEmbed } = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            description: msg => msg.language.get("COMMAND_STATS_DESCRIPTION")
        });
    }

    async run(msg) {
        let [users, guilds, channels, memory, vc] = [0, 0, 0, 0, 0];

        const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024), this.lavalink.size]`);
        for (const result of results) {
            users += result[0];
            guilds += result[1];
            channels += result[2];
            memory += result[3];
            vc += result[4];
        }

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/HE0ZOSA.png")
            .addField("Memory Usage", `${memory} MB`, true)
            .addField("Uptime", Duration.toNow(Date.now() - (process.uptime() * 1000)), true)
            .addField("Users", users.toLocaleString(), true)
            .addField("Guilds", guilds.toLocaleString(), true)
            .addField("Channels", channels.toLocaleString(), true)
            .addField("Voice Streams", vc.toLocaleString(), true)
            .addField("Discord Version", discordVersion, true)
            .addField("Shards", `${this.client.shard.id + 1} / ${this.client.shard.count}`, true)
            .setAuthor("PenguBot - Statistics", this.client.user.displayAvatarURL(), "https://www.pengubot.com");

        return msg.sendMessage({ embed });
    }

};
