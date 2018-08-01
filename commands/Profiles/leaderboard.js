const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["lb", "top"],
            cooldown: 30,
            description: language => language.get("COMMAND_LEADERBOARD_DESCRIPTION"),
            usage: "[Page:integer]"
        });
    }

    async run(msg) {
        msg.sendMessage("<:penguError:435712890884849664> ***Global Leaderboards have been temporarily disabled.***");

        /* const load = await msg.sendMessage(`<a:penguLoad:435712860744581120> ***Let me process all that data through my igloo, give me a few...***`);
        const r = this.client.providers.default.db;
        let users;
        if (this.client.topCache.length) { users = this.client.topCache; } else {
            users = await r.table("users").orderBy({ index: r.desc("xp") }).pluck("id", "xp").run();
            this.client.topCache = users;
        }
        await msg.author.configs.waitSync();

        const leaderboard = [];
        const totalPages = Math.round(users.length / 10);

        const index = Page ? Page -= 1 : 0;

        if ((index > totalPages && !totalPages) || (totalPages && index + 1 > totalPages)) return msg.sendMessage(`There are only **${totalPages || 1}** page(s) in the leaderboard.`);

        leaderboard.push("=== PenguBot Global Leaderboard ===\n");
        const pos = users.findIndex(i => i.id === msg.author.id);

        const userProfiles = await Promise.all(users.slice(index * 10, (index + 1) * 10)
            .map(async user => {
                const username = await this.client.users.fetch(user.id).then(a => a.username).catch(() => null) || "N/A";
                return { xp: user.xp ? user.xp : 0, username };
            }));
        for (let i = 0; i < userProfiles.length; i++) {
            const userData = userProfiles[i];
            leaderboard.push(` • ${((index * 10) + (i + 1)).toString().padStart(2, " ")} | ${userData.username.padEnd(30, " ")}::  ${userData.xp.toLocaleString()} XP`);
        }

        const posNum = pos !== -1 ? pos + 1 : 0;
        leaderboard.push(`\n • ${posNum.toString().padStart(2, " ")} | ${msg.author.username.padEnd(30, " ")}::  ${msg.author.configs.xp.toLocaleString()} XP`);
        leaderboard.push("--------------------------------------------------");

        load.delete();
        return msg.channel.send(`${leaderboard.join("\n")}\n Page ${index + 1} / ${totalPages.toLocaleString() || 1} - ${users.length.toLocaleString()} Total Users`, { code: "asciidoc" });*/
    }

};
