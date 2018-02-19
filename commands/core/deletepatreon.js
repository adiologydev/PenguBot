const { Command } = require("discord.js-commando");

module.exports = class AddPatreonCommand extends Command {

    constructor(client) {
        super(client, {
            name: "deletepatreon",
            aliases: ["delpatron", "removepatreon"],
            group: "core",
            memberName: "deletepatreon",
            description: "removes a patreon to the database Developers only",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "user",
                prompt: "Who would you like to remove from the the database?\n",
                type: "user"
            }]
        });
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }
    async run(msg, { user }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const [rows] = await require.main.exports.database.query(`DELETE FROM patreons WHERE id = '${user.id}'`);
        if (!rows) return msg.say(`No patreon with the id of ${user.id}`);
        return msg.say(`Successfully removed ${user.tag} from the database`);
    }

};
