const RawEvent = require("../lib/structures/RawEvent");
const { VoiceState } = require('discord.js');

class VoiceStateUpdate extends RawEvent {

    constructor(...args) {
        super(...args, { name: "VOICE_STATE_UPDATE" });
    }

    async run(data) {
        const guild = this.client.guilds.get(data.guild_id);
        if (!guild) return;
        const member = await guild.members.fetch(data.user_id).catch(() => null);
        if (!member) return;

        // Patch d.js
        const oldMember = member._clone();
        oldMember._frozenVoiceState = oldMember.voiceState;

        const entry = new VoiceState(guild.id, data);
        
        guild.voiceStates.set(member.user.id, entry);
    }

}

module.exports = VoiceStateUpdate;
