const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permLevel: 0,
            aliases: ["dailies"],
            botPerms: ["USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_DAILY_DESCRIPTION"),
            usage: "[user:user]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user = msg.author]) {
        if (user.bot) {
            return msg.channel.send("❄ | ***You can not give your daily Snowflakes to a bot!***");
        }
        if (msg.author.configs.get("daily-cooldown") > 0) {
            const now = Date.now();
            const last = msg.author.configs.get("daily-cooldown");
            const diff = now - last;
            const next = 86400000 - diff;

            const hours = Math.floor(next / 3600000);
            const minutes = Math.floor((next / 60000) - (hours * 60));
            const seconds = (next / 1000) - ((hours * 3600) + (minutes * 60));
            const timeLeft = `${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds`;

            if (diff >= 86400000) {
                user.configs.update("snowflakes", user.configs.snowflakes + 100);
                user.configs.update("daily-cooldown", Date.now());
                return msg.reply(`❄ | ***You have claimed your 100 Snowflakes for today!***`);
            } else {
                return msg.channel.send(`❄ | ***You can claim your daily Snowflakes in ${timeLeft}!***`);
            }
        } else {
            user.configs.update("snowflakes", user.configs.snowflakes + 100);
            user.configs.update("daily-cooldown", Date.now());
            return msg.reply(`❄ | ***You have claimed your 100 Snowflakes for today!***`);
        }
    }

    async init() {
        if (!this.client.gateways.users.schema.has("daily-cooldown")) {
            this.client.gateways.users.schema.add("daily-cooldown", { type: "integer", default: 0, configurable: false });
        }
    }

};
