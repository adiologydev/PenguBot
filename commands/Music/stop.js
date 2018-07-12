const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["stopmusic", "musicstop"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: msg => msg.language.get("COMMAND_STOP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.music = true;
    }

    async run(msg) {
        const queue = this.client.queue.get(msg.guild.id);
        const player = this.client.lavalink.get(msg.guild.id);
        if (!queue || !player) return msg.sendMessage("<:penguError:435712890884849664> ***There's currently no music playing!***");
        if (!queue.vc.members.has(msg.author.id)) return msg.sendMessage("<:penguError:435712890884849664> You're currently not in a voice channel or there was an error, try again.");

        if (await msg.hasAtLeastPermissionLevel(3) || queue.vc.members.size <= 3) {
            await this.client.lavalink.leave(msg.guild.id);
            await msg.sendMessage("<:penguSuccess:435712876506775553> ***Queue cleared, leaving voice channel.***");
            return this.client.queue.delete(msg.guild.id);
        } else {
            return msg.sendMessage("<:penguError:435712890884849664> ***There are members in the VC right now, use skip instead!***");
        }
    }

};
