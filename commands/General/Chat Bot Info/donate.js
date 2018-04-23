const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["patreon", "patron"],
            guarded: true,
            botPerms: ["EMBED_LINKS", "ATTACH_IMAGES"],
            description: (msg) => msg.language.get("COMMAND_DONATE_DESCRIPTION")
        });
    }

    async run(msg) {
        const embed = new this.client.methods.Embed()
            .setDescription(msg.language.get("COMMAND_DONATE"))
            .setThumbnail("https://i.imgur.com/bSOBK4s.png")
            .setColor("RANDOM");
        return msg.sendEmbed(embed);
    }

};
