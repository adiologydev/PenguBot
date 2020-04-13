const { Command, MessageEmbed, Timestamp, config: { apis } } = require("../../index");

const timestamp = new Timestamp("d MMMM YYYY");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 15,
            aliases: ["twitchstats", "twitchstatistics"],
            requiredPermissions: ["EMBED_LINKS"],
            description: "Get twitch channel statisitcs directly from twitch.",
            usage: "<channel:...string>",
            extendedHelp: "No extended help available."
        });

    }
    async run(msg, [channel]) {
        const body = await this.fetchURL(`https://api.twitch.tv/kraken/channels/${channel}`, { query: { client_id: apis.twitch } })
            .catch(() => { throw "I'm having trouble communicating with twitch, make sure you entered the right username."; });

        return msg.sendEmbed(new MessageEmbed()
            .setColor("#1976D2")
            .setAuthor(body.display_name, body.logo, body.url)
            .setTimestamp()
            .setFooter(`Requested by ${msg.author.tag}`)
            .setDescription(`
❯ **Views:** ${body.views.toLocaleString()}
❯ **Followers:** ${body.followers.toLocaleString()}
❯ **Game:** ${body.game}
❯ **Status:** ${body.status}
❯ **Mature?:** ${body.mature ? "Yes" : "No"}
❯ **Created At:** ${timestamp.display(body.created_at)}
            `));
    }

};
