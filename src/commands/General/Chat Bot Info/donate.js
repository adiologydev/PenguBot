const Command = require("../../../lib/structures/KlasaCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["patreon", "patron", "premium"],
            guarded: true,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_FILES"],
            description: language => language.get("COMMAND_DONATE_DESCRIPTION")
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
            .setDescription(msg.language.get("COMMAND_DONATE"))
            .setAuthor("PenguBot - Premium", this.client.user.displayAvatarURL(), "https://www.pengubot.com")
            .setThumbnail("https://i.imgur.com/bSOBK4s.png")
            .setColor("RANDOM");
        return msg.sendEmbed(embed);
    }

};
