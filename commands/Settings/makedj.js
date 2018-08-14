const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["makepengudj", "createdj", "createdjrole"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_MAKE_DJ_DESCRPTION"),
            usage: "<member:user>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        if (msg.guild.settings.permissions.dj.indexOf(member.id) !== -1) {
            await msg.guild.settings.update("permissions.dj", member.id, { action: "remove" });
            return msg.sendMessage(`<:penguError:435712890884849664> ***${member.tag} ${msg.language.get("MESSAGE_DJ_REMOVE")}***`);
        } else {
            await msg.guild.settings.update("permissions.dj", member.id, { action: "add" });
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_DJ_ADD")}***`);
        }
    }

};
