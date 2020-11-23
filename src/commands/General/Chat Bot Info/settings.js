const { Command } = require("../../../index");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 5,
            aliases: ["configure", "setup"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: "Configure PenguBot on your server.",
            extendedHelp: "No extended help available.",
            usage: "[general|music|autoroles|levelroles|selfroles|automod|logs|moderation|customcommands|greetings] [setting:string] [value:string] [...]",
            usageDelim: " ",
            subCommands: true
        });
    }

    async run(msg, [type, ...params]) {
        if (type) return this[type](msg, params);

        const prefix = msg.guild.settings.get("prefix") || "p!";
        const embed = new MessageEmbed()
            .setTitle("Settings Menu")
            .addField("⚙️ General", `${prefix}settings general`, true)
            .addField("🎵 Music", `${prefix}settings music`, true)
            .addField("🧑‍🦱 Auto Join Roles", `${prefix}settings autoroles`, true)
            .addField("⬆️ Level Based Roles", `${prefix}settings levelroles`, true)
            .addField("🙇 Self Assignable Roles", `${prefix}settings selfroles`, true)
            .addField("🤖 Auto and AI Moderation", `${prefix}settings automod`, true)
            .addField("🗨️ Logging", `${prefix}settings logs`, true)
            .addField("⚔️ Moderation", `${prefix}settings moderation`, true)
            .addField("🛠️ Custom Commands", `${prefix}settings customcommands`, true)
            .addField("💁 Welcome and Leave Messages", `${prefix}settings greetings`, true)
            .setFooter("PenguBot.com")
            .setTimestamp();

        return msg.sendEmbed(embed);
    }

    async general(msg, [setting, value]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("General Settings")
                .addField("Prefix", `${prefix}settings general prefix <prefix>`)
                .addField("Toggle a Command", `${prefix}settings general togglecmd <command>`)
                .addField("Toggle a Command Category", `${prefix}settings general togglecategory <category>`)
                .addField("Change Language", `${prefix}settings general language <language>`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "prefix": {
                await this.client.commands.get("prefix").run(msg, [value]);
                break;
            }
            case "togglecmd": {
                const arg = await this.client.arguments.get("command").run(value);
                await this.client.commands.get("disablecmd").run(msg, [arg]);
                break;
            }
            case "togglecategory": {
                await this.client.commands.get("togglecategory").run(msg, [value]);
                break;
            }
            case "language": {
                await this.client.commands.get("setlanguage").run(msg, [value]);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    async greetings(msg, [setting, ...value]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("Welcome and Leave Messages - Settings")
                .setDescription("**Tip:** You can use the following in your Welcome and Leave messages and they'll be replaced with the value automatically: `{mention}`, `{server}`, `{username}`, `{user.tag}`, `{user.id}` and `{members}`.")
                .addField("Toggle Welcome Messages", `${prefix}settings greetings togglewelcome`)
                .addField("Toggle Leave Messages", `${prefix}settings greetings toggleleave`)
                .addField("Welcome Message", `${prefix}settings greetings welcomemsg <message>`)
                .addField("Leave Message", `${prefix}settings greetings leavemsg <message>`)
                .addField("Welcome Channel", `${prefix}settings greetings welcomechannel <channel>`)
                .addField("Leave Channel", `${prefix}settings greetings leavechannel <channel>`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "togglewelcome": {
                await this.client.commands.get("togglewelcome").run(msg);
                break;
            }
            case "toggleleave": {
                await this.client.commands.get("toggleleave").run(msg);
                break;
            }
            case "welcomemsg": {
                console.log(value);
                await this.client.commands.get("setwelcomemsg").run(msg, [value.join(" ")]);
                break;
            }
            case "leavemsg": {
                await this.client.commands.get("setleavemsg").run(msg, [value.join(" ")]);
                break;
            }
            case "welcomechannel": {
                if (!value.length) return msg.reply("You must provide a channel to use this setting.");
                const arg = await this.client.arguments.get("channelname").run(value[0], null, msg);
                await this.client.commands.get("setwelcomechannel").run(msg, [arg]);
                break;
            }
            case "leavechannel": {
                if (!value.length) return msg.reply("You must provide a channel to use this setting.");
                const arg = await this.client.arguments.get("channelname").run(value[0], null, msg);
                await this.client.commands.get("setleavechannel").run(msg, [arg]);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

};
