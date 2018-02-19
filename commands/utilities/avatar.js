const { Command } = require("discord.js-commando");

module.exports = class AvatarCmd extends Command {

    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["profilepic", "picture"],
            group: "utilities",
            memberName: "avatar",
            description: "Give you avatar of a user.",
            examples: ["<prefix>avatar <user>"],
            throttling: {
                usages: 1,
                duration: 3
            },
            guildOnly: true,
            args: [{
                key: "targetuser",
                prompt: "Please tag a user who's picture you want.\n",
                type: "member",
                default: ""
            }]
        });
    }

    async run(msg, { targetuser }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const user = targetuser || msg.member;
        return msg.reply(`**${user.displayName}**'s Avatar URL: ${user.user.displayAvatarURL}`);
    }

};
