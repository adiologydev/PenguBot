const Command = require("../../lib/structures/KlasaCommand");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            permissionLevel: 0,
            aliases: ["snowflake", "sendsnowflakes"],
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_SNOWFLAKES_DESCRIPTION"),
            usage: "[user:username] [amount:integer]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [user, amount]) {
        await msg.author.settings.sync(true);
        if (!user) return msg.reply(`❄ | **Your account balance is:** ${msg.author.settings.get("snowflakes").toLocaleString()} Snowflakes.`);
        if (!amount) return msg.reply("You've not specified the amount of **Snowflake(s)** to send.");
        if (amount <= 0) return msg.reply("Invalid amount of snowflakes, minimum 1 snowflake.");

        const currSnowflakes = msg.author.settings.get("snowflakes");
        if (amount > currSnowflakes) return msg.reply("Your account balance is low, please enter an amount which you have available.");
        if (user.bot) return msg.reply("You can not send Snowflakes to bots.");
        if (msg.author.id === user.id) return msg.reply("You can not send Snowflakes to yourself.");

        const userSnowflakes = user.settings.get("snowflakes");
        const confirm = await msg.prompt(`${msg.author}, Please confirm the transfer of ❄ **${amount.toLocaleString()} Snowflake(s)** to ${user} by typing \`YES\` or \`NO\`.`);

        if (confirm.content.toLowerCase() === "yes" || confirm.content.toLowerCase() === "y") {
            await user.settings.sync(true);
            await msg.author.settings.update("snowflakes", currSnowflakes - amount);
            await user.settings.update("snowflakes", userSnowflakes + amount);
            return msg.reply(`❄ | **You've sent \`${amount}\` Snowflake(s) to ${user}!**`);
        } else {
            return msg.reply(`❄ | **You've cancelled the transaction or the input was invalid.**`);
        }
    }

};
