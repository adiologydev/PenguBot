const { Builder } = require("breadtags");
const { Argument } = require("klasa");

module.exports = new Builder()
    .setDescription("Sends a message to the provided channel.")
    .setType(["sendchannel", "channelsend"])
    .hasAction()
    .requiredArgs(1)
    .setProcess(ctx => {
        const [id, message] = ctx.value;
        if (!id || !message) throw "You must provide a valid channel ID and content.";
        let channel;
        if (Argument.regex.channel.test(id)) {
            channel = ctx.guild.channels.get(id);
        } else {
            channel = ctx.guild.channels.find(chan => chan.name === id);
        }
        if (!channel || channel.type === "voice") throw "An invalid channel or channel type was specified.";
        if (!channel.postable) throw "I do not have permissions to send messages to that channel.";
        return channel.sendMessage(message);
    });
