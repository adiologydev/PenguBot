const { Command } = require("discord.js-commando");

module.exports = class DelCustomCMD extends Command {

    constructor(client) {
        super(client, {
            name: "delcmd",
            group: "utilities",
            aliases: ["delc", "deletecustom", "deletecustomcommand"],
            memberName: "delcmd",
            description: "Deletes an existing custom command from your server.",
            usage: ["<prefix>delcmd <command trigger>"],
            guildOnly: true,
            args: [{
                key: "cmdname",
                prompt: "Which trigger executes your command? __Example: getsocial__\n",
                type: "string"
            }]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { cmdname }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { guild } = msg;
        if (!guild.settings.get(`cmd.${cmdname}`)) {
            msg.reply("This command doesn't exist in Pengu's belly, please try a different name.");
        } else {
            await guild.settings.remove(`cmd.${cmdname}`).then(() => {
                msg.reply(`❌ Customm Command has been removed ❌\n\n**Command:** ${guild.commandPrefix}${cmdname.replace("cmd.", "")}`);
            });
        }
    }

};
