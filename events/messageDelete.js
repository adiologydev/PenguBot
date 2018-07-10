const { Event } = require("klasa");

module.exports = class extends Event {

    async run(message) {
        if (!message.guild || message.author.bot) return;
        this.client.emit("customLogs", message.guild, "msgDelete", { channel: message.channel, name: "messages", content: message.content, image: message.attachments.size > 0 ? await this.checkAttachments(message.attachments.array()[0].url) : null }, message.author);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.logs.has("messages")) {
            this.client.gateways.guilds.schema.logs.add("messages", { type: "boolean", default: false });
        }
    }

    checkAttachments(attachment) {
        const imageLink = attachment.split(".");
        const typeOfImage = imageLink[imageLink.length - 1];
        const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
        if (!image) return null;
        return attachment;
    }

};
