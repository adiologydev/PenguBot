const { Command } = require("discord.js-commando");

module.exports = class NootNootCommand extends Command {

    constructor(client) {
        super(client, {
            name: "noot",
            aliases: ["nootnoot"],
            group: "misc",
            memberName: "noot",
            description: "noot noot",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 15
            }
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { voiceChannel } = msg.member;
        if (!voiceChannel) return msg.reply("I'm sorry but you need to be in a voice channel to play music!");
        const permissions = voiceChannel.permissionsFor(msg.guild.me);
        if (!permissions.has("CONNECT")) {
            return msg.reply("I cannot connect to your voice channel, make sure I have the proper permissions!");
        } else if (!permissions.has("SPEAK")) {
            return msg.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");
        }

        const connection = await voiceChannel.join().catch(err => { throw err; });
        const dispatcher = connection.playArbitraryInput("https://noot.space/noot.mp4");
        dispatcher.on("start", () => msg.channel.send(`Noot Noot!`))
            .on("end", () => voiceChannel.leave())
            .on("error", err => { throw err; });
    }

};
