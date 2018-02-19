const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class UserInfoCMD extends Command {

    constructor(client) {
        super(client, {
            name: "userinfo",
            aliases: ["user", "userinfo", "uinfo"],
            group: "utilities",
            usage: ["<prefix>userinfo <user>"],
            memberName: "userinfo",
            description: "Gets information about a user.",
            examples: ["userinfo @AdityaTD#5346", "userinfo AdityaTD"],
            guildOnly: true,
            args: [{
                key: "member",
                prompt: "Which user would you like to have information for?\n",
                type: "member",
                default: ""
            }]
        });
    }

    async run(msg, args) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const member = args.member || msg.member;
        const status = {
            online: "Online",
            idle: "Idle",
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible"
        };
        let bot;
        if (member.user.bot === true) bot = "Yes";
        else bot = "No";
        const embed = new RichEmbed()
            .setColor("#2391e7")
            .setFooter("© PenguBot")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL || member.user.defaultAvatarURL)
            .setAuthor(`${member.user.tag} (${member.id})`, `${member.user.displayAvatarURL || member.user.defaultAvatarURL}`)
            .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : "Has No Nickname"}`, true)
            .addField("Joined At", `${member.joinedAt.toString().substr(0, 15)}`, true)
            .addField("Created At", `${member.user.createdAt.toString().substr(0, 15)}`, true)
            .addField("Bot?", `${bot}`, true)
            // .setImage(member.user.displayAvatarURL)
            .addField("Roles", `${member.roles.filter(r => r.id !== msg.guild.id).map(r => r.name).join(", ") || "No Roles"}`, true)
            .addField("Status", `${status[member.user.presence.status]}`, true)
            .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "Currently Not Playing."}`, true);
        return msg.embed(embed);
    }

};
