const { Command } = require("discord.js-commando");

module.exports = class PenguAdminCMD extends Command {

    constructor(client) {
        super(client, {
            name: "makeadmin",
            group: "moderation",
            aliases: ["pengubotadmin", "togglepenguadmin", "removeadmin"],
            memberName: "makeadmin",
            throttling: {
                usages: 1,
                duration: 3
            },
            description: "Gives or Takes Away A User's Pengu Admin Permissions.",
            usage: ["<prefix>makeadmin <user>"],
            guildOnly: true,
            args: [{
                key: "targetuser",
                prompt: "Who do you want to make a PenguAdmin?\n",
                type: "member"
            }]
        });
    }

    hasPermission(msg) {
    return msg.member.hasPermission('ADMINISTRATOR') || this.client.functions.IsDev(msg); // eslint-disable-line
    }

    async run(msg, args) { // eslint-disable-this-line
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (msg.guild.settings.get(`${args.targetuser.id}.admin`)) {
            msg.guild.settings.remove(`${args.targetuser.id}.admin`).then(() => {
                msg.say(`❌ **${args.targetuser}** is no longer a **PenguAdmin**. ❌`);
            }).catch(console.log);
        } else {
            msg.guild.settings.set(`${args.targetuser.id}.admin`, true).then(() => {
                msg.say(`✅ **${args.targetuser}** is now a **PenguAdmin**. ✅`);
            }).catch(console.log);
        }
    }

};
