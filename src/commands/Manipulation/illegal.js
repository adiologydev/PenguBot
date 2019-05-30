const { Command } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["isnowillegal", "trumpillegal"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_ILLEGAL_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<name:string>"
        });
    }

    async run(msg, [name]) {
        const image = await this.client.funcs.images("generate/illegal", { text: name })
            .catch(() => null);
        if (!image) return msg.sendMessage(`${this.client.emotes.cross} You got Trumped, couldn't create a new bill! Try something else.`);

        return msg.channel.sendFile(image);
    }

    async createImage(text) {
        const image = await this.client.funcs.images("generate/illegal", { text: text })
            .catch(() => null);
        return image;
    }

};
