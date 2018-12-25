const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            subcommands: true,
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 6,
            aliases: ["setxp", "setexperience", "resetxp", "resetexperience"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_MANAGEXP_DESCRIPTION"),
            usage: "<set|add|reset> <member:membername> [amount:integer]",
            usageDelim: " "
        });
    }

    async set(msg, [member, amount]) {
        if (!amount) throw `${this.client.emotes.cross} ***Amount not specified.***`;
        await member.settings.update("xp", amount);
        return msg.sendMessage(`${this.client.emotes.check} ***XP Amount Set to \`${amount}\` XP(s) for ${member.user.tag}.***`);
    }

    async add(msg, [member, amount]) {
        if (!amount) throw `${this.client.emotes.cross} ***Amount not specified.***`;
        await member.settings.update("xp", member.settings.xp + amount);
        return msg.sendMessage(`${this.client.emotes.check} ***\` ${amount}\` XP(s) Added to ${member.user.tag}.***`);
    }

    async reset(msg, [member]) {
        await member.settings.reset("xp");
        return msg.sendMessage(`${this.client.emotes.check} ***XP(s) Reset For ${member.user.tag}.***`);
    }

};
