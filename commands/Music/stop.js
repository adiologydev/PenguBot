const MusicCommand = require("../../lib/structures/MusicCommand");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            requireDJ: true,
            requireMusic: true,
            cooldown: 8,
            aliases: ["forceleave", "leave", "stopmusic", "musicstop", "stop"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LEAVE_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!msg.guild.me.voice.channel) return msg.sendMessage(`${this.client.emotes.cross} ***There's currently no music playing!***`);

        if (await msg.hasAtLeastPermissionLevel(3) || music.voiceChannel.members.size <= 3) {
            await music.destroy();
            return msg.sendMessage(`${this.client.emotes.check} ***Queue cleared, leaving voice channel.***`);
        } else {
            return msg.sendMessage(`${this.client.emotes.cross} ***There are members in the VC right now, use skip instead!***`);
        }
    }

};
