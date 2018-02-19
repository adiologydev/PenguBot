const { Command } = require("discord.js-commando");

module.exports = class AddPatreonCommand extends Command {

    constructor(client) {
        super(client, {
            name: "patreons",
            aliases: ["listpatreons", "listpatrons"],
            group: "core",
            memberName: "patreons",
            description: "List patreons Developers only",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }
    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const [rows] = await require.main.exports.database.query(`SELECT * FROM patreons`);
        msg.say(rows.map(p => `Tag: ${p.tag} (${p.id})`).join("\n"));
    }

};
