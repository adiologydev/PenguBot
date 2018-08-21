const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            cooldown: 8,
            aliases: ["changevol", "setvolume"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_VOLUME_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "[volume:integer]"
        });
    }

    async run(msg, [volume]) {
        if (!volume) return msg.sendMessage(`🔈 | ***Guild's Current Music Volume is:*** ${msg.guild.settings.musicVolume}`);
        if (!await msg.hasAtLeastPermissionLevel(3)) return msg.reply("<:penguError:435712890884849664> You are not a **Pengu DJ** to change the volume.");
        if (volume < 0 || volume > 100) return msg.sendMessage(`<:penguError:435712890884849664> ***Volume can not be lower than 0 or higher than 100.***`);
        await msg.guild.settings.update("musicVolume", volume);
        if (msg.guild.music.playing) msg.guild.music.player.volume(volume);
        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Volume has been set to:*** ${volume}`);
    }

};
