const RawEvent = require("../structures/RawEvent");
const { util: { sleep } } = require("klasa");

class VoiceStateUpdate extends RawEvent {

    async run(data) {
        const guild = this.client.guilds.get(data.guild_id);
        if (!guild) return;
        const member = await guild.members.fetch(data.user_id).catch(() => null);
        if (!member) return;

        // Patch d.js
        const oldMember = member._clone();
        oldMember._frozenVoiceState = oldMember.voiceState;

        guild.voiceStates.set(member.user.id, data);

        await this.voiceStateUpdate(oldMember, member);
    }

    async voiceStateUpdate(oldMem, newMem) {
        if (this.client.config.main.patreon) return;
        await sleep(10000);
        const queue = this.client.queue.get(newMem.guild.id);
        if (!queue) return;
        await sleep(300000);
        if (!newMem.guild.me) await newMem.guild.members.fetch(this.client.user.id);
        if (oldMem.voiceChannel === oldMem.guild.me.voiceChannel && newMem.voiceChannel !== newMem.guild.me.voiceChannel && newMem.guild.me.voiceChannel.members.size === 1) {
            try {
                await this.client.lavalink.leave(newMem.guild.id);
                if (queue.tc) await queue.tc.send("<:penguError:435712890884849664> ***No one left in Voice Channel, leaving...***");
                return this.client.queue.delete(newMem.guild.id);
            } catch (error) {
                this.client.console.error(error);
            }
        }
    }

}

module.exports = VoiceStateUpdate;
