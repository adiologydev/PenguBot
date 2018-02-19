const { Command } = require("discord.js-commando");

module.exports = class ToggleLeaveCMD extends Command {

    constructor(client) {
        super(client, {
            name: "toggleleavemsg",
            group: "utilities",
            aliases: ["toggleleavemessage", "toggleleave", "tlm", "leavemsgtog"],
            memberName: "toggleleavemsg",
            guildOnly: true,
            description: "Toggle leave messages on your server.",
            usage: ["<prefix>toggleleavemessage"]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { guild } = msg;
        if (!guild.settings.get("settings.leav-main")) {
            await guild.settings.set("settings.leav-main", `true|${msg.channel.id}`);
            guild.settings.set("settings.leav-msg", "Aw {DISPLAYNAME}, it's sad that you're leaving {SERVER} :sob:");
            return msg.reply(`✅ Leave messages are now been enabled in **#${msg.channel.name}**.`);
        } else {
            const ya = guild.settings.get("settings.leav-main");
            if (ya.indexOf("true") > -1) {
                await guild.settings.set("settings.leav-main", "false");
                return msg.reply("❌ Leave messages are now been disabled.");
            } else {
                await guild.settings.set("settings.leav-main", `true|${msg.channel.id}`);
                guild.settings.set("settings.leav-msg", "Aw {DISPLAYNAME}, it's sad that you're leaving {SERVER} :sob:");
                return msg.reply(`✅ Leave messages are now been enabled in **#${msg.channel.name}**.`);
            }
        }
    }

};
