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

        let prefixHelp;
        if (msg.guild) prefixHelp = `PenguBot's Prefix ${msg.guild ? `in ${msg.guild.name} is \`${msg.guild.settings.get("prefix")}\`. i.e. \`${msg.guild.settings.get("prefix")}dog\`` : `is \`p!\`. i.e. \`p!dog\``}`;

        const embed = new MessageEmbed()
            .setAuthor("PenguBot - Help", this.client.user.displayAvatarURL(), "https://www.pengubot.com")
            .setDescription([prefixHelp,
                "",
                `❯ **List of Commands:** [PenguBot.com/commands](https://www.pengubot.com/commands)`,
                `❯ **Official Discord Server:** [PenguBot.com/support](https://www.pengubot.com/support)`,
                `❯ **Add PenguBot to Your Server:** [PenguBot.com/invite](https://www.pengubot.com/invite)`,
                `❯ **PenguBot Premium:** [PenguBot.com/premium](https://pengubot.com/premium)`])
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter("PenguBot.com");

        return msg.sendEmbed(embed);
    }

};
