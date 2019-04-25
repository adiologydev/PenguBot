const Command = require("../../lib/structures/KlasaCommand");
// const translate = require("google-translate-api");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            description: language => language.get("COMMAND_TRANSLATE_DESCRIPTION"),
            usageDelim: "|",
            usage: "<Message:msg|Content:string> <language:str>"
        });
    }

    async run(msg) {
        return msg.sendMessage("This command has been temporarily disabled due to API issues. Sorry!");
        /* translate(message.content || message, { to: `${language}` }).then(res => {
            msg.send(`📗 **Translated Message:** ${res.text}`);
        }).catch(() => {
            msg.send("<:penguError:435712890884849664> ***That language is not supported, please try again.***");
        }); */
    }

};
