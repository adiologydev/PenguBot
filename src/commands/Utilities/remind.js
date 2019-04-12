const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["remindme", "setreminder", "remindmein"],
            requiredPermissions: ["MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_REMIND_DESCRIPTION"),
            usage: "[Time:time] [Message:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [time, ...message]) {
        if (!time && !message.length) {
            const reminders = this.client.schedule.tasks.filter(u => u.data.user === msg.author.id);
            if (!reminders.length) return msg.reply(`${this.client.emotes.cross} ***No existings tasks found. Use \`${msg.guild.settings.prefix}remind <time> <messagE>\` to create a reminder.***`);
            // todo add a display menu or whatever
        }
        if (!time || !message.length) return msg.reply(`${this.client.emotes.cross} ***Please provide the time and the message together in order to work.***`);
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
