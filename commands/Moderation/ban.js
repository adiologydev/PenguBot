const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["banmember"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: language => language.get("COMMAND_BAN_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:membername> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        if (member.user.id === msg.author.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_YOURSELF")}***`);
        if (member.user.id === this.client.user.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_PENGU")}***`);
        if (!member.bannable) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_BAN_CANT")}***`);

        reason = reason.length > 0 ? `${reason.join(" ")}\nBanned By: ${msg.author.tag}` : `No reason specified.\nBanned By: ${msg.author.tag}`;
        try {
            await member.ban({ reason: reason });
        } catch (e) {
            throw "<:penguError:435712890884849664> There was an error, please try again.";
        }

        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.user.tag} ${msg.language.get("MESSAGE_BANNED")}***`);
    }

};
