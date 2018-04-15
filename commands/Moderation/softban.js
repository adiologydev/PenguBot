const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["softbanmember"],
            permLevel: 5,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: (msg) => msg.language.get("COMMAND_SOFTBAN_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:user> [days:int{1,7}] [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, days = 1, ...reason]) {
        const user = msg.guild.members.get(member.id);

        if (user.id === msg.author.id) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_BAN_YOURSELF")}***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_BAN_PENGU")}***`);
        if (user.bannable === false) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_BAN_CANT")}***`);

        reason = reason.length > 0 ? reason.join(" ") : "No reason specified.";
        await user.ban({ days: days, reason: reason });
        msg.guild.members.unban(user.id);
        return msg.channel.send(`<:penguCheck1:431440099675209738> ***${member.tag} ${msg.language.get("MESSAGE_SOFTBANNED")}***`);
    }

};
