const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["trumpjoke", "trumpinsult"],
            botPerms: ["ATTACH_IMAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_TRUMP_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[user:user]"
        });
    }

    async run(msg, [user = msg.member.user]) {
        const { body } = await get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${user.username}`).catch(() => msg.channel.send("There was an error, I think a cat has cut the wire off, dogs don't do that."));

        const embed = new this.client.methods.Embed()
            .setDescription(`**Get Trumped**\n\n${body.message}`)
            .setThumbnail("https://i.imgur.com/lGJbGy6.png")
            .setColor("RANDOM");
        return msg.channel.send({ embed: embed });
    }

};
