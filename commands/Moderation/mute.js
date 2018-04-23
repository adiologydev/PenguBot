const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["togglemute", "unmute"],
            permLevel: 4,
            botPerms: ["MANAGE_ROLES", "USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_MUTE_DESCRPTION"),
            usage: "<member:user>",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        const user = msg.guild.members.get(member.id);

        if (!msg.guild.roles.find("name", "PENGU_MUTED")) {
            await msg.guild.roles.create({
                data: {
                    name: "PENGU_MUTED",
                    permissions: ["READ_MESSAGES"]
                }
            });
        }

        const role = msg.guild.roles.find("name", "PENGU_MUTED");

        if (user.roles.exists("id", role.id)) {
            await user.roles.remove(role).catch(console.error);
            msg.guild.channels.forEach(async c => {
                await c.overwritePermissions({
                    overwrites: [{
                        id: role.id,
                        denied: ["ADD_REACTIONS", "CONNECT"]
                    }],
                    reason: "Mute Command was executed."
                });
            });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_UNMUTED")}***`);
        } else {
            await user.roles.add(role).catch(console.error);
            msg.guild.channels.forEach(async c => {
                await c.overwritePermissions({
                    overwrites: [{
                        id: role.id,
                        denied: ["ADD_REACTIONS", "CONNECT"]
                    }],
                    reason: "Mute Command was executed."
                });
            });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_MUTED")}***`);
        }
    }

};
