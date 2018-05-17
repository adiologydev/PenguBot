const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["loop", "loopon", "loopoff"],
            permissionLevel: 3,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMANDLOOP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.Music = true;
    }

    async run(msg) {
        const music = msg.guild.music();
        if (!music.playing) return msg.sendMessage("<:penguError:435712890884849664> There's currently no music playing!");

        if (!this.client.config.main.patreon || this.client.functions.isPatron(this.client, msg.guild.id === false)) return msg.sendMessage("<:penguError:435712890884849664> ***You need to be in a Patron Guild in order to use this command.***");

        return music.smartLoop();
    }

};
