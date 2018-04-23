const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            botPerms: ["EMBED_LINKS", "ATTACH_IMAGES"],
            description: (msg) => msg.language.get("COMMAND_UPVOTE_DESCRIPTION")
        });
    }

    async run(msg) {
        const embed = new this.client.methods.Embed()
            .setDescription(msg.language.get("COMMAND_UPVOTE"))
            .setThumbnail("https://i.imgur.com/YxmvOHj.png")
            .setColor("RANDOM");
        return msg.sendEmbed(embed);
    }

};
