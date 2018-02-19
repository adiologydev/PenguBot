const { Command } = require("discord.js-commando");

module.exports = class TemperatureCommand extends Command {

    constructor(client) {
        super(client, {
            name: "temperature",
            group: "utilities",
            aliases: ["temp", "converttemp", "ftoc", "ctof"],
            memberName: "temperature",
            throttling: {
                usages: 1,
                duration: 3
            },
            description: "Calculate temperature between Ceclius & Fahrenheit.",
            examples: ["temperature 69 C", "temperature 42 F"],

            args: [
                {
                    key: "temperature",
                    prompt: "Please enter a temperature!",
                    type: "integer"
                },
                {
                    key: "unit",
                    prompt: "Please enter a unit!",
                    type: "string"
                }
            ]
        });
    }

    async run(msg, { temperature, unit }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        if (unit === "c" || unit === "celsius" || unit === "C") {
            const newtemp = ((temperature * 9) / 5) + 32;
            return msg.say(`${Math.round(newtemp * 100) / 100} Degrees Fahrenheit`);
        }
        if (unit === "f" || unit === "fahrenheit" || unit === "F") {
            const newtemp = (temperature - 32) * 5 / 9;
            return msg.say(`${Math.round(newtemp * 100) / 100} Degrees Celsius`);
        }
        return msg.say('Please provide me with either either "C" or "F" to convert.');
    }

};
