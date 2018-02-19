const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class BanUserCommand extends Command {

    constructor(client) {
        super(client, {
            name: "ban",
            aliases: ["b", "banne", "b&"],
            group: "moderation",
            memberName: "ban",
            description: "Permanently ban a member from your server.",
            throttling: {
                usages: 1,
                duration: 15
            },
            guildOnly: true,
            args: [{
                key: "member",
                prompt: "Who would you like to ban?\n",
                type: "member"
            }, {
                key: "reason",
                prompt: "For what reason would you like to ban this user for?\n",
                default: "No Reason Specified.",
                type: "string"
            }]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("BAN_MEMBERS") || msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { member, reason }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const BotNoBan = new RichEmbed()
            .addField("Why Ban Me? ;'(", "I love being here, please don't.")
            .setColor("#ff8d00")
            .setFooter("© PenguBot")
            .setTimestamp();

        const BotNoPerm = new RichEmbed()
            .addField("Insufficient Permissions", 'I don\'t have "Ban Members" permission. Please give me that before using this command.')
            .setColor("#ff1b1b")
            .setFooter("© PenguBot")
            .setTimestamp();

        if (member.user.id === this.client.user.id) return msg.embed(BotNoBan);
        if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.embed(BotNoPerm);

        if (member.highestRole.position >= msg.member.highestRole.position) {
            return msg.say(`Dear ${msg.author.username}, you may not execute this command on this member.`);
        } else if (member.bannable === false) {
            return msg.say(`Dear ${msg.author.username}, I am not able to ban this member, sorry.`);
        }

        const banned = new RichEmbed()
            .setAuthor(`${member.user.tag} (${member.id})`, member.user.avatarURL)
            .setDescription(`${member.user.tag} has been successfully banned`)
            .setColor("RED")
            .addField("Reason", reason)
            .setTimestamp();
        const banningError = new RichEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`Error while trying to ban ${member.user.tag}`)
            .setColor("RED")
            .setTimestamp();
        return msg.guild.ban(member, 7).then(() => msg.embed(banned)).catch(() => msg.embed(banningError));
    }

};
