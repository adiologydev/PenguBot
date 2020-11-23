const { Command, RichDisplay, MessageEmbed } = require("../../../index");

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
            usage: "[general|music|autoroles|levelroles|selfroles|automod|logs|moderation|starboard|customcommands|greetings] [setting:string] [value:string] [...]",
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
            .addField("⭐ Starboard", `${prefix}settings starboard`, true)
            .addField("🛠️ Custom Commands", `${prefix}settings customcommands`, true)
            .addField("💁 Welcome and Leave Messages", `${prefix}settings greetings`, true)
            .setFooter("PenguBot.com")
            .setTimestamp();

        return msg.sendEmbed(embed);
    }

    // --- GENERAL SETTINGS ---
    async general(msg, [setting, value]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("⚙️ General - Settings")
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

    // --- MUSIC SETTINGS ---
    async music(msg, [setting, ...value]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("🎵 Music - Settings")
                .addField("Volume", `${prefix}settings music volume [volume]`)
                .addField("Toggle DJ Mode", `${prefix}settings music toggledj`)
                .addField("Add DJ Member/Role", `${prefix}managedj add <role|user>`)
                .addField("Remove DJ Member/Role", `${prefix}managedj remove <role|user>`)
                .addField("List DJ Members/Roles", `${prefix}managedj list`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "volume": {
                await this.client.commands.get("volume").run(msg, [value.length ? value[0] : ""]);
                break;
            }
            case "toggledj": {
                await this.client.commands.get("toggledj").run(msg);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    // --- AUTOROLES SETTINGS ---
    async autoroles(msg, [setting]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("🧑‍🦱 Auto Join Roles - Settings")
                .setDescription("**Info:** These roles get added to a user as soon as they join the server.")
                .addField("Add Auto Role", `${prefix}addautorole <role>`)
                .addField("Remove Auto Role", `${prefix}removeautorole <role>`)
                .addField("Toggle Auto Roles", `${prefix}settings autoroles toggle`)
                .addField("List Auto Roles", `${prefix}settings autoroles list`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "toggle": {
                await this.client.commands.get("toggleautoroles").run(msg);
                break;
            }
            case "list": {
                const roles = msg.guild.settings.get("roles.autorole");
                if (!roles.length) return msg.sendMessage(`${this.client.emotes.cross} There are currently no auto join roles set for this server.`);
                const pages = new RichDisplay(new MessageEmbed()
                    .setTitle("Use the reactions to change pages, select a page, or stop viewing the roles")
                    .setAuthor("List of Auto Join Roles", msg.guild.iconURL())
                    .setDescription("Scroll between pages to see the self assignable roles.")
                    .setColor("#428bca")
                );
                pages.addPage(t => t.setDescription(roles.map(role => `\`-\` ${msg.guild.roles.cache.get(role) || "Role Removed"}`).join("\n")));

                pages.run(await msg.sendMessage(`${this.client.emotes.loading} ***Loading Roles...***`), {
                    time: 120000,
                    filter: (reaction, user) => user === msg.author
                });
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    // --- LEVEL ROLES SETTINGS ---
    async levelroles(msg, [setting]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("⬆️ Level Roles - Settings")
                .setDescription("**Info:** These roles get added to a user as soon as they level up to a particular level on the server.")
                .addField("Add Level Role", `${prefix}managelevelrole add <role> <level>`)
                .addField("Remove Level Role", `${prefix}managelevelrole remove <role> <level>`)
                .addField("Toggle Level Roles", `${prefix}settings levelroles toggle`)
                .addField("List Level Roles", `${prefix}settings levelroles list`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "toggle": {
                await this.client.commands.get("togglelevelroles").run(msg);
                break;
            }
            case "list": {
                await this.client.commands.get("listlevelroles").run(msg);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    // --- SELF ROLES SETTINGS ---
    async selfroles(msg, [setting]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("🙇 Self Assignable Roles - Settings")
                .setDescription("**Info:** These roles can be self assigned or removed by a user on themselves.")
                .addField("Add/Remove Self Role", `${prefix}manageselfrole <role>`)
                .addField("Toggle Self Roles", `${prefix}settings selfroles toggle`)
                .addField("List Self Roles", `${prefix}settings selfroles list`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "toggle": {
                await this.client.commands.get("toggleselfroles").run(msg);
                break;
            }
            case "list": {
                await this.client.commands.get("selfroles").list(msg);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    // --- AUTO MODERATION SETTINGS ---
    async automod(msg, [setting]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("🤖 AI and Auto Moderation - Settings")
                .setDescription([
                    "**Info:** AI Moderation system reads the message a user has sent and according to the defined threshold it will filter out the messages to keep your server clean.",
                    "By using AI moderation, you agree to [PenguBot's Privacy Policy](https://pengubot.com/privacy)."
                ].join("\n"))
                .addField("Toggle Invites Deletion", `${prefix}settings automod invites`)
                .addField("Toggle AI Moderation Filter", `${prefix}automod toggle [filter]`)
                .addField("Change AI Filter Threshold", `${prefix}automod <filter> <value>`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "invites": {
                await this.client.commands.get("toggleinvites").run(msg);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    // --- LOGGING SETTINGS ---
    async logs(msg, [setting, ...value]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("🗨️ Logs - Settings")
                .setDescription("**Info:** Server logs are general user activity based and mod logs are based on moderative actions.")
                .addField("Server Logs Channel", `${prefix}settings logs serverchannel <channel>`)
                .addField("Toggle Server Logs", `${prefix}settings logs servertoggle [type]`)
                .addField("Moderation Logs Channel", `${prefix}settings logs modchannel <channel>`)
                .addField("Toggle Moderation Logs", `${prefix}settings logs modtoggle`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "serverchannel": {
                if (!value.length) return msg.reply("You must provide a channel to use this setting.");
                const arg = await this.client.arguments.get("channelname").run(value[0], null, msg);
                await this.client.commands.get("loggingchannel").run(msg, [arg]);
                break;
            }
            case "servertoggle": {
                await this.client.commands.get("log").run(msg, [value.length ? value[0] : null]);
                break;
            }
            case "modchannel": {
                if (!value.length) return msg.reply("You must provide a channel to use this setting.");
                const arg = await this.client.arguments.get("channelname").run(value[0], null, msg);
                await this.client.commands.get("modlogs").channel(msg, [arg]);
                break;
            }
            case "modtoggle": {
                await this.client.commands.get("modlogs").toggle(msg);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    // --- MODERATION SETTINGS ---
    async moderation(msg) {
        const prefix = msg.guild.settings.get("prefix") || "p!";
        const embed = new MessageEmbed()
            .setTitle("⚔️ Moderation - Settings")
            .addField("Add Pengu Admin User/Role", `${prefix}manageadmin add <user|role>`, true)
            .addField("Remove Pengu Admin User/Role", `${prefix}manageadmin remove <user|role>`, true)
            .addField("List Pengu Admin Users/Roles", `${prefix}manageadmin list`, true)
            .addField("Add Pengu Moderator User/Role", `${prefix}managemod add <user|role>`, true)
            .addField("Remove Pengu Moderator User/Role", `${prefix}managemod remove <user|role>`, true)
            .addField("List Pengu Moderator Users/Roles", `${prefix}managemod list`, true)
            .setFooter("PenguBot.com")
            .setTimestamp();

        return msg.sendEmbed(embed);
    }

    // --- STARBOARD SETTINGS ---
    async starboard(msg, [setting, ...value]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("⭐ Starboad - Settings")
                .addField("Toggle Starboard", `${prefix}settings starboard toggle`)
                .addField("Stars Requirement", `${prefix}settings starboard required <number>`)
                .addField("Starboard Channel", `${prefix}settings starboard channel <channel>`)
                .setFooter("PenguBot.com")
                .setTimestamp();

            return msg.sendEmbed(embed);
        }

        setting = setting.toLowerCase();
        switch (setting) {
            case "toggle": {
                await this.client.commands.get("togglestarboard").run(msg);
                break;
            }
            case "required": {
                if (!value.length) return msg.reply("You must specify a number.");
                let num;
                try {
                    num = Number.parseInt(value[0]);
                } catch (e) {
                    return msg.reply("Not a valid number.");
                }
                if (!Number.isInteger(num)) return msg.reply("That is not a valid number.");
                await this.client.commands.get("starsrequired").run(msg, [num]);
                break;
            }
            case "channel": {
                if (!value.length) return msg.reply("You must provide a channel to use this setting.");
                const arg = await this.client.arguments.get("channelname").run(value[0], null, msg);
                await this.client.commands.get("starboardchannel").run(msg, [arg]);
                break;
            }
            default: {
                await msg.reply("That setting is not a valid option, please select a valid setting to update.");
            }
        }
    }

    // --- WELCOME AND LEAVE MESSAGE SETTINGS ---
    async greetings(msg, [setting, ...value]) {
        if (!setting) {
            const prefix = msg.guild.settings.get("prefix") || "p!";
            const embed = new MessageEmbed()
                .setTitle("💁 Welcome and Leave Messages - Settings")
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
