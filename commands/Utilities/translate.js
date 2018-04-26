const { Command } = require("klasa");
const translate = require("google-translate-api");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "translate",
            runIn: ["text"],
            description: (msg) => msg.language.get("COMMAND_TRANSLATE_DESCRIPTION"),
            usageDelim: ", ",
            usage: "<Message:msg|Content:string> <language:str>"
        });
    }

    async run(msg, [message, language]) {
        translate(message.content || message, { to: `${language}` }).then(res => {
            msg.send(`📗 **Translated Message:** ${res.text}`);
        }).catch(err => {
            console.error(err);
        });
    }

};
