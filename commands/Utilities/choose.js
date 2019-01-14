const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 5,
            aliases: ["pick", "random"],
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_CHOOSE_DESCRIPTION"),
            usage: "<choices:string> [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [choices]) {
        return msg.reply(choices.length === 1 ? `${this.client.emotes.cross} ***${msg.language.get("ER_CHOICES_SENSE")}***` : `${this.client.emotes.check} ${msg.language.get("CHOICE_SELECT")} ***"${choices[Math.floor(Math.random() * choices.length)]}"***`);
    }

};
