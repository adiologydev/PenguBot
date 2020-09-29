const { Argument } = require("klasa");

module.exports = {
    name: "sendchannel",
    aliases: ["channelsend"],
    run: ctx => {
        const [id, message] = ctx.value;
        if (!id || !message) throw "You must provide a valid channel ID and content.";
        let channel;
        if (Argument.regex.channel.test(id)) {
            channel = ctx.guild.channels.cache.get(id);
        } else {
            channel = ctx.guild.channels.cache.find(chan => chan.name === id);
        }
        if (!channel || channel.type === "voice") throw "An invalid channel or channel type was specified.";
        if (!channel.postable) throw "I do not have permissions to send messages to that channel.";
        return channel.sendMessage(message);
    }
};
