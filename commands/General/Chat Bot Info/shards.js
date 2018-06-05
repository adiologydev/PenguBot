const { Command } = require("klasa");
const Table = require("cli-table-redemption");

const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
].join("|");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["shard"],
            description: msg => msg.language.get("COMMAND_SHARDS_DESCRIPTION")
        });
    }

    async run(msg) {
        const table = new Table({ head: ["Shard ID", "Status", "Latency", "Guilds", "Users", msg.guild ? "Current Shard" : null, "VCs"] });

        if (this.client.shard) {
            const results = await this.client.shard.broadcastEval(`[this.shard.id, this.status, this.ping, this.guilds.size, this.users.size, this.lavalink.size]`);
            for (const result of results) {
                switch (result[1]) {
                    case 0:
                        result[1] = "Listening";
                        break;
                    case 1:
                        result[1] = "Connecting...";
                        break;
                    case 2:
                        result[1] = "Reconnecting...";
                        break;
                    case 3:
                        result[1] = "Idle";
                        break;
                    default:
                        result[1] = "Unknown";
                }

                table.push([result[0], result[1], `${Math.round(result[2])}ms`, result[3].toLocaleString(), result[4].toLocaleString(), msg.guild ? this.client.shard.id === result[0] ? "Yeah" : "Nah" : null, result[5].toLocaleString()]);
            }
        }

        return msg.sendCode("", await this.stripAnsi(table.toString()));
    }

    async stripAnsi(text) {
        return text.replace(new RegExp(pattern, "g"), "");
    }

};
