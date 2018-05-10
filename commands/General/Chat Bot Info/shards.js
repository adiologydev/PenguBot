const { Command } = require("klasa");
const moment = require("moment");
require("moment-duration-format");

const formatUptime = time => moment.duration(time).format("D [days], H [hrs], m [mins], s [secs]");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            aliases: ["shard"],
            description: (msg) => msg.language.get("COMMAND_SHARDS_DESCRIPTION")
        });
    }

    async run(msg) {
        const evalstr = `[this.shard.id, this.guilds.size, this.channels.size, this.users.size, (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2), this.lavalink.size ,this.uptime]`;
        const result = await this.client.shard.broadcastEval(evalstr);
        return msg.sendMessage(`= Shards Information =\n\n${result.map(r => `${r[0]} : G ${r[1]}, C ${r[2]}, U ${r[3]}, M ${r[4]}, VC ${r[5]}, UP: ${formatUptime(r[6])}`).join("\n")}`, { code: "prolog" });
    }

};
