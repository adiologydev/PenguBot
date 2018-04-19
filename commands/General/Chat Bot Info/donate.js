const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["patreon", "patron"],
            guarded: true,
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: (msg) => msg.language.get("COMMAND_DONATE_DESCRIPTION")
        });
    }

    async run(msg) {
        const embed = new this.client.methods.Embed()
            .setDescription(msg.language.get("COMMAND_DONATE"))
            .setColor("RANDOM");
        return msg.sendEmbed(embed);
    }

};
