const Command = require("../../lib/structures/KlasaCommand");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            description: language => language.get("COMMAND_TRANSLATE_DESCRIPTION"),
            usageDelim: "|",
            usage: "<content:string> <language:str>"
        });
    }

    async run(msg, [content, language]) {
        return translate(content, { to: `${language}` }).then(res => msg.sendMessage(`📗 **Translated Message:** ${res.text}`))
            .catch(() => msg.sendMessage(`${this.client.emotes.cross} ***That language is not supported, please try again.***`));
    }

};
