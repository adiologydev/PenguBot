const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: false,
            cooldown: 8,
            aliases: ["forceleave", "leave", "stopmusic", "musicstop", "stop"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LEAVE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.queue || !music.queue.length) return msg.sendMessage(`${this.client.emotes.cross} ***There are no songs in the queue at the moment.***`);

        const vc = music.voiceChannel ? music.voiceChannel.members.size <= 4 : true;
        if (await msg.hasAtLeastPermissionLevel(3) || vc) {
            await music.destroy();
            return msg.sendMessage(`${this.client.emotes.check} ***Queue cleared, leaving voice channel.***`);
        } else {
            return msg.sendMessage(`${this.client.emotes.cross} ***There are members in the VC right now, use skip instead!***`);
        }
    }

};
