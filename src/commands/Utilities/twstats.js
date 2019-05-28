const { Command, MessageEmbed, config } = require("../../index");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            aliases: ["twitchstats"],
            cooldown: 5,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TWSTATS_DESCRIPTION"),
            usage: "<name:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [name]) {
        const { body } = await get(`https://api.twitch.tv/kraken/channels/${name}?client_id=${config.apis.twitch}`)
            .catch(() => msg.reply(`<:penguError:435712890884849664> I couldn't find your channel while searching it on Twitch, please try again!`));

        const embed = new MessageEmbed()
            .setColor(6570406)
            .setAuthor("Twitch Channel Statistics", "https://i.imgur.com/krTbTeD.png")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription(`❯ **Channel Name:** ${body.display_name || name}
❯ **Channel Status:** ${body.status}
❯ **Partnered:** ${body.partner}\n
❯ **Followers Count:** ${parseInt(body.followers).toLocaleString()}
❯ **Total Views:** ${parseInt(body.views).toLocaleString()}
❯ **Channel Created:** ${new Date(body.created_at).toDateString()}\n
❯ **Link:** ${body.url}`);
        if (body.logo) embed.setThumbnail(body.logo);
        return msg.sendEmbed(embed);
    }

};
