const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["softbanmember"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: language => language.get("COMMAND_SOFTBAN_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:membername> [days:int{1,7}] [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, days = 1, ...reason]) {
        if (member.id === msg.author.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_YOURSELF")}***`);
        if (member.id === this.client.user.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_PENGU")}***`);
        if (!member.bannable) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_CANT")}***`);

        reason = reason.length > 0 ? `${reason.join(" ")}\nBanned By: ${msg.author.tag}` : `No reason specified.\nBanned By: ${msg.author.tag}`;
        await member.ban({ days: days, reason: reason });
        msg.guild.members.unban(member.user.id);

        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.user.tag} ${msg.language.get("MESSAGE_SOFTBANNED")}***`);
    }

};
