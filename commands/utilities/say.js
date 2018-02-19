const { Command } = require("discord.js-commando");

module.exports = class SayCMD extends Command {

    constructor(client) {
        super(client, {
            name: "say",
            group: "utilities",
            memberName: "say",
            description: "Make Pengu say anything.",
            usage: ["<prefix>say <some text>"],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "saymsg",
                prompt: "What do you want Pengu to say?\n",
                type: "string"
            }],
            guildOnly: true
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, args) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        msg.delete();
        return msg.say(args.saymsg);
    }

};
