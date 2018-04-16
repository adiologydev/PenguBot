const { PlayerManager } = require("discord.js-lavalink");

module.exports = async (client) => {
    console.log(`Connected and Logged in as ${client.user.tag}, in ${client.guilds.size} guilds`);
    await client.user.setPresence({ game: { name: "PenguBot.cc | I ❤ You Too | p!help", type: 0 } });

    client.player = new PlayerManager(client, client.config.music.nodes, {
        shards: client.shard.count,
        user: client.user.id,
        region: "us"
    });
};
