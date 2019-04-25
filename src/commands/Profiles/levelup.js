const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            subcommands: true,
            runIn: ["text"],
            cooldown: 10,
            aliases: ["changelevelup", "levelups"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LEVELUP_DESCRIPTION"),
            usage: "<toggle|type> [type:string]",
            usageDelim: " "
        });
    }

    async toggle(msg) {
        if (msg.guild.settings.levelup) {
            await msg.guild.settings.update("levelup", false);
            return msg.sendMessage(`${this.client.emotes.check} ***Level Up announcements have been Disabled!***`);
        } else {
            await msg.guild.settings.update("levelup", true);
            return msg.sendMessage(`${this.client.emotes.check} ***Level Up announcements have been Enabled!***`);
        }
    }

    async type(msg, [type]) {
        if (!type) throw `${this.client.emotes.cross} ***You must enter a type of Level Up you want to show. Types are: \`guild\` or \`global\`***`;
        if (type.match(/global/i)) {
            if (msg.guild.settings.leveltype === "user") throw `${this.client.emotes.check} **Global** type of Level Ups are already set, try **guild** instead.`;
            await msg.guild.settings.update("leveltype", "user");
            return msg.sendMessage(`${this.client.emotes.check} **Global** type Level Up announcements have been Enabled!`);
        } else if (type.match(/guild/i)) {
            if (msg.guild.settings.leveltype === "guild") throw `${this.client.emotes.check} **Guild** type of Level Ups are already set, try **global** instead.`;
            await msg.guild.settings.update("leveltype", "guild");
            return msg.sendMessage(`${this.client.emotes.check} **Guild** type Level Up announcements have been Enabled!`);
        } else {
            return msg.sendMessage(`${this.client.emotes.cross} ***Invalid Type, choose from \`global\` or \`guild\` only.***`);
        }
    }

};
