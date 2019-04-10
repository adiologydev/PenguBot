const { Command, ModLog } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["kickmember"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "KICK_MEMBERS"],
            description: language => language.get("COMMAND_KICK_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:membername> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        if (member.id === msg.author.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_KICK_YOURSELF")}***`);
        if (member.id === this.client.user.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_KICK_PENGU")}***`);

        if (member.roles.highest.position >= msg.member.roles.highest.position) {
            return msg.send(`${this.client.emotes.cross} ***Target member is higher in role hierarchy than you.***`);
        } else if (member.kickable === false) {
            return msg.send(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_KICK_CANT")}***`);
        }

        await member.kick(reason);

        if (msg.guild.settings.channels.modlogs) {
            await new ModLog(msg.guild)
                .setType("kick")
                .setModerator(msg.author)
                .setUser(member.user)
                .setReason(reason)
                .send();
        }

        return msg.sendMessage(`${this.client.emotes.check} ***${member.user.tag} ${msg.language.get("MESSAGE_KICKED")}***`);
    }

};
