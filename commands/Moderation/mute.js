const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["togglemute", "unmute"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_MUTE_DESCRPTION"),
            usage: "<member:user>",
            usageDelim: undefined,
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        const user = msg.guild.members.get(member.id);
        if (user.id === msg.author.id) return msg.reply(`<:penguError:435712890884849664> ***You can not mute yourself...***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguError:435712890884849664> ***Why would you want to mute Pengu?***`);

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
                await c.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`);
            });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_UNMUTED")}***`);
        } else {
            await user.roles.add(role).catch(console.error);
            msg.guild.channels.forEach(async c => {
                await c.updateOverwrite(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`);
            });
            return msg.channel.send(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_MUTED")}***`);
        }
    }

};
