const { Command, ModLog } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            permissionLevel: 4,
            runIn: ["text"],
            description: language => language.get("COMMAND_WARN_DESCRIPTION"),
            usage: "<member:membername> [reason:string]",
            usageDelim: " "
        });
    }

    async run(msg, [member, reason]) {
        reason = reason ? reason : null;

        if (member.roles.highest.position >= msg.member.roles.highest.position) {
            return msg.reply(`${this.client.emotes.cross} ***Target member is higher in role hierarchy than you.***`);
        }

        if (msg.guild.settings.channels.modlogs) {
            new ModLog(msg.guild)
                .setType("warn")
                .setModerator(msg.author)
                .setUser(member.user)
                .setReason(reason)
                .send();
        }

        return msg.send(`${this.client.emotes.check} ***This user has been sucessfully warned:*** ${member.user.tag}${reason ? `\nReason: ${reason}` : ""}`);
    }

};
