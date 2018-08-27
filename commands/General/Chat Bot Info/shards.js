const { Command, Duration } = require("klasa");
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

        const data = [];
        data.push(`\`\`\`prolog\n\n= Shards Information =\n`)
        data.push(`${"ID".padStart(3, " ").padEnd(3, " ")} | ${"Guilds".padStart(3, " ").padEnd(3, " ")} | ${"Channels".padStart(3, " ").padEnd(3, " ")} | ${"Users".padStart(3, " ").padEnd(3, " ")} | ${"Memory".padStart(3, " ").padEnd(3, " ")} | ${"Voice".padStart(3, " ").padEnd(3, " ")} | ${"Uptime".padStart(3, " ").padEnd(3, " ")}\n`);
        result.map(r => data.push(`${(r[0]+1).toString().padStart(3, " ").padEnd(3, " ")} | ${r[1].toString().padStart(3, " ").padEnd(3, " ")} | ${r[2].toString().padStart(3, " ").padEnd(3, " ")} | ${r[3].toString().padStart(3, " ").padEnd(3, " ")} | ${r[4].toString().padStart(3, " ").padEnd(3, " ")} | ${r[5].toString().padStart(3, " ").padEnd(3, " ")} | ${formatUptime(r[6]).padStart(3, " ").padEnd(3, " ")}`));
        data.push(`\`\`\``);

        return msg.sendMessage(data.join("\n"));
    }

};
