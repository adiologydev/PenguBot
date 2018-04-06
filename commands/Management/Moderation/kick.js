const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["kickmember"],
            permLevel: 5,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "KICK_MEMBERS"],
            description: (msg) => msg.language.get("COMMAND_KICK_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:user>",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        const user = msg.guild.members.get(member.id);
        await user.kick().then(() => {
            msg.channel.send(`<:penguCheck1:431440099675209738> ***${member.tag} ${msg.language.get("MESSAGE_KICKED")}***`);
        });
    }

};
