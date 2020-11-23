const { Argument } = require("../index");

const regex = Argument.regex.channel;

module.exports = class extends Argument {

    async run(arg, possible, msg) {
        if (!msg.guild) throw "This command can only be used in a server.";
        const resChannel = this.resolveChannel(arg, msg.guild);
        if (resChannel) return resChannel;
        throw "That channel could not be found, please try another one.";
    }

    resolveChannel(arg, guild) {
        const channelID = regex.exec(arg);
        return (channelID !== null && guild.channels.cache.get(channelID[1])) || null;
    }

};
