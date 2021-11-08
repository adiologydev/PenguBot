const { Command } = require("../../index");
const translate = require("@iamtraction/google-translate");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: language => language.get("COMMAND_TRANSLATE_DESCRIPTION"),
            usageDelim: "|",
            usage: "<content:string> <language:str>"
        });
    }

    async run(msg, [content, language]) {
        const { text } = await translate(content, { to: language })
            .catch(() => { throw "That language is not supported, please try again."; });

        return msg.sendMessage(`**Translated Message:** ${text}`);
    }

};
