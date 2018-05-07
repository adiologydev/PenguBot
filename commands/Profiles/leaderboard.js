const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["lb", "top"],
            description: msg => msg.language.get("COMMAND_LEADERBOARD_DESCRIPTION"),
        });
    }

    async run(msg) {
        const message = await msg.send("Fetching guild members...");
        await msg.guild.members.fetch();
        const sortedXPs = msg.guild.members.filter(m => !m.user.bot).map(m => ({
            name: m.user.tag,
            xp: m.user.configs.xp
        })).sort((a, b) => b.xp - a.xp);
        let leaderboardString = "";
        for (const stats of sortedXPs.slice(0, 10)) leaderboardString += `${sortedXPs.indexOf(stats) + 1}: ${stats.name} - ${stats.xp} XP\n`;
        return await message.edit(`
\`\`\`
${leaderboardString}
-----------------------------
Your Placement
${sortedXPs.indexOf(sortedXPs.find(x => x.name === msg.author.tag)) + 1}: ${msg.author.tag} - ${msg.author.configs.xp} XP
\`\`\``);
    }

};