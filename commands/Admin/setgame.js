const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["sg"],
            permissionLevel: 10,
            usage: "<game:string>",
            description: msg => msg.language.get("COMMAND_SG_DESCRIPTION")
        });
    }

    async run(msg, [game]) {
        return this.client.user.setPresence({ activity: { name: game, status: "online" } })
            .then(msg.sendMessage(`**Playing status has been changed to:** ${game.join(" ")}`))
            .catch(err => { throw err; });
    }

};
