const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["lb", "top"],
            cooldown: 60,
            description: msg => msg.language.get("COMMAND_LEADERBOARD_DESCRIPTION"),
            usage: "[Page:integer]"
        });
    }

    async run(msg, [Page]) {
        let users;
        if (this.client.topCache) users = this.client.topCache;
        users = await this.client.providers.get("rethinkdb").getAll("users").then(res => res.sort((a, b) => b.xp - a.xp));
        this.client.topCache = users;
        let userPos;
        if (this.client.uPosCache) userPos = this.client.uPosCache;
        userPos = users.filter(async a => await this.client.users.get(a.id));
        this.client.uPosCache = userPos;
        await msg.author.configs._syncStatus;

        const leaderboard = [];
        const totalPages = Math.round(userPos.length / 10);

        const index = Page ? Page -= 1 : 0;

        if ((index > totalPages && !totalPages) || (totalPages && index + 1 > totalPages)) return msg.channel.send(`There are only **${totalPages || 1}** page(s) in the leaderboard.`);

        leaderboard.push("=== PenguBot Global Leaderboard ===\n");
        const pos = userPos.findIndex(i => i.id === msg.author.id);

        const userProfiles = await Promise.all(userPos.slice(index * 10, (index + 1) * 10)
            .map(async user => {
                const username = await this.client.users.get(user.id).then(a => a.username).catch(() => null) || "None";
                return { xp: user.xp ? user.xp : 0, username };
            }));
        for (let i = 0; i < userProfiles.length; i++) {
            const userData = userProfiles[i];
            leaderboard.push(` • ${((index * 10) + (i + 1)).toString().padStart(2, " ")} | ${userData.username.padEnd(30, " ")}::  ${userData.xp.toLocaleString()} XP`);
        }

        const posNum = pos !== -1 ? pos + 1 : 0;
        leaderboard.push(`\n • ${posNum.toString().padStart(2, " ")} | ${msg.author.username.padEnd(30, " ")}::  ${msg.author.configs.xp.toLocaleString()} XP`);
        leaderboard.push("--------------------------------------------------");
        return msg.channel.send(`${leaderboard.join("\n")}\n Page ${index + 1} / ${totalPages.toLocaleString() || 1} - ${userPos.length.toLocaleString()} Total Users`, { code: "asciidoc" });
    }

};
