const { Command, ModLog } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["togglemute", "unmute"],
            permissionLevel: 4,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_MUTE_DESCRPTION"),
            usage: "<member:membername> [reason:string]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, reason]) {
        reason = reason ? reason : null;

        if (member.id === msg.author.id) return msg.reply(`${this.client.emotes.cross} ***You can not mute yourself...***`);
        if (member.id === this.client.user.id) return msg.reply(`${this.client.emotes.cross} ***Why would you want to mute Pengu?***`);

        const roleID = msg.guild.settings.permissions.mutedRole;

        if (!msg.guild.roles.find(r => r.id === roleID)) {
            const newRole = await msg.guild.roles.create({
                data: {
                    name: "PENGUMUTED",
                    permissions: ["READ_MESSAGES"]
                }
            });
            await msg.guild.settings.update("permissions.mutedRole", newRole.id);
            for (const chs of msg.guild.channels.values()) {
                await chs.updateOverwrite(newRole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`).catch(() => null);
            }
        }

        const role = msg.guild.roles.find(r => r.id === roleID);
        if (!role) return msg.reply("There was an error, I couldn't find the `PENGU_MUTED` role! Please try again or contact us at: https://discord.gg/kWMcUNe");
        const myRole = msg.guild.me.roles.find(r => r.managed);
        if (role.position > myRole.positon) return msg.sendMessage(`${this.client.emotes.cross} ***The \`PENGU_MUTED\` role is above my role in the guild, please change the order.***`);

        if (member.roles.has(role.id)) {
            await member.roles.remove(role).catch(() => null);
            if (msg.guild.settings.channels.modlogs) {
                new ModLog(msg.guild)
                    .setType("unmute")
                    .setModerator(msg.author)
                    .setReason(reason)
                    .setUser(member.user)
                    .send();
            }
            return msg.sendMessage(`${this.client.emotes.check} ***${member.user.tag} ${msg.language.get("MESSAGE_UNMUTED")}***`);
        } else {
            await member.roles.add(role).catch(() => null);
            if (msg.guild.settings.channels.modlogs) {
                new ModLog(msg.guild)
                    .setType("mute")
                    .setModerator(msg.author)
                    .setReason(reason)
                    .setUser(member.user)
                    .send();
            }
            return msg.sendMessage(`${this.client.emotes.check} ***${member.user.tag} ${msg.language.get("MESSAGE_MUTED")}***`);
        }
    }

};
