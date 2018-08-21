const { Command } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["doggos", "dogpic"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_DOG_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { body } = await get("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false").catch(e => {
            Error.captureStackTrace(e);
            return e;
        });
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(msg.language.get("COMMAND_DOG_EMBED_DESCRIPTION_MESSAGE"))
            .setImage(body[0]);
        return msg.sendEmbed(embed);
    }

};
