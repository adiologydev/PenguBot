// Custom command loader for Custom commads/ todo: add server name and other variables

const talkedRecently = new Set();
module.exports = async (client, message) => {
    if (!message.guild) return;
    const { guild } = message;
    const cmdbase = message.content.split(guild.commandPrefix);
    const cmd = cmdbase[1];
    if (talkedRecently.has(message.author.id)) return;
    if (guild.settings.get(`cmd.${cmd}`)) {
        message.channel.send(guild.settings.get(`cmd.${cmd.toString()}`));
        talkedRecently.add(message.author.id);
        setTimeout(() => talkedRecently.delete(message.author.id), 15000);
    }
};
