const { PlayerManager } = require("discord.js-lavalink");

module.exports = async (client) => {
    console.log(`Connected and Logged in as ${client.user.tag}, in ${client.guilds.size} guilds`);
    await client.user.setPresence({ game: { name: "We're back! | Support: Patreon.com/PenguBot", type: 0 } });

    client.player = new PlayerManager(client, client.config.music.nodes, {
        shard: client.shard.count,
        user: client.user.id,
        region: "us"
    });
};
