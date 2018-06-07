const { Command, Timestamp } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["uinfo"],
            cooldown: 5,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_USERINFO_DESCRIPTION"),
            usage: "[user:member]",
            extendedHelp: "No extended help available."
        });
        this.timestamp = new Timestamp("d MMMM YYYY");
    }

    async run(msg, [user = msg.member]) {
        const embed = new MessageEmbed()
            .setColor(user.user.displayHexColor || "#32c4e3")
            .setTimestamp()
            .setFooter("© PenguBot.cc")
            .setThumbnail(user.user.displayAvatarURL())
            .addField("❯ Name", user.user.tag, true)
            .addField("❯ ID", user.id, true)
            .addField("❯ Discord Join Date", this.timestamp.display(user.user.createdAt), true)
            .addField("❯ Server Join Date", this.timestamp.display(user.user.joinedTimestamp), true)
            .addField("❯ Nickname", user.nickname || "None", true)
            .addField("❯ Bot?", user.user.bot ? "Yes" : "No", true)
            .addField("❯ Highest Role", user.roles.highest.id !== msg.guild.defaultRole.id ? user.roles.highest.name : "None", true)
            .addField("❯ Hoist Role", user.roles.hoist ? user.roles.hoist.name : "None", true);
        return msg.sendEmbed(embed);
    }

};
