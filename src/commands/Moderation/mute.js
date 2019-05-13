/* eslint-disable no-unused-expressions */
const { Command, ModLog, Duration } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["togglemute", "unmute"],
            permissionLevel: 3,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_MUTE_DESCRPTION"),
            usage: "<member:membername> [reason:string] [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        if (member.id === msg.author.id) return msg.reply(`${this.client.emotes.cross} ***You can not mute yourself...***`);
        if (member.id === this.client.user.id) return msg.reply(`${this.client.emotes.cross} ***Why would you want to mute Pengu?***`);

        const roleID = msg.guild.settings.roles.muted;

        if (!msg.guild.roles.has(roleID)) {
            if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return msg.sendMessage(`${this.client.emotes.cross} ***I do not have \`MANAGE ROLES\` permissions. Please give me it first for this to work.`);
            const newRole = await msg.guild.roles.create({
                data: {
                    name: "PENGUMUTED",
                    permissions: ["READ_MESSAGES"]
                }
            });
            await msg.guild.settings.update("roles.muted", newRole.id);
            const promises = [];
            for (const channel of msg.guild.channels.values()) promises.push(channel.updateOverwrite(newRole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`));
            await Promise.all(promises);
        }

        const role = msg.guild.roles.get(roleID);
        if (!role) return msg.reply("There was an error, I couldn't find the Muted role! Please try again or contact us at: https://discord.gg/kWMcUNe");
        const myRole = msg.guild.me.roles.highest;
        if (role.position > myRole.positon) return msg.sendMessage(`${this.client.emotes.cross} ***The \`PENGUMUTED\` role is above my role in the guild, please change the order.***`);

        const time = msg.flags.time || msg.flags.duration || msg.flags.tempmute;
        let duration = null;
        time ? duration = new Duration(time) : null;
        if (time && (duration.offset < 1 || duration.offset > 2592000000)) throw `${this.client.emotes.cross} ***Duration is invalid, try something like 1 hour, 1 day, etc. Maximum 30 days.***`;

        if (member.roles.has(role.id)) {
            await member.roles.remove(role)
                .catch(e => msg.reply(`${this.client.emotes.cross} ***There was an error: ${e}***`));

            if (this.guild.settings.channels.modlogs) {
                await new ModLog(msg.guild)
                    .setType("unmute")
                    .setModerator(msg.author)
                    .setReason(reason)
                    .setUser(member.user)
                    .send();
            }

            return msg.sendMessage(`${this.client.emotes.check} ***${member.user.tag} ${msg.language.get("MESSAGE_UNMUTED")}***`);
        } else {
            await member.roles.add(role)
                .catch(e => msg.reply(`${this.client.emotes.cross} ***There was an error: ${e}***`));

            if (this.guild.settings.channels.modlogs) {
                await new ModLog(msg.guild)
                    .setType("mute")
                    .setModerator(msg.author)
                    .setReason(reason)
                    .setUser(member.user)
                    .send();
            }

            if (time) await this.client.schedule.create("timedMute", new Duration(time), { data: { guildID: msg.guild.id, userID: member.id }, catchUp: true });
            return msg.sendMessage(`${this.client.emotes.check} ***${member.user.tag} ${msg.language.get("MESSAGE_MUTED")}${time ? ` Temp Mute for: ${time}` : ""}***`);
        }
    }

};
