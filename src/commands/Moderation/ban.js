const Command = require("../../lib/structures/KlasaCommand");
const ModLog = require("../../lib/structures/ModLog");
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
            usage: "<user:username> [days:int{1,14}] [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user, days = 0, ...reason]) {
        reason = reason.length > 0 ? reason.join(" ") : null;

        if (user.id === msg.author.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_BAN_YOURSELF")}***`);
        if (user.id === this.client.user.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_BAN_PENGU")}***`);

        let target = await msg.guild.members.fetch(user.id).catch(() => null);

        if (target) {
            if (target.roles.highest.position >= msg.member.roles.highest.position) {
                return msg.reply(`${this.client.emotes.cross} ***Target member is higher in role hierarchy than you.***`);
            } else if (!target.bannable) {
                return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_BAN_CANT")}***`);
            }
        } else {
            target = user;
        }

        const msgDays = msg.flags.days;
        if (!typeof Number(msgDays) === Number && (Number(msgDays) < 1 || Number(msgDays) >= 8)) throw `${this.client.emotes.cross} ***Invalid days of messages to be deleted***`;

        await msg.guild.members.ban(target, { reason: reason ? reason : `No Reason Specified - ${msg.author.tag}`, days: days <= 7 ? days : 0 }).catch(() => msg.reply(`${this.client.emotes.cross} There was an error.`));

        if (msg.guild.settings.channels.modlogs) {
            new ModLog(msg.guild)
                .setType("ban")
                .setModerator(msg.author)
                .setReason(reason)
                .setUser(user)
                .send();
        }

        if (days >= 0) {
            await this.client.schedule.create("timedBan", new Date(Date.now() + (1000 * 60 * 60 * 24 * days)), { data: { guildID: msg.guild.id, userID: user.id }, catchUp: true });
        }

        return msg.sendMessage(`${this.client.emotes.check} ***${user.tag ? user.tag : user.user.tag} ${msg.language.get("MESSAGE_BANNED")} ${days >= 0 ? `Days: ${days}` : ""}***`);
    }

};
