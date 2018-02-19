const { Command } = require("discord.js-commando");

module.exports = class UpdateCustomCMD extends Command {

    constructor(client) {
        super(client, {
            name: "updatecmd",
            group: "utilities",
            aliases: ["update", "updatec", "updatecustom", "updatecustomcommand"],
            memberName: "updatecmd",
            description: "Update an existing custom command with a new message.",
            usage: ["<prefix>addcmd <command trigger> <message to say on execution>"],
            guildOnly: true,
            args: [{
                key: "cmd",
                prompt: "What was your command name? Example: getsocial\n",
                type: "string"
            },
            {
                key: "newmsg",
                prompt: "What do you want Pengu to say instead of your old message?\n",
                type: "string"
            }]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { cmd, newmsg }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { guild } = msg;
        if (!guild.settings.get(`cmd.${cmd}`)) {
            return msg.reply("This command does not exist, please try a different name.");
        } else {
            await guild.settings.set(`cmd.${cmd}`, newmsg).then(() => msg.reply(`↩ Custom Command has been Updated ↩ \n\n**Command:** ${guild.commandPrefix}${cmd.replace("cmd.", "")}\n**New Message:** ${newmsg}`));
        }
    }

};
