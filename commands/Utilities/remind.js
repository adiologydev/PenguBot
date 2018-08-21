const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["remindme", "setreminder", "remindmein"],
            requiredPermissions: ["MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_REMIND_DESCRIPTION"),
            usage: "<Time:time> <Message:string> [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [time, ...message]) {
        const r = await this.client.schedule.create("reminder", time, {
            data: {
                channel: msg.channel.id,
                user: msg.author.id,
                text: message.join(" ")
            }
        });
        return msg.reply(`<:penguSuccess:435712876506775553> ***${msg.language.get("MESSAGE_NEW_REMINDER")} \`${r.id}\`***`);
    }

};
