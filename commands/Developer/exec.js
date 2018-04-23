const { Command } = require("klasa");
const { exec } = require("child_process");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            permLevel: 10,
            usage: "<str:string> [...]",
            usageDelim: " ",
            description: (msg) => msg.language.get("COMMAND_EXEC_DESCRIPTION")
        });
    }

    async run(msg, [...str]) {
        const command = str.join(" ");
        const m = await msg.reply(`Executing... ${command}`, { split: true });
        exec(command, async (err, stdout) => {
            if (err) return m.edit(err.message, { code: "sh" });
            if (stdout.length >= 1500) {
                const haste = await this.client.functions.haste(stdout, "bash");
                return m.edit(`📥 Exec was too long well here u go ${haste}`);
            }
            return m.edit(`📥 Input: Executed in: ${m.createdTimestamp - msg.createdTimestamp}ms\nOutput:\n\`\`\`sh\n${stdout}\`\`\``, { split: true });
        });
    }

};
