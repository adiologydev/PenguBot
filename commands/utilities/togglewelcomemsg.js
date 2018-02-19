const { Command } = require("discord.js-commando");

module.exports = class ToggleWelcomeCMD extends Command {

    constructor(client) {
        super(client, {
            name: "togglewelcomemsg",
            group: "utilities",
            aliases: ["togglewelcomemessage", "togglewelcome", "twm", "welcomemsgtog"],
            memberName: "togglewelcomemsg",
            guildOnly: true,
            description: "Toggle welcome messages on your server.",
            usage: ["<prefix>togglewelcomemessage"]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { guild } = msg;
        if (!guild.settings.get("settings.wlcm-main")) {
            await guild.settings.set("settings.wlcm-main", `true|${msg.channel.id}`);
            guild.settings.set("settings.wlcm-msg", "Welcome {MENTION} to {SERVER} :smiley:!");
            return msg.reply(`✅ Welcome messages are now been enabled in **#${msg.channel.name}**.`);
        } else {
            const ya = guild.settings.get("settings.wlcm-main");
            if (ya.indexOf("true") > -1) {
                await guild.settings.set("settings.wlcm-main", "false");
                return msg.reply("❌ Welcome messages are now been disabled.");
            } else {
                await guild.settings.set("settings.wlcm-main", `true|${msg.channel.id}`);
                guild.settings.set("settings.wlcm-msg", "Welcome {MENTION} to {SERVER} :smiley:!");
                return msg.reply(`✅ Welcome messages are now been enabled in **#${msg.channel.name}**.`);
            }
        }
    }

};
