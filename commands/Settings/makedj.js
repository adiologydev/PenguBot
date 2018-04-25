const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["makepengudj", "createdj", "createdjrole"],
            permLevel: 5,
            botPerms: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["staff-mods"],
            description: (msg) => msg.language.get("COMMAND_MAKE_MODS_DESCRPTION"),
            usage: "<member:user>",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        if (msg.guild.configs.get("pengu-dj").indexOf(member.id) !== -1) {
            await msg.guild.configs.update("pengu-dj", member.id, { action: "remove" });
            return msg.channel.send(`<:penguError:435712890884849664> ***${member.tag} ${msg.language.get("MESSAGE_MOD_REMOVE")}***`);
        } else {
            await msg.guild.configs.update("pengu-dj", member.id, { action: "add" });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_MOD_ADD")}***`);
        }
    }

};
