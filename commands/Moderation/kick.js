const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["kickmember"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "KICK_MEMBERS"],
            description: language => language.get("COMMAND_KICK_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:membername> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        if (member.id === msg.author.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_KICK_YOURSELF")}***`);
        if (member.id === this.client.user.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_KICK_PENGU")}***`);
        if (!member.kickable) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_KICK_CANT")}***`);

        reason = reason.length > 0 ? `${reason.join(" ")}\nBanned By: ${msg.author.tag}` : `No reason specified. Kicked By: ${msg.author.tag}`;
        await member.kick(reason);

        this.client.emit("customLogs", msg.guild, "kick", { name: "kick", reason: reason, kicker: msg.author }, member.user);

        return msg.sendMessage(`${this.client.emotes.check} ***${member.user.tag} ${msg.language.get("MESSAGE_KICKED")}***`);
    }

};
