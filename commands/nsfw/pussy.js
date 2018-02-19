const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class ButtsCommand extends Command {

    constructor(client) {
        super(client, {
            name: "pussy",
            group: "nsfw",
            memberName: "pussy",
            description: "Gets a NSFW Pussy Picture.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 15
            }
        });

        this.pussies = [
            "http://i.imgur.com/0B4MUXD.jpg", "http://i.imgur.com/suTDck6.jpg", "http://i.imgur.com/4Uz2bHU.jpg",
            "http://i.imgur.com/hGvUlT2.jpg", "http://i.imgur.com/4OJtS2I.jpg", "http://i.imgur.com/RqE3gKD.jpg",
            "http://i.imgur.com/T1b8Yqk.jpg", "http://i.imgur.com/o5ssif7.jpg", "http://i.imgur.com/OulTNjZ.jpg",
            "http://i.imgur.com/kl3K6mV.jpg", "http://i.imgur.com/qhPrK8m.jpg", "http://i.imgur.com/p49JCDp.jpg",
            "http://i.imgur.com/JCHMLWC.jpg", "http://i.imgur.com/NaxwNkz.jpg", "http://i.imgur.com/NTR7Ag6.jpg",
            "http://i.imgur.com/C4Znm99.jpg", "http://i.imgur.com/IXg8Y87.jpg", "http://i.imgur.com/iQKkVIz.jpg",
            "http://i.imgur.com/XVTyZ3a.jpg", "http://i.imgur.com/83753uZ.jpg", "http://i.imgur.com/XVTyZ3a.jpg",
            "http://i.imgur.com/XVTyZ3a.jpg", "http://i.imgur.com/NaxwNkz.jpg", "http://i.imgur.com/5Q6mPam.jpg",
            "http://i.imgur.com/ESOFNMd.jpg", "http://i.imgur.com/BNuvOHd.jpg"
        ];
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const upvoter = await this.client.functions.isUpvoter(msg.author.id) || await this.client.functions.isPatreon(msg);
        if (!upvoter) {
            return msg.reply(`<:blobsad:373821680813867008> | Pengu's Internet is being limited, you may only use NSFW commands if you're a **Patron** or **Upvoter** for now.

**Discord Bot List (Upvote Here)**: <https://discordbots.org/bot/PenguBot>
**Patreon**: <https://patreon.com/PenguBot>`);
        }
        if (!msg.channel.nsfw) return msg.say("You can only use NSFW commands in NSFW channels.");
        const embed = new RichEmbed()
            .setColor("#f890ff")
            .setImage(this.pussies[Math.floor(Math.random() * this.pussies.length)]);
        return msg.embed(embed);
    }

};
