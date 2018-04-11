const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["addcmd"],
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
        const cmd = msg.guild.configs.customcmds.find(c => c.name === name);
        if (cmd) return msg.reply(`<:penguCross:432966551746904071> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_EXISTS")}***`);
        await msg.guild.configs.update("customcmds", { content: content.join(" "), name: name });
        return msg.channel.send(`<:penguCheck1:431440099675209738> ***\`${name}\` ${msg.language.get("MESSAGE_CMD_ADDED")} ${msg.author.tag}!***`);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("customcmds")) {
            this.client.gateways.guilds.schema.add("customcmds", { type: "any", array: true });
        }
    }

};
