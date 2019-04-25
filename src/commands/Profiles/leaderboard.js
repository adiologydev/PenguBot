const Command = require("../../lib/structures/KlasaCommand");

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

    async run(msg, [Page]) {
        const load = await msg.sendMessage(`${this.client.emotes.loading} ***Let me process all that data through my igloo, give me a few...***`);
        const r = this.client.providers.default.db;

        const data = await r.table("members")
            .getAll(msg.guild.id, { index: "guildID" })
            .orderBy(r.desc("xp"))
            .run(this.client.providers.default.connection);

        if (!data) throw `${this.client.emotes.cross} ***There exists no members in this guild's leaderboard, try again later.***`;
        await msg.member.settings.sync(true);

        const leaderboard = [];
        const totalPages = Math.round(data.length / 10);

        const index = Page ? Page -= 1 : 0;

        if ((index > totalPages && !totalPages) || (totalPages && index + 1 > totalPages)) return msg.sendMessage(`There are only **${totalPages || 1}** page(s) in the leaderboard.`);
        const pos = data.findIndex(i => i.id.split(".")[1] === msg.author.id);

        const userProfiles = await Promise.all(data.slice(index * 10, (index + 1) * 10)
            .map(async user => {
                const id = user.id.split(".");
                let username = await this.client.users.fetch(id[1]).then(a => a.username).catch(() => null) || "N/A";
                if (id[1] === msg.author.id) username = `${username} | (YOU)`;
                return { xp: user.xp ? user.xp : 0, username };
            }));
        for (let i = 0; i < userProfiles.length; i++) {
            const userData = userProfiles[i];
            leaderboard.push(`- [${((index * 10) + (i + 1))}] | ${userData.username}\n${userData.xp.toLocaleString().padStart(10, " ")} XP\n`);
        }

        const posNum = pos !== -1 ? pos + 1 : 0;
        leaderboard.push(`\n+ [${posNum}] | ${msg.author.username}\n${msg.member.settings.xp.toLocaleString().padStart(10, " ")} XP`);
        leaderboard.push("--------------------------------------------------");

        load.delete();
        return msg.channel.send(`🏅 **${msg.guild.name}** Guild Leaderboard\`\`\`diff\n${leaderboard.join("\n")}\n Page ${index + 1} / ${(totalPages + 1).toLocaleString() || 1} - ${data.length.toLocaleString() || 1} Total Member(s) in Leaderboard\`\`\``);
    }

};
