const { Command, MessageEmbed } = require("../../index");

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
        const data = await this.fetchURL("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false");
        if (!data || !data.length) throw msg.language.get("ERR_TRY_AGAIN");

        return msg.sendEmbed(new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**Dog Picture**`)
            .setImage(data[0]));
    }

};
