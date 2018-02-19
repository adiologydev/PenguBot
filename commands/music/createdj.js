const { Command } = require("discord.js-commando");

module.exports = class CreateDJRoleCMD extends Command {

    constructor(client) {
        super(client, {
            name: "createdj",
            group: "music",
            aliases: ["createdjrole"],
            memberName: "createdj",
            throttling: {
                usages: 1,
                duration: 3
            },
            description: "Creates a DJ Role so DJ's can stop, pause, resume, control volume & skip songs.",
            usage: ["<prefix>createdj"],
            guildOnly: true
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS") || this.client.options.owner === msg.author.id || this.client.functions.isAdmin(msg);
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const botMember = await msg.guild.fetchMember(this.client.user);
        if (!botMember.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
            return msg.reply("I do not have the `Manage Roles` permission. Can you grant me it before doing this command please?");
        } else if (msg.guild.roles.find("name", "DJPengu-Bot")) {
            msg.reply("I know you love me but my DJ Role is already on this server.");
        } else {
            await msg.guild.createRole({ name: "DJPengu-Bot" }).then(() => {
                msg.reply("Successfully created DJ Pengu Role! Assign this role to people who you want and they'll be able to Stop Music, Skip Music, Set Volume, etc.");
            });
        }
    }

};
