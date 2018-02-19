const { Command } = require("discord.js-commando");

module.exports = class AddCustomCMD extends Command {

    constructor(client) {
        super(client, {
            name: "addcmd",
            group: "utilities",
            aliases: ["addc", "createcustom", "createcustomcommand"],
            memberName: "addcmd",
            description: "Create a new custom command on your server.",
            usage: ["<prefix>addcmd <command trigger> <message to say on execution>"],
            guildOnly: true,
            args: [{
                key: "cmdname",
                prompt: "What should trigger your command? __Example: getsocial__\n",
                type: "string"
            },
            {
                key: "cmdmessage",
                prompt: "What message should Pengu say when your command is executed?\n",
                type: "string"
            }]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { cmdname, cmdmessage }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { guild } = msg;
        if (this.client.registry.commands.has(cmdname)) return msg.reply(`Thats already a built in command.`);
        if (guild.settings.get(`cmd.${cmdname}`)) return msg.reply(`This command already exists in Pengu's system, please try a different name.`);
        await guild.settings.set(`cmd.${cmdname}`, cmdmessage).then(() => {
            msg.reply(`✅ Customm Command has been created ✅\n\n**Command:** ${guild.commandPrefix + cmdname.replace("cmd.", "")}\n**Message:** ${cmdmessage}`);
        });
    }

};
