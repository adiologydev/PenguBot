const { Command } = require("discord.js-commando");

module.exports = class SetWelcomeCMD extends Command {

    constructor(client) {
        super(client, {
            name: "setwelcomemsg",
            group: "utilities",
            aliases: ["setwelcomemessage", "setwelcome", "swm", "updatewelcomemessage"],
            memberName: "setwelcomemsg",
            guildOnly: true,
            description: "Set custom welcome messages on your server.",
            args: [{
                key: "message",
                type: "string",
                prompt: "Type a message you'd like to show up when a user joins.\n**{MENTION}**: Tag the user, & **{SERVER}**: The Server Name, **{DISPLAYNAME}**: User's Display Name & **{ID}**: User's Account ID.\n"
            }],
            usage: ["<prefix>setwelcomemsg <your message, **{MENTION}**: Tag the user, & **{SERVER}**: The Server Name, **{DISPLAYNAME}**: User's Display Name & **{ID}**: User's Account ID.>"]
        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.functions.isAdmin(msg);
    }

    async run(msg, { message }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { guild } = msg;

        await guild.settings.set("settings.wlcm-msg", message).catch(console.log);
        msg.reply(`✅ **Welcome Message Has been set to:** ${message}`);
    }

};
