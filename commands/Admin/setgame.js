const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["sg"],
            permissionLevel: 10,
            usage: "<game:string>",
            description: language => language.get("COMMAND_SG_DESCRIPTION")
        });
    }

    async run(msg, [game]) {
        await this.client.user.setPresence({ activity: { name: game, status: "online" } })
            .catch(err => { throw err; });

        return msg.sendMessage(`**Playing status has been changed to:** ${game}`);
    }

};
