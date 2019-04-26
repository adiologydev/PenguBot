/* eslint-disable complexity */
const { Task } = require("klasa");

module.exports = class extends Task {

    constructor(...args) {
        super(...args);
        this.provider = this.client.providers.default;
    }

    async run() {
        const guilds = this.provider.getAll("guilds");

        const promises = [];
        for (const guild of guilds) {
            const settings = {};
            settings.id = guild.id;

            const { disabledCommandsGroup, automod, permissions, autoroles, selfroles, levelroles, musicVolume, leveltype, messages: { join, leave }, loggingChannel, djOnly, levelup } = guild;
            if (!permissions) continue;
            if (permissions.mods) settings.users.mod = permissions.mods;
            if (permissions.admins) settings.users.admin = permissions.admins;
            if (permissions.dj) settings.users.dj = permissions.dj;

            if (!autoroles) continue;
            if (autoroles.roles) settings.roles.autorole = autoroles.roles;
            settings.toggles.autorole = autoroles.enabled;

            if (!selfroles) continue;
            if (selfroles.roles) settings.roles.selfrole = selfroles.roles;
            settings.toggles.selfrole = selfroles.enabled;

            if (!levelroles) continue;
            if (levelroles.roles) settings.roles.levelrole = levelroles.roles;
            settings.toggles.levelroles = levelroles.enabled;

            if (!join) continue;
            if (join.channel) settings.channels.join = join.channel;
            if (join.message) settings.messages.join = join.message;
            settings.toggles.joinmsg = join.enabled;

            if (!leave) continue;
            if (leave.channel) settings.channels.leave = leave.channel;
            if (leave.message) settings.messages.leave = leave.message;
            settings.toggles.leavemsg = leave.enabled;

            if (loggingChannel) settings.channels.logs = loggingChannel;
            if (musicVolume) settings.misc.volume = musicVolume;
            if (leveltype) settings.misc.leveluptype = leveltype;

            if (!automod) continue;
            if (automod.filters) settings.automod.perspective = automod.filters;
            settings.toggles.perspective = automod.enabled;
            settings.automod.invites = automod.invites;

            if (disabledCommandsGroup) settings.disabledCommandsGroup = disabledCommandsGroup;

            settings.toggles.djmode = djOnly;
            settings.toggles.levelup = levelup;

            promises.push(this.provider.replace("guild", guild.id, settings));
        }
        await Promise.all(promises);
    }

};
