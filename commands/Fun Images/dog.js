const Command = require("../../lib/structures/KlasaCommand");
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
        try {
            const { body } = await get("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false").catch(e => {
                Error.captureStackTrace(e);
                return e;
            });
            if (!body || body[0]) throw msg.language.get("ERR_TRY_AGAIN");
            const embed = new MessageEmbed()
                .setFooter("© PenguBot.com")
                .setTimestamp()
                .setColor("RANDOM")
                .setDescription(`**Dog Picture**`)
                .setImage(body[0]);
            return msg.sendEmbed(embed);
        } catch (e) {
            return msg.sendMessage(`${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`);
        }
    }

};
