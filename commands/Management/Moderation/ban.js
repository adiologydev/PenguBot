const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            bucket: 1,
            aliases: ["banmember"],
            permLevel: 5,
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: (msg) => msg.language.get("COMMAND_BAN_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:user> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        const user = msg.guild.members.get(member.id);

        if (user.id === msg.author.id) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_BAN_YOURSELF")}***`);
        if (user.id === this.client.user.id) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_BAN_PENGU")}***`);
        if (user.highestRole.position >= msg.member.highestRole.position) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_BAN_HIGH_ROLE")}***`);
        if (user.bannable === false) return msg.reply(`<:penguCross:432966551746904071> ***${msg.language.get("MESSAGE_BAN_CANT")}***`);

        reason = reason.length > 0 ? reason.join(" ") : "No reason specified.";
        await msg.guild.ban(user, { reason: reason }).then(() => {
            msg.channel.send(`<:penguCheck1:431440099675209738> ***${member.tag} ${msg.language.get("MESSAGE_BANNED")}***`);
        });
    }

};
