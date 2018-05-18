const { Command, Duration } = require("klasa");
const { version: discordVersion, MessageEmbed } = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            description: (msg) => msg.language.get("COMMAND_STATS_DESCRIPTION")
        });
    }

    async run(msg) {
        let [users, guilds, channels, memory, vc] = [0, 0, 0, 0, 0];

        if (this.client.shard) {
            const results = await this.client.shard.broadcastEval(`[this.users.size, this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024), this.lavalink.size]`);
            for (const result of results) {
                users += result[0];
                guilds += result[1];
                channels += result[2];
                memory += result[3];
                vc += result[4];
            }
        }

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/HE0ZOSA.png")
            .addField("Memory Usage", `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("Uptime", Duration.toNow(Date.now() - (process.uptime() * 1000)), true)
            .addField("Users", (users || this.client.users.size).toLocaleString(), true)
            .addField("Guilds", (guilds || this.client.guilds.size).toLocaleString(), true)
            .addField("Channels", (channels || this.client.channels.size).toLocaleString(), true)
            .addField("Voice Streams", (vc || this.client.lavalink.size).toLocaleString(), true)
            .addField("Discord Version", discordVersion, true)
            .addField("Shards", `${((msg.guild ? msg.guild.shardID : msg.channel.shardID) || this.client.options.shardId) + 1} / ${this.client.options.shardCount}`, true)
            .setAuthor("PenguBot - Statistics", this.client.user.displayAvatarURL(), "https://www.pengubot.com");

        return msg.sendMessage({ embed: embed });
    }

};
