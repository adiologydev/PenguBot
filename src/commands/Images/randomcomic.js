const { Command, MessageEmbed } = require("../../index");
const { parse } = require("node-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["comic", "comics"],
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            description: language => language.get("COMMAND_COMIC_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const res = await this.fetchURL(`https://c.xkcd.com/random/comic/`, { type: "text" })
            .catch(() => null);
        if (!res) throw `${this.client.emotes.cross} ***${msg.language.get("ER_CATS_DOGS")}***`;

        const root = parse(res);
        const img = root.querySelector("#comic").querySelector("img").getAttribute("src");
        console.log(img);

        return msg.sendEmbed(new MessageEmbed()
            .setFooter("© PenguBot.com - Comic by xkcd.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(`https:${img}`));
    }

};
