const { Command, Duration } = require("klasa");
const { MessageEmbed } = require("discord.js");
const formatUptime = time => Duration.toNow(Date.now() - time);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            aliases: ["shard"],
            description: language => language.get("COMMAND_SHARDS_DESCRIPTION")
        });
    }

    async run(msg) {
        const evalstr = `[this.shard.id, this.guilds.size, this.channels.size, this.guilds.reduce((prev, val) => val.memberCount + prev, 0), (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2), this.lavalink.size, this.uptime]`;
        const result = await this.client.shard.broadcastEval(evalstr);

        const embed = new MessageEmbed()
            .setAuthor("PenguBot - Shards Information", this.client.user.displayAvatarURL())
            .setTimestamp();

        result.map(r => embed.addField(`Shard ${r[0] + 1}`, `**Guilds:** ${r[1]}\n**Channels:** ${r[2]}\n**Users:** ${r[3]}\n**Memory:** ${r[4]}\n**Voice:** ${r[5]}\n**Uptime:** ${formatUptime(r[6])}`));

        return msg.sendMessage(embed);
    }

};
