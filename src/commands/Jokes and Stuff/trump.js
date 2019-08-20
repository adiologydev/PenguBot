const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["trumpjoke", "trumpinsult"],
            requiredPermissions: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_TRUMP_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[user:username]"
        });
    }

    async run(msg, [user = msg.author]) {
        const { message } = await this.fetchURL(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized`, { query: { q: user.username } });
        if (message) throw msg.language.get("ER_TRY_AGAIN");

        return msg.sendEmbed(new MessageEmbed()
            .setDescription(`**Get Trumped**\n\n${message}`)
            .setThumbnail("https://i.imgur.com/lGJbGy6.png")
            .setColor("RANDOM"));
    }

};
