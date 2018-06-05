const { Event } = require("klasa");

module.exports = class extends Event {

    async run(oldMem, newMem) {
        await oldMem.guild.members.fetch(oldMem.author.id).catch(() => {
            throw "I tripped on a wire! *Ouch!* It hurts but I'll recover, try again later.";
        });
        await newMem.guild.members.fetch(newMem.author.id).catch(() => {
            throw "I tripped on a wire! *Ouch!* It hurts but I'll recover, try again later.";
        });
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
