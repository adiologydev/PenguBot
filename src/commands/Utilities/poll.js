const Command = require("../../lib/structures/KlasaCommand");
const { post } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 10,
            aliases: ["strawpoll", "createpoll"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_POLL_DESCRIPTION"),
            usage: "<Question:string> <Options:string> [...]",
            usageDelim: "|",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Question, ...Options]) {
        if (Options.length < 2) return msg.sendMessage("<:penguError:435712890884849664> ***Less than two options are not allowed.***");
        if (Options.length > 30) return msg.sendMessage("<:penguError:435712890884849664> ***I only allow 30 or less options.***");
        try {
            const { body } = await post("https://www.strawpoll.me/api/v2/polls")
                .send({ title: Question, options: Options })
                .catch(e => {
                    Error.captureStackTrace(e);
                    return e;
                });
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***Here's the poll you requested:*** https://www.strawpoll.me/${body.id}`);
        } catch (e) {
            return msg.sendMessage("<:penguError:435712890884849664> ***There was an error trying to create this poll, please try again.***");
        }
    }

};
