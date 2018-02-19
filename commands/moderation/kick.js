const { Command } = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class KickUserCommand extends Command {

    constructor(client) {
        super(client, {
            name: "kick",
            aliases: ["k"],
            group: "moderation",
            memberName: "kick",
            description: "Kick a user from your server.",
            throttling: {
                usages: 1,
                duration: 3
            },
            guildOnly: true,

            args: [{
                key: "member",
                prompt: "Who would you like to kick?\n",
                type: "member"
            },
            {
                key: "reason",
                prompt: "What are you kicking this user for?\n",
                type: "string",
                default: "No reason specified"
            }
            ]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("KICK_MEMBERS") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { member, reason }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const BotNoKick = new Discord.RichEmbed()
            .addField("Why Kick Me", "I love being here, please don't.")
            .setColor("#ff8d00")
            .setFooter("© PenguBot")
            .setTimestamp();

        const NoPerm = new Discord.RichEmbed()
            .addField("Insufficient Permissions", 'I don\'t have "Kick Members" permission. Please give me that before using this command.')
            .setColor("#ff1b1b")
            .setFooter("© PenguBot")
            .setTimestamp();

        const RoleProb = new Discord.RichEmbed()
            .addField("Role Hierchy Problem", "I am unable to kick this user, please ensure my highest role is above the target user's highest role!")
            .setColor("#ff1b1b")
            .setFooter("© PenguBot")
            .setTimestamp();

        const Kicked = new Discord.RichEmbed()
            .addField("Success", `${member.user.tag} was kicked for ${reason}.`)
            .setColor("#09ff00")
            .setFooter("© PenguBot")
            .setTimestamp();

        if (member.user.id === this.client.user.id) return msg.embed(BotNoKick);
        const botMember = await msg.guild.fetchMember(this.client.user);
        if (!botMember.hasPermission("KICK_MEMBERS")) return msg.embed(NoPerm);
        if (!member.kickable) return msg.embed(RoleProb);

        const message = await msg.channel.send("Kicking user... Gotta get my shoe off first. *Realises Penguin's don't wear shoes*, Uh Nvm...");

        await member.kick();
        return message.delete().then(() => {
            msg.embed(Kicked);
        });
    }

};
