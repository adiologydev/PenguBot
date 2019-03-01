const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["dailies"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_DAILY_DESCRIPTION"),
            usage: "[user:username]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user = msg.author]) {
        if (user.bot) {
            return msg.sendMessage("❄ | ***You can not give your daily Snowflakes to a bot!***");
        }

        await msg.author.settings.sync(true);

        const upvoter = await this.client.funcs.isUpvoter(msg.author);
        const reward = upvoter ? 300 : 100;

        if (msg.author.settings.daily > 0) {
            const now = Date.now();
            const last = msg.author.settings.daily;
            const diff = now - last;
            const next = 43200000 - diff;

            const hours = Math.floor(next / 3600000);
            const minutes = Math.floor((next / 60000) - (hours * 60));
            const seconds = (next / 1000) - ((hours * 3600) + (minutes * 60));
            const timeLeft = `${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds`;

            if (diff >= 43200000) {
                await user.settings.update([["snowflakes", user.settings.snowflakes + reward], ["daily", Date.now()]]);
                return msg.reply(`❄ | ***You have claimed your ${reward} Snowflakes for today! To gain 300 Snowflakes everyday, make sure to upvote PenguBot at <https://www.pengubot.com/upvote>***`);
            } else {
                return msg.sendMessage(`❄ | ***You can claim your daily Snowflakes in ${timeLeft}!***`);
            }
        } else {
            await user.settings.update([["snowflakes", user.settings.snowflakes + reward], ["daily", Date.now()]]);
            return msg.reply(`❄ | ***You have claimed your ${reward} Snowflakes for today! To gain 300 Snowflakes everyday, make sure to upvote PenguBot at <https://www.pengubot.com/upvote>***`);
        }
    }

};
