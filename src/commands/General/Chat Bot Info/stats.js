const { Command, Duration } = require("klasa");
const { MessageEmbed } = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            aliases: ["status"],
            description: language => language.get("COMMAND_STATS_DESCRIPTION")
        });
    }

    async run(msg) {
        let [users, guilds, channels, memory, vc, cpm, listeners] = [0, 0, 0, 0, 0, 0, 0];

        const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024), this.music.filter(music => music.playing).size, this.health.commands.cmdCount[59].count, this.music.filter(music => music.playing).map(music => music.voiceChannel.members.filter(mem => !mem.user.bot).size).reduce((prev, val) => prev + val, 0)]`);
        for (const result of results) {
            users += result[0];
            guilds += result[1];
            channels += result[2];
            memory += result[3];
            vc += result[4];
            cpm += result[5];
            listeners += result[6];
        }

        const shardID = msg.guild ? msg.guild.shardID + 1 : 1;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/HE0ZOSA.png")
            .addField("❯ Memory Usage", `${memory.toFixed(2)} MB`, true)
            .addField("❯ Uptime", Duration.toNow(Date.now() - (process.uptime() * 1000)), true)
            .addField("❯ Users", users.toLocaleString(), true)
            .addField("❯ Guilds", guilds.toLocaleString(), true)
            .addField("❯ Channels", channels.toLocaleString(), true)
            .addField("❯ Voice Streams", vc.toLocaleString(), true)
            .addField("❯ Total Commands Ran", this.client.settings.counter.total.toLocaleString(), true)
            .addField("❯ CPM", cpm, true)
            .addField("❯ Listeners", listeners, true)
            .addField("❯ Sharding", `**Cluster:** ${this.client.shard.id + 1} / ${this.client.shard.clusterCount} | **Shard:** ${shardID} / ${this.client.shard.shardCount}`, true)
            .setAuthor("PenguBot - Statistics", this.client.user.displayAvatarURL(), "https://www.pengubot.com");

        return msg.sendMessage({ embed });
    }

};
