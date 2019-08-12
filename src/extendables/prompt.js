const { Extendable } = require("klasa");
const { Message } = require("discord.js");

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: [Message] });
    }

    async prompt(text, time = 30000) {
        const message = await this.channel.send(text);
        const responses = await this.channel.awaitMessages(msg => msg.author === this.author, { time, max: 1 });
        message.delete();
        if (responses.size === 0) throw this.language.get("MESSAGE_PROMPT_TIMEOUT");
        return responses.first();
    }

};
