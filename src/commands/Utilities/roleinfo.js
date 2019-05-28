const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 5,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_ROLEINFO_DESCRIPTION"),
            usage: "<role:rolename>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [role]) {
        return msg.sendEmbed(new MessageEmbed()
            .setColor(role.hexColor)
            .setTimestamp(role.createdAt)
            .setFooter("© PenguBot.com • Role Created At")
            .addField("❯ Name", role.name, true)
            .addField("❯ ID", role.id, true)
            .addField("❯ Color", role.hexColor, true)
            .addField("❯ Members", role.members.size, true)
            .addField("❯ Hoisted", role.hoist ? "Yes" : "No", true)
            .addField("❯ Mentionable", role.mentionable ? "Yes" : "No", true)
            .addField(`❯ Permission(s)`, role.permissions.toArray().length ? role.permissions.toArray().join(", ") : "None"));
    }

};
