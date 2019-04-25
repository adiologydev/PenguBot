const { Command, klasaUtil: { isFunction }, MessageEmbed } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["commands"],
            guarded: true,
            requiredPermissions: ["EMBED_LINKS"],
            description: language => language.get("COMMAND_HELP_DESCRIPTION"),
            usage: "(Command:cmd)"
        });

        this.createCustomResolver("cmd", (arg, possible, msg) => {
            if (!arg || arg === "") return undefined;
            return this.client.arguments.get("cmd").run(arg, possible, msg);
        });
    }

    async run(msg, [cmd]) {
        if (cmd) {
            const cmdEmbed = new MessageEmbed()
                .setDescription([`❯ **Command:** ${cmd.name}`,
                    `❯ **Description:** ${isFunction(cmd.description) ? cmd.description(msg.language) : cmd.description}`,
                    `❯ **Usage:** ${cmd.usage.fullUsage(msg)}`,
                    `❯ **Extended Help:** ${isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg.language) : cmd.extendedHelp}`]);
            return msg.sendEmbed(cmdEmbed);
        }

        const embed = new MessageEmbed()
            .setAuthor("PenguBot - Help", this.client.user.displayAvatarURL(), "https://www.pengubot.com")
            .setDescription([`PenguBot's Prefix ${msg.guild ? `in ${msg.guild.name} is \`${msg.guild.settings.prefix}\`. i.e. \`${msg.guild.settings.prefix}dog\`` : `is \`p!\`. i.e. \`p!dog\``}`,
                `❯ **All Commands:** [PenguBot.com/commands](https://www.pengubot.com/commands)`,
                `❯ **PenguBot Discord:** [PenguBot.com/support](https://www.pengubot.com/support)`,
                `❯ **Invite/Add PenguBot:** [PenguBot.com/invite](https://www.pengubot.com/invite)`,
                `❯ **Support PenguBot and Premium Access:** [PenguBot.com/donate](https://pengubot.com/donate)`])
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter("PenguBot.com");

        return msg.author.sendEmbed(embed)
            .then(() => { if (msg.channel.type !== "dm") msg.sendMessage(msg.language.get("COMMAND_HELP_DM")); })
            .catch(() => { if (msg.channel.type !== "dm") msg.sendMessage(msg.language.get("COMMAND_HELP_NODM")); });
    }

};
