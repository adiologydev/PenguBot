const { Command } = require("discord.js-commando");

module.exports = class AddPatreonCommand extends Command {

    constructor(client) {
        super(client, {
            name: "addpatreon",
            aliases: ["addpatron"],
            group: "core",
            memberName: "addpatreon",
            description: "adds a patreon to the database Developers only",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "user",
                prompt: "Who would you like to add the the database?\n",
                type: "user"
            }]
        });
    }
    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }
    async run(msg, { user }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        await require.main.exports.database.query(`INSERT INTO patreons VALUES ('${user.id}', '${user.tag}')`);
        return msg.say(`Successfully added ${user.tag} to the database`);
    }

};
