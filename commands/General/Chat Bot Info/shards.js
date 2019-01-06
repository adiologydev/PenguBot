const { Command, Duration } = require("klasa");
const formatUptime = time => Duration.toNow(Date.now() - time);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            permissionLevel: 10,
            aliases: ["shard"],
            description: language => language.get("COMMAND_SHARDS_DESCRIPTION")
        });
    }

    async run(msg) {
        const evalstr = `[this.shard.id, this.guilds.size, this.channels.size, this.guilds.reduce((prev, val) => val.memberCount + prev, 0), (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2), this.lavalink.size, this.uptime]`;
        const result = await this.client.shard.broadcastEval(evalstr);

        const data = [];
        data.push(`\`\`\`prolog\n\n= Shards Information =\n`);
        data.push(`${"ID".padStart(3, " ").padEnd(3, " ")} | ${"Guilds".padStart(3, " ").padEnd(3, " ")} | ${"Channels".padStart(3, " ").padEnd(3, " ")} | ${"Users".padStart(6, " ").padEnd(7, " ")} | ${"Memory".padStart(4, " ").padEnd(4, " ")} | ${"Voice".padStart(3, " ").padEnd(3, " ")} | ${"Uptime".padStart(3, " ").padEnd(3, " ")}\n`);
        result.map(r => data.push(`${(r[0] + 1).toString().padStart(3, " ").padEnd(3, " ")} | ${r[1].toString().padStart(6, " ").padEnd(6, " ")} | ${r[2].toString().padStart(8, " ").padEnd(8, " ")} | ${r[3].toString().padStart(7, " ").padEnd(7, " ")} | ${r[4].toString().padStart(6, " ").padEnd(6, " ")} | ${r[5].toString().padStart(5, " ").padEnd(5, " ")} | ${formatUptime(r[6]).padStart(3, " ").padEnd(3, " ")}`));
        data.push(`\`\`\``);

        const paste = this.client.user.id === "303181184718995457" ? await this.client.funcs.haste(data) : data;

        return msg.sendMessage(paste);
    }

};
