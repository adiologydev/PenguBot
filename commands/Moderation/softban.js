const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["softbanmember"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: (msg) => msg.language.get("COMMAND_SOFTBAN_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:user> [days:int{1,7}] [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, days = 1, ...reason]) {
        const user = await msg.guild.members.fetch(member.id);

        if (user.id === msg.author.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_YOURSELF")}***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_PENGU")}***`);
        if (user.bannable === false) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_CANT")}***`);

        reason = reason.length > 0 ? `${reason.join(" ")}\nBanned By: ${msg.author.tag}` : `No reason specified.\nBanned By: ${msg.author.tag}`;
        await user.ban({ days: days, reason: reason });
        msg.guild.members.unban(user.id);

        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_SOFTBANNED")}***`);
    }

};
