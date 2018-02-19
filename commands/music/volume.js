const { Command } = require("discord.js-commando");

module.exports = class ChangeVolumeCommand extends Command {

    constructor(client) {
        super(client, {
            name: "volume",
            aliases: ["setvolume", "changevolume", "vol"],
            group: "music",
            memberName: "volume",
            description: "Change the volume of Pengu in Voice Channel.",
            format: "[level]",
            details: "The volume level ranges from 0-10.",
            examples: ["volume", "volume 7", "volume up", "volume down"],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isDJ(msg);
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.say(`The volume command has been removed due to server issues!`);
        // const queue = this.queue.get(msg.guild.id);
        // if (!queue) return msg.reply(`❌ There is currently no music playing.`);
        // if (!args) return msg.reply(`❌ the volume is currently set to ${queue.volume}.`);
        // if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        // if (!queue.voiceChannel.members.has(msg.author.id)) return msg.reply(`❌ You're currently not in the voice channel.`);

        // let volume = parseInt(args);
        // if (isNaN(volume)) {
        //     volume = args.toLowerCase();
        //     if (volume === 'up' || volume === '+') volume = queue.volume + 2;
        //     else if (volume === 'down' || volume === '-') volume = queue.volume - 2;
        //     else return msg.reply(`❌ Invalid volume level. The volume ranges from 0-10.`);
        //     if (volume === 11) volume = 10;
        // }

        // volume = Math.min(Math.max(volume, 0), volume === 11 ? 11 : 10);
        // queue.volume = volume;
        // if (queue.connection.dispatcher) queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 5);

        // return msg.reply(`${volume === 11 ? 'this one goes to 11!' : `✅ Set the volume to ${volume}.`}`);
    }

/*     get queue() {
        if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;
        return this._queue;
    } */

};
