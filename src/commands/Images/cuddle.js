const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendcuddle"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_CUDDLE_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const { url } = await this.fetchURL("https://nekos.life/api/v2/img/cuddle");
        if (!url) throw msg.language.get("ERR_TRY_AGAIN");
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(url)
            .setColor("RANDOM");
        return msg.sendMessage(`🤗 | ***${user}, ${msg.language.get("CMD_FUN_CUDDLE")} ${msg.author}!***`, { embed });
    }

};
