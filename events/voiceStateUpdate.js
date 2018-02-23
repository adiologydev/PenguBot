module.exports = async (client, oldMem, newMem) => {
    setTimeout(() => {
        const queue = client.queue.get(newMem.guild.id);
        if (!queue) return;
        if (!oldMem.guild.me.voiceChannel) return;
        if (oldMem.voiceChannel === oldMem.guild.me.voiceChannel && newMem.voiceChannel !== newMem.guild.me.voiceChannel && newMem.guild.me.voiceChannel.members.size === 1) {
            queue.songs = [];
            queue.connection.disconnect();
            client.player.leave(newMem.guild.id);
            client.queue.delete(newMem.guild.id);
            newMem.send(`:x: | No one left in the VC to hear my music, cleared the queue and stopped the music.`);
        }
    }, 15000);
};
