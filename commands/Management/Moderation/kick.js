const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["kickmember"],
            permLevel: 5,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "KICK_MEMBERS"],
            description: (msg) => msg.language.get("COMMAND_KICK_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:user> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        const user = msg.guild.members.get(member.id);

        if (user.id === msg.author.id) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_KICK_YOURSELF")}***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_KICK_PENGU")}***`);
        if (user.kickable === false) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_KICK_CANT")}***`);

        reason = reason.length > 0 ? reason.join(" ") : "No reason specified.";
        await user.kick(reason);
        return msg.channel.send(`<:penguCheck1:431440099675209738> ***${member.tag} ${msg.language.get("MESSAGE_KICKED")}***`);
    }

    async init() {
        if (!this.client.gateways.guilds.schema.has("staff-admins")) {
            this.client.gateways.guilds.schema.add("staff-admins", { type: "User", array: true });
        }
        if (!this.client.gateways.guilds.schema.has("staff-mods")) {
            this.client.gateways.guilds.schema.add("staff-mods", { type: "User", array: true });
        }
    }

};
