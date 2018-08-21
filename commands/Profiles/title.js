const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["settitle"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_TITLE_DESCRIPTION"),
            usage: "<title:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [title]) {
        if (title.length > 30) {
            return msg.reply("Your title can not be more than 30 characters long, please enter a smaller one.");
        }
        await msg.author.settings.sync(true);
        msg.author.settings.update("title", title);
        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Your profile title has been updated to:*** ${title}`);
    }

};
