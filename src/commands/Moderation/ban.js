/* eslint-disable no-unused-expressions */
const { Command, ModLog, Duration } = require("../../index");

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
            usage: "<user:username> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "`--duration <1d-14d>` to Temporary Ban a User\n`--messages <1-7>` for days of messages to delete"
        });
    }

    // eslint-disable-next-line complexity
    async run(msg, [user, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        if (user.id === msg.author.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_BAN_YOURSELF")}***`);
        if (user.id === this.client.user.id) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_BAN_PENGU")}***`);

        let target = await msg.guild.members.fetch(user.id).catch(() => null);

        if (target) {
            if (target.roles.highest.position >= msg.member.roles.highest.position) return msg.reply(`${this.client.emotes.cross} ***Target member is higher in role hierarchy than you.***`);
            else if (!target.bannable) return msg.reply(`${this.client.emotes.cross} ***${msg.language.get("MESSAGE_BAN_CANT")}***`);
        } else {
            target = user;
        }

        let msgDays = msg.flagArgs.messages || msg.flagArgs.msg;
        msgDays = Number(msgDays);
        const banDays = msg.flagArgs.duration || msg.flagArgs.tempban || msg.flagArgs.time || null;
        let duration;
        banDays ? duration = new Duration(banDays) : null;

        if (msgDays && (!typeof msgDays === Number || msgDays < 1 || msgDays >= 8)) throw `${this.client.emotes.cross} ***Invalid days of messages to be deleted, 1-7 only.***`;
        if (banDays && (duration.offset < 1 || duration.offset > 2592000000)) throw `${this.client.emotes.cross} ***Invalid temporary ban days, maximum 30 days only.***`;

        await msg.guild.members.ban(target, { reason: reason ? reason : `No Reason Specified - ${msg.author.tag}`, days: msgDays });

        if (msg.guild.settings.channels.modlogs) {
            await new ModLog(msg.guild)
                .setType("ban")
                .setModerator(msg.author)
                .setReason(reason)
                .setUser(user)
                .send();
        }

        if (banDays) await this.client.schedule.create("timedBan", duration, { data: { guildID: msg.guild.id, userID: user.id }, catchUp: true });

        return msg.sendMessage(`${this.client.emotes.check} ***${user.tag ? user.tag : user.user.tag} ${msg.language.get("MESSAGE_BANNED")}${duration > 0 ? ` Temp Ban for: ${banDays}` : ""}***`);
    }

};
