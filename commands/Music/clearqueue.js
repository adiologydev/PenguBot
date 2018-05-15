const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["cq", "prunequeue"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_CLEARQUEUE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.Music = true;
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!msg.member.voiceChannel) return msg.sendMessage("<:penguError:435712890884849664> You're currently not in a voice channel.");
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> ***There's currently no music playing!***");

        if (await msg.hasAtLeastPermissionLevel(3) || music.voiceChannel.members.size <= 3) {
            music.prune();
            return msg.sendMessage("<:penguSuccess:435712876506775553> ***Queue cleared.***");
        } else {
            return msg.sendMessage("<:penguError:435712890884849664> ***There are members in the VC right now, use skip instead!***");
        }
    }

};
