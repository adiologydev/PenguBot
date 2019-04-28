/* eslint-disable complexity */
const { Task } = require("klasa");

module.exports = class extends Task {

    async run() {
        const guilds = await this.provider.getAll("guilds");

        const promises = [];
        for (const guild of guilds) {
            const settings = {};
            settings.id = guild.id;

            const { prefix, language, disabledCommands, customcmds, logs, disabledCommandsGroup, automod, permissions, autoroles, starboard, selfroles, levelroles, musicVolume, leveltype, messages: { join, leave }, loggingChannel, djOnly, levelup } = guild;
            if (prefix) settings.prefix = prefix;
            if (language) settings.language = language;
            if (disabledCommands) settings.disabledCommands = disabledCommands;

            if (permissions) {
                if (permissions.mods) settings.users.mod = permissions.mods;
                if (permissions.admins) settings.users.admin = permissions.admins;
                if (permissions.dj) settings.users.dj = permissions.dj;
            }

            if (autoroles) {
                if (autoroles.roles) settings.roles.autorole = autoroles.roles;
                settings.toggles.autorole = autoroles.enabled;
            }

            if (selfroles) {
                if (selfroles.roles) settings.roles.selfrole = selfroles.roles;
                settings.toggles.selfrole = selfroles.enabled;
            }

            if (levelroles) {
                if (levelroles.roles) settings.roles.levelrole = levelroles.roles;
                settings.toggles.levelroles = levelroles.enabled;
            }

            if (join) {
                if (join.channel) settings.channels.join = join.channel;
                if (join.message) settings.messages.join = join.message;
                settings.toggles.joinmsg = join.enabled;
            }

            if (leave) {
                if (leave.channel) settings.channels.leave = leave.channel;
                if (leave.message) settings.messages.leave = leave.message;
                settings.toggles.leavemsg = leave.enabled;
            }

            if (loggingChannel) settings.channels.logs = loggingChannel;
            if (musicVolume) settings.misc.volume = musicVolume;
            if (leveltype) settings.misc.leveluptype = leveltype;

            if (automod) {
                if (automod.filters) settings.automod.perspective = automod.filters;
                settings.toggles.perspective = automod.enabled;
                settings.automod.invites = automod.invites;
            }

            if (disabledCommandsGroup) settings.disabledCommandsGroup = disabledCommandsGroup;

            settings.toggles.djmode = djOnly;
            settings.toggles.levelup = levelup;

            if (customcmds) {
                if (customcmds.cmds) settings.customcmds = customcmds.cmds;
                settings.toggles.customcmds = customcmds.enabled;
            }

            if (starboard) {
                if (starboard.channel) settings.starboard.channel = starboard.channel;
                if (starboard.required) settings.starboard.required = starboard.required;
                settings.toggles.starboard = starboard.enabled;
            }

            if (logs) settings.serverlogs = logs;

            promises.push(this.provider.replace("guild", guild.id, settings));
        }

        console.log(`[TRANSFER] Transferring Settings for ${promises.length} Guilds.`);
        await Promise.all(promises);
    }

    get provider() {
        return this.client.providers.default;
    }

};
