const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["lb", "top"],
            description: msg => msg.language.get("COMMAND_LEADERBOARD_DESCRIPTION"),
            usage: "[Page:integer]"
        });
    }

    async run(msg, [Page]) {
        const users = await this.client.providers.get("rethinkdb").getAll("users").then(res => res.sort((a, b) => b.xp - a.xp));
        const userPos = users.filter(a => this.client.users.get(a.id));

        const leaderboard = [];
        const totalPages = Math.round(userPos.length / 10);

        const index = Page ? Page -= 1 : 0;

        if ((index > totalPages && !totalPages) || (totalPages && index + 1 > totalPages)) return msg.channel.send(`There are only **${totalPages || 1}** page(s) in the leaderboard.`);

        leaderboard.push("=== PenguBot Global Leaderboard ===\n");
        const pos = userPos.findIndex(i => i.id === msg.author.id);

        userPos.slice(index * 10, (index + 1) * 10)
            .map(user => ({ xp: user.xp, user: user.id }))
            .forEach((newMap, position) =>
                leaderboard.push(` • ${((index * 10) + (position + 1)).toString().padStart(2, " ")} | ${this.client.users.get(newMap.user).tag.padEnd(30, " ")}::  ${newMap.xp.toLocaleString()} XPs`)
            );

        leaderboard.push(`\n • ${pos !== -1 ? pos + 1 : "???"} | ${msg.author.tag.padEnd(30, " ")}::  ${this.client.users.get(msg.author.id).configs.xp.toLocaleString()} XPs`);
        leaderboard.push("--------------------------------------------------");
        return msg.channel.send(`${leaderboard.join("\n")}\n Page ${index + 1} / ${totalPages || 1} - ${userPos.length} Total Users`, { code: "asciidoc" });
    }

};
