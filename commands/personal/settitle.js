const { Command } = require("discord.js-commando");

module.exports = class TitleCMD extends Command {

    constructor(client) {
        super(client, {
            name: "settitle",
            group: "personal",
            memberName: "settitle",
            aliases: ["title", "setprofiletitle", "profiletitle", "changetitle"],
            description: "Change your Profile Title.",
            usage: ["<prefix>settitle <title>"],
            throttling: {
                usages: 1,
                duration: 3
            }
            /* ,
            args: [{
                key: "title",
                prompt: "What do you want to set your profil's title to?\n",
                type: "string"
            }] */
        });
    }

    async run(msg, { title }) { // eslint-disable-line
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.channel.send("❌ | This command is temporarily disabled because a Pengu tripped on a wire.");
        /* const profile = this.client.settings.get(`${msg.author.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });
        if (!profile) await this.client.settings.set(`${msg.author.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });
        profile.title = title;
        await this.client.settings.set(`${msg.author.id}.profile`, profile);
        return msg.reply(`✅ | You've set your profile title to: \`${title}\`.`); */
    }

};
