const { Command } = require("klasa");
const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
const reels = [
    ["🍒", "💰", "⭐", "🎲", "💎", "❤", "⚜", "🔅", "🎉"],
    ["💎", "🔅", "❤", "🍒", "🎉", "⚜", "🎲", "⭐", "💰"],
    ["❤", "🎲", "💎", "⭐", "⚜", "🍒", "💰", "🎉", "🔅"]
];

const values = {
    "💎": 10,
    "⚜": 4,
    "💰": 4,
    "❤": 3,
    "⭐": 3,
    "🎲": 2,
    "🔅": 2,
    "🎉": 2,
    "🍒": 2
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["gambleslots", "slot"],
            botPerms: ["SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_SLOTS_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, { coins }) {
        const roll = this.generateRoll();
        let winnings = 0;

        combinations.forEach(combo => {
            if (roll[combo[0]] === roll[combo[1]] && roll[combo[1]] === roll[combo[2]]) {
                winnings += values[roll[combo[0]]] * coins;
            }
        });

        if (winnings === 0) {
            return msg.channel.send({
                embed: {
                    color: 0xBE1931,
                    description: msg.language.get("COMMAND_SLOTS_NO_WINNINGS", msg.author, this.showRoll(roll))
                }
            });
        }
        return msg.channel.send({
            embed: {
                color: 0x5C913B,
                description: msg.language.get("COMMAND_SLOTS_WINNINGS", msg.author, this.showRoll(roll))
            }
        });
    }

    showRoll(roll) {
        return `
${roll[0]}ーー${roll[1]}ーー${roll[2]}
|        |   |         |   |        |
${roll[3]}ーー${roll[4]}ーー${roll[5]}
|        |   |         |   |        |
${roll[6]}ーー${roll[7]}ーー${roll[8]}
`;
    }

    generateRoll() {
        const roll = [];
        reels.forEach((reel, index) => {
            const rand = Math.floor(Math.random() * reel.length);
            roll[index] = rand === 0 ? reel[reel.length - 1] : reel[rand - 1];
            roll[index + 3] = reel[rand];
            roll[index + 6] = rand === reel.length - 1 ? reel[0] : reel[rand + 1];
        });

        return roll;
    }

};
