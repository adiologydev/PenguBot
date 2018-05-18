const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["loopsong", "repeat"],
            permissionLevel: 0,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            usage: "[-force]",
            description: (msg) => msg.language.get("COMMAND_SKIP_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
        this.Music = true;
    }

    async run(msg, [force]) {
        const music = msg.guild.music();

        if (music.voiceChannel.members.size > 4) {
            if (force) {
                const hasPermission = await msg.hasAtLeastPermissionLevel(3);
                if (hasPermission === false) throw "<:penguError:435712890884849664> Sorry you can't use the -force flag.";
            } else {
                const response = this.handleSkips(music, msg.author.id);
                if (response) return msg.send(response);
            }
        }

        await msg.send(`<:penguSuccess:435712876506775553> Skipped: **${music.queue[0].title}**`);
        music.skip(true);
        if (music.queue.lenght === 0) {
            await music.destroy();
            return msg.send("The queue was empty after the skip so I will leave.:runner::wind_blowing_face:");
        }
        return null;
    }

    sizeCheck(total, size) {
        if (total <= 3) return true;
        return size >= total * 0.4 ? false : `🔸 | Votes: ${size} of ${Math.ceil(total / 3)}`;
    }

    handleSkips(musicInterface, user) {
        const song = musicInterface.queue[0];
        if (song.skips.has(user)) return "<:penguError:435712890884849664> You've already voted to skip this song.";
        song.skips.add(user);
        const members = musicInterface.voiceChannel.members.size - 1;
        return this.sizeCheck(members, song.skips.size);
    }

};
