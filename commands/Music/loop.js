const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["loopsong", "repeat"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_LOOP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const queue = this.client.queue.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.channel.send("<:penguError:435712890884849664> You're currently not in a voice channel.");
        if (!queue) return msg.channel.send("<:penguError:435712890884849664> There's currently no music playing!");
        if (queue.loop) {
            queue.loop = false;
            return msg.channel.send("⏯ | ***Song looping is now Disabled***");
        } else {
            queue.loop = true;
            return msg.channel.send("⏯ | ***Song looping is now Enabled***");
        }
    }

};
