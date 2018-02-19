const { Command } = require("discord.js-commando");

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

module.exports = class SlotMachineCommand extends Command {

    constructor(client) {
        super(client, {
            name: "slots",
            aliases: ["gambleslots", "slot"],
            group: "fun",
            memberName: "slots",
            description: "Play Slots Game and Earn Snowflakes.",
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(msg, { coins }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const roll = this.generateRoll();
        let winnings = 0;

        combinations.forEach(combo => {
            if (roll[combo[0]] === roll[combo[1]] && roll[combo[1]] === roll[combo[2]]) {
                winnings += values[roll[combo[0]]] * coins;
            }
        });

        if (winnings === 0) {
            return msg.embed({
                color: 0xBE1931,
                description: `
**${msg.author.username}, you rolled:**

${this.showRoll(roll)}
        
**You lost Better luck next time!**
`
            });
        }

        return msg.embed({
            color: 0x5C913B,
            description: `
**${msg.author.username}, you rolled:**
        
${this.showRoll(roll)}`
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
