const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class SetRoleCommand extends Command {

    constructor(client) {
        super(client, {
            name: "setrole",
            aliases: ["sr", "srole"],
            group: "moderation",
            memberName: "setrole",
            throttling: {
                usages: 1,
                duration: 3
            },
            description: "Sets role for a user.",
            guildOnly: true,
            args: [{
                key: "member",
                prompt: "Who would you like to give a role to?\n",
                type: "member"
            },
            {
                key: "role",
                prompt: "Which role would you like to give to the user?\n",
                type: "role"
            }
            ]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("MANAGE_ROLES") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { member, role }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { user } = member;
        const botMember = await msg.guild.fetchMember(this.client.user);

        const BotNoPerm = new RichEmbed()
            .addField("Insufficient Permissions", 'I don\'t have "Manage Roles" permission. Please give me that before using this command.')
            .setColor("#ff1b1b")
            .setFooter("© PenguBot")
            .setTimestamp();

        const AlreadyInRole = new RichEmbed()
            .addField("Couldn't change role", "The targetted user is already in this role.")
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
            .addField("Success", `I have added ${user.username} to ${role.name}.`)
            .setColor("#09ff00")
            .setFooter("© PenguBot")
            .setTimestamp();

        if (!botMember.hasPermission("MANAGE_ROLES")) return msg.embed(BotNoPerm);
        if (member.roles.has(role.id)) return msg.embed(AlreadyInRole);
        if (botMember.highestRole.comparePositionTo(role) < 1) return msg.embed(NoPermToEdit);
        if (msg.member.highestRole.comparePositionTo(role) < 1) return msg.embed(NoPermToEdit2);
        await member.addRole(role);
        return msg.embed(SuccessRole);
    }

};
