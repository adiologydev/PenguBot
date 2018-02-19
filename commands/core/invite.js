const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class InviteCMD extends Command {

    constructor(client) {
        super(client, {
            name: "invite",
            group: "core",
            memberName: "invite",
            aliases: ["inv"],
            description: "Gives a URL to invite Pengu to your server or you to his server.",
            usage: ["<prefix>invite"]
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const invitemsg = new RichEmbed()
            .setAuthor("Invite - PenguBot", this.client.user.avatarURL)
            .setColor(0x00AE86)
            .setFooter("© PenguBot", this.client.user.avatarURL)
            .setTimestamp()
            .addField("Invite Pengu to Your Server:", "http://bit.ly/PenguBotInvite")
            .addField("Join Pengu's Official Discord Server:", "https://discord.gg/u8WYw5r");
        msg.embed(invitemsg);
    }

};
