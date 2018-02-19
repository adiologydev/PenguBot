const { exec } = require("child_process");
const { Command } = require("discord.js-commando");
module.exports = class ExecCommand extends Command {

    constructor(client) {
        super(client, {
            name: "exec",
            group: "core",
            memberName: "exec",
            description: "Executes a shell command.",
            aliases: ["sh", "bash", "su", "sudo"],
            guildOnly: false,
            args: [{
                key: "command",
                prompt: "What command would you like to execute?",
                type: "string"
            }]
        });
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    async run(msg, { command }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
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
