const { Event } = require("klasa");

module.exports = class extends Event {

    async run(oldMem, newMem) {
        setTimeout(async () => {
            const queue = this.client.queue.get(newMem.guild.id);
            if (!queue) return;
            const _voiceCh = oldMem.guild.me.voiceChannel;
            if (!_voiceCh) return;
            if (this.client.config.main.patreon === true) return;
            setTimeout(async () => {
                if (_voiceCh.members.filter(mem => !mem.user.bot).size < 1) {
                    try {
                        await this.client.lavalink.leave(newMem.guild.id);
                        queue.tc.send("<:penguError:435712890884849664> ***No one left in Voice Channel, leaving...***");
                        return this.client.queue.delete(newMem.guild.id);
                    } catch (e) {
                        console.log(`| VoiceStateUpdate |\n${e}`);
                    }
                }
            }, 3600000);
        }, 10000);
    }

};
