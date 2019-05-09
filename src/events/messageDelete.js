const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(message) {
        if (!message.guild || message.author.bot) return;

        await new ServerLog(message.guild)
            .setColor("red")
            .setType("messages")
            .setName("Message Deleted")
            .setAuthor(`${message.author.tag} in #${message.channel.name}`, message.author.displayAvatarURL())
            .setMessage(`**Content:**\n${message.content}`)
            .send();
    }

};
