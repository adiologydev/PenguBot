const { Event } = require("klasa");

module.exports = class extends Event {

    async run(oldMem, newMem) {
        setTimeout(async () => {
            const queue = this.client.queue.get(newMem.guild.id);
            if (!queue) return;
            if (!oldMem.guild.me.voiceChannel) return;
            if (this.client.config.main.patreon === true) return;
            setTimeout(async () => {
                if (oldMem.voiceChannel === oldMem.guild.me.voiceChannel && newMem.voiceChannel !== newMem.guild.me.voiceChannel && newMem.guild.me.voiceChannel.members.size === 1) {
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
