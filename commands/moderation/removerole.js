const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class RemoveRoleCommand extends Command {

    constructor(client) {
        super(client, {
            name: "removerole",
            aliases: ["rr", "rrole"],
            group: "moderation",
            memberName: "removerole",
            throttling: {
                usages: 1,
                duration: 3
            },
            description: "Removes the specified user from a role.",
            guildOnly: true,

            args: [{
                key: "member",
                prompt: "Which user would you like to remove from this role?\n",
                type: "member"
            },
            {
                key: "role",
                prompt: "Which role would you like to remove this user from?\n",
                type: "role"
            }
            ]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { member, role }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { user } = member;
        const botMember = await msg.guild.fetchMember(msg.client.user);

        const BotNoPerm = new RichEmbed()
            .addField("Insufficient Permissions", 'I don\'t have "Manage Roles" permission. Please give me that before using this command.')
            .setColor("#ff1b1b")
            .setFooter("© PenguBot")
            .setTimestamp();

        const NotInRole = new RichEmbed()
            .addField("Couldn't change role", "The targetted user is not present in this role.")
            .setColor("#ff8d00")
            .setFooter("© PenguBot")
            .setTimestamp();

        const NoPermToEdit = new RichEmbed()
            .addField("Role Hierchy Problem", "I don't have permissions to edit this role. Please check the role order.")
            .setColor("#ff8d00")
            .setFooter("© PenguBot")
            .setTimestamp();

        const NoPermToEdit2 = new RichEmbed()
            .addField("Role Hierchy Problem", "You don't have access to manage this role. Please check the role order.")
            .setColor("#ff8d00")
            .setFooter("© PenguBot")
            .setTimestamp();

        const SuccessRole = new RichEmbed()
            .addField("Success", `I have removed ${user.username} from ${role.name}.`)
            .setColor("#09ff00")
            .setFooter("© PenguBot")
            .setTimestamp();

        if (!botMember.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.embed(BotNoPerm);
        // const role = message.guild.roles.filter(ro => ro.name.toLowerCase() === role.toLowerCase()).first();
        if (!member.roles.has(role.id)) return msg.embed(NotInRole);
        if (botMember.highestRole.comparePositionTo(role) < 1) return msg.embed(NoPermToEdit);
        if (msg.member.highestRole.comparePositionTo(role) < 1) return msg.embed(NoPermToEdit2);
        await member.removeRole(role);
        return msg.embed(SuccessRole);
    }

};
