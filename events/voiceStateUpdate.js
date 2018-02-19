module.exports = async (client, oldMem, newMem) => {
    const queue = client.registry.resolveCommand("music:play").queue.get(newMem.guild.id);
    if (!queue) return;
    if (!oldMem.guild.me.voiceChannel) return;
    if (oldMem.voiceChannel === oldMem.guild.me.voiceChannel && newMem.voiceChannel !== newMem.guild.me.voiceChannel && newMem.guild.me.voiceChannel.members.size === 1) {
        const voiceChannel = newMem.guild.me.voiceChannel; // eslint-disable-line
        queue.songs = [];
        queue.dispatcher.end("endAll");
        voiceChannel.leave();
        newMem.send(`No one wants to listen to my music 😢, stopping music.`);
    }
};
