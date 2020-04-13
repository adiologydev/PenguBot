const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["sendpat"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_PAT_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        const { url } = await this.fetchURL("https://nekos.life/api/v2/img/pat");
        if (!url) throw msg.language.get("ERR_TRY_AGAIN");
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setImage(url)
            .setColor("RANDOM");

        return msg.sendMessage(`✋ | ***${user}, ${msg.language.get("CMD_FUN_PAT")} ${msg.author}!***`, { embed });
    }

};
