const { Command, Timestamp, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["uinfo"],
            cooldown: 5,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_USERINFO_DESCRIPTION"),
            usage: "[user:membername]",
            extendedHelp: "No extended help available."
        });
        this.timestamp = new Timestamp("DD MMMM YYYY, HH:MM");
    }

    async run(msg, [user]) {
        if (!user) user = await msg.guild.members.fetch(msg.author.id).catch(() => null);
        return msg.sendEmbed(new MessageEmbed()
            .setColor(user.displayHexColor ? user.displayHexColor : "#32c4e3")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setThumbnail(user.user.displayAvatarURL())
            .addField("❯ Name", user.user.tag, true)
            .addField("❯ ID", user.id, true)
            .addField("❯ Discord Join Date", this.timestamp.display(user.user.createdAt), true)
            .addField("❯ Server Join Date", user.joinedTimestamp ? this.timestamp.display(user.joinedTimestamp) : "Unknown", true)
            .addField("❯ Nickname", user.nickname || "None", true)
            .addField("❯ Bot?", user.bot ? "Yes" : "No", true)
            .addField(`❯ Roles [${user.roles.size}]`, user.roles.size ? `<@&${user.roles.map(r => r.id).filter(r => r !== msg.guild.roles.everyone.id).join(">, <@&")}>` : "None"));
    }

};
