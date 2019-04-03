const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            permissionLevel: 4,
            runIn: ["text"],
            description: language => language.get("COMMAND_CASE_DESCRIPTION"),
            usage: "<case:integer>"
        });
    }

    async run(msg, [selected]) {
        const log = msg.guild.settings.modlogs.logs[selected];
        if (!log) return msg.send(`${this.client.emotes.cross} ${msg.author}, That case could not be found, please try another ID.`);

        const [user, moderator] = await Promise.all([
            this.client.users.fetch(log.user),
            this.client.users.fetch(log.moderator)
        ]);

        const embed = new MessageEmbed()
            .setDescription([
                `❯ User: ${user.tag} (${user.id})`,
                `❯ Moderator: ${moderator.tag} (${moderator.id})`,
                `❯ Reason: ${log.reason || `No Reason Specified. Use \`${this.guild.settings.prefix}reason ${this.case}\` to claim this log.`}`
            ])
            .setTimestamp(log.timestamp)
            .setFooter("PenguBot.com - Case Date")
            .setAuthor(`Case: ${log.case}`, this.client.user.displayAvatarURL())
            .setColor("#52c6ff");

        return msg.sendEmbed(embed);
    }

};
