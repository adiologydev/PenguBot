const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["listcommands"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["customcmds"],
            description: (msg) => msg.language.get("COMMAND_LIST_CMDS_DESCRIPTION"),
            usage: "",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        if (msg.guild.configs.customcmds[0] === undefined) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_NO_CMDS")}***`);
        const prefix = msg.guild.configs.get("prefix");
        const names = [];
        msg.guild.configs.customcmds.forEach(a => {
            names.push(`c.${a.name}`);
        });
        const list = names.join(",").replace(/c./g, prefix);
        return msg.channel.send(`<:penguCheck1:431440099675209738> ***${msg.language.get("MESSAGE_LIST_CMDS")} ${msg.guild.name}***:\n**⟹** ${prefix}${list.replace(/,/g, "\n**⟹** ")}`);
    }

};
