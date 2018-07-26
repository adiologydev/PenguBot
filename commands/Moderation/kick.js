const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["kickmember"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "KICK_MEMBERS"],
            description: language => language.get("COMMAND_KICK_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:user> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        const user = await msg.guild.members.fetch(member.id).catch(() => msg.reply("There was an error, maybe the person left, was kicked or was banned."));

        if (user.id === msg.author.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_KICK_YOURSELF")}***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_KICK_PENGU")}***`);
        if (user.kickable === false) return msg.reply(`<:penguError:435712890884849664> ***${msg.language.get("MESSAGE_KICK_CANT")}***`);

        reason = reason.length > 0 ? `${reason.join(" ")}\nBanned By: ${msg.author.tag}` : `No reason specified. Kicked By: ${msg.author.tag}`;
        await user.kick(reason);

        this.client.emit("customLogs", msg.guild, "kick", { name: "kick", reason: reason, kicker: msg.author }, member);

        return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_KICKED")}***`);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("permissions")) {
            await this.client.gateways.guilds.schema.add("permissions", {});
        }
        if (!this.client.gateways.guilds.schema.permissions.has("admins")) {
            await this.client.gateways.guilds.schema.permissions.add("admins", { type: "User", array: true, configurable: false });
        }
        if (!this.client.gateways.guilds.schema.permissions.has("mods")) {
            await this.client.gateways.guilds.schema.permissions.add("mods", { type: "User", array: true, configurable: false });
        }
        if (!this.client.gateways.guilds.schema.logs.has("kick")) {
            await this.client.gateways.guilds.schema.logs.add("kick", { type: "boolean", default: false });
        }
    }

};
