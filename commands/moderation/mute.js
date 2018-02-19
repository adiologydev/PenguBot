const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class MuteCommand extends Command {

    constructor(client) {
        super(client, {
            name: "mute",
            aliases: ["togglemute", "unmute"],
            group: "moderation",
            memberName: "mute",
            throttling: {
                usages: 1,
                duration: 3
            },
            description: "Mute or Unmute a user from Text and Voice Channels.",
            guildOnly: true,

            args: [{
                key: "member",
                prompt: "Who would you like to mute?\n",
                type: "member"
            }]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("MANAGE_MESSAGES") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { member }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const botMember = await msg.guild.fetchMember(this.client.user);

        const BotNoPerm = new Discord.RichEmbed()
            .addField("Insufficient Permissions", 'I don\'t have "Manage Roles" permission. Please give me that before muting someone.')
            .setColor("#ff1b1b")
            .setFooter("© PenguBot")
            .setTimestamp();

        const Muted = new Discord.RichEmbed()
            .addField("Muted", `I have muted ${member}.`)
            .addField("Muted By", `${msg.author.username}#${msg.author.discriminator}`)
            .setColor("#ee4035")
            .setFooter("© PenguBot")
            .setTimestamp();

        const UnMuted = new Discord.RichEmbed()
            .addField("Un-Muted", `I have un-muted ${member}.`)
            .addField("Un-Muted By", `${msg.author.username}#${msg.author.discriminator}`)
            .setColor("#0392cf")
            .setFooter("© PenguBot")
            .setTimestamp();

        if (!msg.guild.roles.find("name", "PENGU_MUTED")) {
            msg.guild.createRole({
                name: "PENGU_MUTED",
                color: "RED",
                permissions: ["READ_MESSAGES"]
            });
        } else {
            const role = msg.guild.roles.find("name", "PENGU_MUTED");

            if (member.roles.has(role.id)) {
                if (!botMember.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.embed(BotNoPerm);
                await member.removeRole(role).catch(console.log);
                msg.guild.channels.forEach(async channel => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false
                    });
                });
                return msg.embed(UnMuted);
            } else {
                if (!botMember.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.embed(BotNoPerm);
                await member.addRole(role).catch(console.log);
                msg.guild.channels.forEach(async c => {
                    await c.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false
                    });
                });
                return msg.embed(Muted);
            }
        }
    }

};
