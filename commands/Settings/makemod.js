const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["setmod", "addmod", "delmod", "removemod", "togglemod"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["staff-mods"],
            description: (msg) => msg.language.get("COMMAND_MAKE_MODS_DESCRPTION"),
            usage: "<member:user>",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        if (msg.guild.configs.get("staff-mods").indexOf(member.id) !== -1) {
            await msg.guild.configs.update("staff-mods", member.id, { action: "remove" });
            return msg.channel.send(`<:penguCross:432966551746904071> ***${member.tag} ${msg.language.get("MESSAGE_MOD_REMOVE")}***`);
        } else {
            await msg.guild.configs.update("staff-mods", member.id, { action: "add" });
            return msg.channel.send(`<:penguCheck1:431440099675209738> ***${member.tag} ${msg.language.get("MESSAGE_MOD_ADD")}***`);
        }
    }

};
