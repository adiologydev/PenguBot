const { Command } = require("discord.js-commando");

module.exports = class SetGameCMD extends Command {

    constructor(client) {
        super(client, {
            name: "setgame",
            group: "core",
            aliases: ["sg"],
            memberName: "setgame",
            description: "Developer of the bot can set the game of the bot.",
            usage: ["<prefix>setgame <game>"],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "game",
                prompt: "What would you like to set Pengu's game as?\n",
                type: "string"
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    async run(msg, { game }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        this.client.shard.broadcastEval(this.client.user.setPresence({ game: { name: game, type: 0 } })
            .then(msg.channel.send(`Playing status changed to: **${game}**`))
            .catch(err => { throw err; }));
    }

};
