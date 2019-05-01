const { Event } = require("klasa");
const ServerLog = require("../lib/structures/ServerLog");

module.exports = class extends Event {

    async run(oldMessage, newMessage) {
        if (this.client.ready && oldMessage.content !== newMessage.content) this.client.monitors.run(newMessage);
        if (!oldMessage.guild || oldMessage.author.bot || oldMessage.content === newMessage.content) return;

        await new ServerLog(oldMessage.guild)
            .setColor("blue")
            .setType("messages")
            .setName("Message Updated")
            .setAuthor(`${oldMessage.author.tag} in #${oldMessage.channel.name}`, oldMessage.author.displayAvatarURL())
            .setMessage(`[► View The Message](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})\n**Old:**\n${oldMessage.content}\n\n**New:**\n${newMessage.content}`)
            .send();
    }

};
