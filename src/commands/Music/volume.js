const { MusicCommand } = require("../../index");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            patronOnly: true,
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
        if (!volume) return msg.sendMessage(`🔈 | ***Guild's Current Music Volume is:*** ${msg.guild.settings.misc.volume}`);
        if (volume <= 0 || volume >= 100) return msg.sendMessage(`${this.client.emotes.cross} ***Volume can not be lower than 0 or higher than 100.***`);
        await msg.guild.settings.update("misc.volume", volume);
        if (msg.guild.music.playing) msg.guild.music.player.volume(volume);
        return msg.sendMessage(`${this.client.emotes.check} ***Volume has been set to:*** ${volume}`);
    }

};
