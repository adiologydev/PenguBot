const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["changecmd"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["customcmds"],
            description: (msg) => msg.language.get("COMMAND_ADD_CMD_DESCRIPTION"),
            usage: "<name:string> <content:string> [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [name, ...content]) {
        if (this.client.commands.has(name)) return msg.reply(`<:penguCross:432966551746904071> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        const cmd = msg.guild.configs.customcmds.find(c => c.name === name);
        if (cmd) {
            await msg.guild.configs.update("customcmds", cmd, { action: "remove" }).then(() => {
                msg.guild.configs.update("customcmds", { content: content.join(" "), name: cmd.name }, { action: "add" });
            });
            return msg.channel.send(`<:penguCheck1:431440099675209738> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_UPDATED")} ${msg.author.tag}!***`);
        } else {
            return msg.reply(`<:penguCross:432966551746904071> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_NOTFOUND")}***`);
        }
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("customcmds")) {
            this.client.gateways.guilds.schema.add("customcmds", { type: "any", array: true });
        }
    }

};
