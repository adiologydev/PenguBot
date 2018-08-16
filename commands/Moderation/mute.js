const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["togglemute", "unmute"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_MUTE_DESCRPTION"),
            usage: "<member:user>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        const user = await msg.guild.members.fetch(member.id).catch(() => null);

        if (user.id === msg.author.id) return msg.reply(`<:penguError:435712890884849664> ***You can not mute yourself...***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguError:435712890884849664> ***Why would you want to mute Pengu?***`);

        if (!msg.guild.roles.find(r => r.name === "PENGU_MUTED")) {
            const newRole = await msg.guild.roles.create({
                data: {
                    name: "PENGU_MUTED",
                    permissions: ["READ_MESSAGES"]
                }
            });
            for (const chs of msg.guild.channels) {
                await chs.updateOverwrite(newRole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`).catch(() => null);
            }
        }

        const role = msg.guild.roles.find(r => r.name === "PENGU_MUTED");
        if (!role) return msg.reply("There was an error, I couldn't find the `PENGU_MUTED` role! Please try again or contact us at: https://discord.gg/kWMcUNe");

        if (user.roles.has(role.id)) {
            await user.roles.remove(role).catch(() => null);
            this.client.emit("customLogs", msg.guild, "unmute", { name: "mute", muter: msg.author }, member);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_UNMUTED")}***`);
        } else {
            await user.roles.add(role).catch(() => null);
            this.client.emit("customLogs", msg.guild, "mute", { name: "mute", muter: msg.author }, member);
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_MUTED")}***`);
        }
    }

};
