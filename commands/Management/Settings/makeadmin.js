const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["setadmin", "addadmin", "deladmin", "removeadmin", "toggleadmin"],
            permLevel: 6,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["staff-admins"],
            description: (msg) => msg.language.get("COMMAND_MAKE_ADMIN_DESCRPTION"),
            usage: "<member:user>",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        if (msg.guild.configs.get("staff-admins").indexOf(member.id) !== -1) {
            await msg.guild.configs.update("staff-admins", member.id, { action: "remove" });
            return msg.channel.send(`<:penguCross:432966551746904071> ***${member.tag} ${msg.language.get("MESSAGE_ADMIN_REMOVE")}***`);
        } else {
            await msg.guild.configs.update("staff-admins", member.id, { action: "add" });
            return msg.channel.send(`<:penguCheck1:431440099675209738> ***${member.tag} ${msg.language.get("MESSAGE_ADMIN_ADD")}***`);
        }
    }

};
