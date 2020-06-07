const { Command, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            permissionLevel: 3,
            runIn: ["text"],
            description: language => language.get("COMMAND_CASE_DESCRIPTION"),
            usage: "<case:integer>"
        });
    }

    async run(msg, [selected]) {
        const log = msg.guild.settings.get("modlogs")[selected];
        if (!log) return msg.send(`${this.client.emotes.cross} ${msg.author}, That case could not be found, please try another ID.`);

        const [user, moderator] = await Promise.all([
            this.client.users.fetch(log.user),
            this.client.users.fetch(log.moderator)
        ]);

        return msg.sendEmbed(new MessageEmbed()
            .setDescription([
                `❯ **User**: ${user.tag} (${user.id})`,
                `❯ **Moderator**: ${moderator.tag} (${moderator.id})`,
                `❯ **Reason**: ${log.reason || `No Reason Specified. Use \`${msg.guild.settings.get("prefix")}reason ${log.case}\` to claim this log.`}`
            ].join("\n"))
            .setTimestamp(log.timestamp)
            .setFooter("PenguBot.com - Case Date")
            .setAuthor(`Case: ${log.case}`, this.client.user.displayAvatarURL())
            .setColor("#52c6ff"));
    }

};
