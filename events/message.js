// const timeout = new Set();

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    // Remove from AFK on Talking
    if (message.guild.settings.get(`${message.author.id}.afk`)) {
        await message.guild.settings.remove(`${message.author.id}.afk`);
        const md = await message.reply(":x: Removed you from AFK.");
        await md.delete(10000);
    }

    // Send AFK message
    if (message.author.id !== client.user.id) {
        if (message.mentions.users.size) {
            const mentioned = message.mentions.users.first();
            if (message.guild.settings.get(`${mentioned.id}.afk`)) {
                message.channel.send(`**${mentioned.username}** is currently AFK for: ${message.guild.settings.get(`${mentioned.id}.afk`)}`);
            }
        }
    }

// Profile Functions Disabled Due to Database having issues in saving them.

    // Give XP and SNowflakes
    /* if (timeout.has(message.author.id)) return;
    const profile = client.settings.get(`${message.author.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });
    if (!profile) return await client.settings.set(`${message.author.id}.profile`, { xp: 0, snowflakes: 0, daily: null, title: null, reps: 0, gaverep: false });
    message.author.profile = profile;
    const XP = giveRandom(2, 20);
    profile.xp += XP;
    await client.settings.set(`${message.author.id}.profile`, profile);
    timeout.add(message.author.id);
    setTimeout(() => timeout.delete(message.author.id), 45000); */
};

/* function giveRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} */
