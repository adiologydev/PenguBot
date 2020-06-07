const { Command, ModLog, klasaUtil, MessageEmbed } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            permissionLevel: 3,
            runIn: ["text"],
            description: language => language.get("COMMAND_REASON_DESCRIPTION"),
            usage: "<selected:integer> [reason:string] [...]",
            usageDelim: " "
        });
    }

    async run(msg, [selected, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        const logs = msg.guild.settings.get("modlogs");
        const log = logs[selected];
        if (!log) return msg.sendMessage(`${this.client.emotes.cross} ${msg.author}, That case could not be found, please try another ID.`);

        if (!msg.guild.settings.get("channels.modlogs")) return msg.sendMessage(`${this.client.emotes.cross} Modlogs channel not found. Please do \`${msg.guild.settings.get("prefix")}modlogschannel <channel>\` to set it.`);
        const channel = msg.guild.channels.get(msg.guild.settings.get("channels.modlogs"));
        if (!channel) return msg.sendMessage(`${this.client.emotes.cross} Modlogs channel not found. Please do \`${msg.guild.settings.get("prefix")}modlogschannel <channel>\` to set it.`);

        const mod = await this.client.users.fetch(log.moderator);
        const muser = await this.client.users.fetch(log.user);

        const messages = await channel.messages.fetch({ limit: 100 });
        const message = messages.find(mes => mes.author.id === this.client.user.id &&
            mes.embeds.length > 0 &&
            mes.embeds[0].type === "rich" &&
            mes.embeds[0].footer && mes.embeds[0].footer.text === `Case: ${selected}`
        );

        if (message) {
            const [embed] = message.embeds;
            const [type, user] = embed.description.split("\n");
            embed.description = [
                type,
                user,
                `**❯ Reason**: ${reason}`
            ].join("\n");
            await message.edit({ embed });
        } else {
            const embed = new MessageEmbed()
                .setAuthor(mod.tag)
                .setColor(ModLog.color(log.type))
                .setDescription([
                    `**❯ Type**: ${log.type[0].toUpperCase() + log.type.slice(1)}`,
                    `**❯ User**: ${muser.tag} (${muser.id})`,
                    `**❯ Reason**: ${reason}`
                ].join("\n"))
                .setFooter(`Case: ${selected}`)
                .setTimestamp();
            await channel.send({ embed });
        }

        const oldReason = log.reason;

        logs[selected].reason = reason;
        await msg.guild.settings.update("modlogs", logs);

        return msg.send(`${this.client.emotes.check} Case ${selected} has been updated.${klasaUtil.codeBlock("http", [
            `Old reason : ${oldReason || "No Reason Specified."}`,
            `New reason : ${reason}`
        ].join("\n"))}`);
    }

};
