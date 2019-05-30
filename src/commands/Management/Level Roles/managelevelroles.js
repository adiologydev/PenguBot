const { Command } = require("../../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            subcommands: true,
            runIn: ["text"],
            cooldown: 10,
            aliases: ["managelevelrole", "addlevelrole", "removelevelrole"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LVLROLE_DESCRPTION"),
            usage: "<add|remove> <role:rolename> [level:integer]",
            usageDelim: " "
        });
    }

    async add(msg, [role, level]) {
        if (!level) throw `${this.client.emotes.cross} ***You must enter a level at which you want to award this role.***`;
        if (level <= 0) throw `${this.client.emotes.cross} ***You can't give people levels if they are level ZERO or Lower, use Autoroles instead.***`;
        const roles = msg.guild.settings.roles.levelrole;
        if (roles.find(r => r.id === role.id)) throw `${this.client.emotes.cross} ***This role already exists in the leveled roles.***`;

        const myRole = msg.guild.me.roles.highest;
        if (role.position > myRole.positon) throw `${this.client.emotes.cross} ***That given role is above my role in the guild, please change the order.***`;

        await msg.guild.settings.update("roles.levelrole", { id: role.id, lvl: level });
        return msg.sendMessage(`${this.client.emotes.check} **${role.name}** Role has been added for anyone who reaches **Level ${level}** in **${msg.guild.name}**`);
    }

    async remove(msg, [role]) {
        const levelRole = msg.guild.settings.roles.levelrole.find(r => r.id === role.id);
        if (!levelRole) throw `${this.client.emotes.cross} ***That role doesn't exist in the Level Based Roles list.***`;
        await msg.guild.settings.update("roles.levelrole", levelRole, { action: "remove" });
        return msg.sendMessage(`${this.client.emotes.check} **${role.name}** Role has been removed from Level Based Roles list.`);
    }

};
