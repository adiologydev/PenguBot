module.exports = async (client) => {
    console.log(`Connected and Logged in as ${client.user.tag}, in ${client.guilds.size} guilds`);
    await client.user.setPresence({ game: { name: "We're back! | Support: Patreon.com/PenguBot", type: 0 } });
};
