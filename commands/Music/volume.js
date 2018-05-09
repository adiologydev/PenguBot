const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["changevol", "setvolume"],
            permissionLevel: 3,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_VOLUME_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<volume:integer>"
        });
    }

    async run(msg, [volume]) {
        if (volume <= 100 || volume >= 0) {
            msg.guild.configs.update("musicVolume", volume);
            if (this.client.queue.get(msg.guild.id)) this.client.queue.get(msg.guild.id).volume = volume;
            if (this.client.lavalink.get(msg.guild.id)) await this.client.lavalink.get(msg.guild.id).volume(volume);
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***Volume has been set to:*** ${volume}`);
        } else {
            return msg.channel.send(`<:penguError:435712890884849664> ***Volume can not be lower than 0 or higher than 100.***`);
        }
    }

};
