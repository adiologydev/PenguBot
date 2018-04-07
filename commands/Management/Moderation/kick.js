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
        reason = reason ? reason.join(" ") : msg.language.get("MESSAGE_KICK_NO_REASON");
        await user.kick(reason).then(() => {
            msg.channel.send(`<:penguCheck1:431440099675209738> ***${member.tag} ${msg.language.get("MESSAGE_KICKED")}***`);
        });
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
