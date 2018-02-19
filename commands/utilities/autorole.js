const { Command } = require("discord.js-commando");

module.exports = class AutoRoleCMD extends Command {

    constructor(client) {
        super(client, {
            name: "autorole",
            group: "utilities",
            aliases: ["automaticrole", "welcomerole", "toggleautorole"],
            memberName: "autorole",
            guildOnly: true,
            description: "Give roles to the new people who join your guild.",
            usage: ["<prefix>autorole <role_name>"],
            args: [{
                key: "role",
                prompt: "Enter a role you want users to be given when they join.\n",
                type: "role"
            }]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { role }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (msg.guild.settings.get("autorole")) {
            msg.guild.settings.remove("autorole").then(() => {
                msg.reply(`❌ Disabled Auto Role for New Members. Do the command again to re-enable.`);
            }).catch(console.log);
        } else {
            msg.guild.settings.set("autorole", role.id).then(() => {
                msg.reply(`✅ Enabled Auto Role For New Members. Role: **${role.name}**`);
            }).catch(console.log);
        }
    }

};
