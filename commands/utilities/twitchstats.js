const { Command } = require("discord.js-commando");
const { get } = require("snekfetch");
const { RichEmbed } = require("discord.js");
const KEY = require("../../config.json").SOCIAL.TWITCH;
const moment = require("moment");

module.exports = class TwitchCMD extends Command {

    constructor(client) {
        super(client, {
            name: "twitchstats",
            group: "utilities",
            aliases: ["twstats", "twitchfollowers", "twitchinfo", "twinfo"],
            memberName: "twitchstats",
            description: "Get Twitch Channel Statisitcs Directly From Twitch.",
            usage: ["<prefix>twitchstats <channel name>"],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "twitchname",
                prompt: "Please enter a Twitch Channel Name?\n",
                type: "string"
            }]
        });
    }

    async run(msg, { twitchname }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { body } = await get(`https://api.twitch.tv/kraken/channels/${twitchname}?client_id=${KEY}`).catch(err => msg.say(`Error: ${err.message} finding user ${twitchname} make sure you spelled their username correctly.`));

        const creationDate = moment(body.created_at).format("DD-MM-YYYY");
        const embed = new RichEmbed()
            .setColor(6570406)
            .setDescription(`**Twitch Status:** ${body.status}`)
            .setThumbnail(body.logo)
            .setAuthor("Twitch Stats - PenguBot", this.client.user.avatarURL, body.url)
            .addField("Twitch Name", body.display_name, true)
            .addField("Partnered", body.partner, true)
            .addField("Account's ID", body._id, true)
            .addField("Followers", body.followers, true)
            .addField("Created On", creationDate, true)
            .addField("Channel Views", body.views, true);
        return msg.embed(embed);
    }

};
