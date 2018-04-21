const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permLevel: 0,
            aliases: ["snowflake", "sendsnowflakes"],
            botPerms: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_SNOWFLAKES_DESCRIPTION"),
            usage: "[user:user] [amount:integer]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user, amount]) {
        if (!user) {
            return msg.reply(`❄ | **Your account balance is:** ${msg.author.configs.snowflakes} Snowflakes.`);
        } else if (!amount) {
            return msg.reply("You've not specified the amount of **Snowflakes** to send.");
        } else {
            const currSnowflakes = msg.author.configs.snowflakes;
            if (amount >= currSnowflakes) return msg.reply("Your account balance is low, please enter an amount which you have.");
            if (user.bot) return msg.reply("You can not send Snowflakes to bot accounts.");
            if (msg.author.id === user.id) return msg.reply("You can not send Snowflakes to yourself.");

            const userSnowflakes = user.configs.snowflakes;
            msg.author.configs.update("snowflakes", currSnowflakes - amount);
            user.configs.update("snowflakes", userSnowflakes + amount);
            return msg.reply(`❄ | **You've sent \`${amount}\` Snowflake(s) to ${user}!**`);
        }
    }

};
