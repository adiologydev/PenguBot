const { Command } = require("discord.js-commando");
const Compliments = [
    "You're my kind of weird.",
    "I love you more than tea.",
    "You're a Michelin Star human.",
    "You're a chocolate Hobnob in a jar of Rich Teas.",
    "You've really nailed being a human. Good job.",
    "You are wonderfully odd.",
    "You are the last minute goal in the cup final.",
    "You're tougher than my wifi password.",
    "You are a walking high-five.",
    "You’d win the Saturday Kitchen omelette challenge.",
    "You could be a part-time model.",
    "I like your face.",
    "You're wise and all knowing, like a mighty owl."
];

module.exports = class ComplimentCMD extends Command {

    constructor(client) {
        super(client, {
            name: "compliment",
            group: "fun",
            memberName: "compliment",
            description: "Compliments a person mentioned.",
            usage: ["<prefix>compliment <user:mention>"],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: "user",
                prompt: "Mention a user who I should complement.",
                type: "user"
            }],
            guildOnly: true
        });
    }

    async run(msg, { user }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        return msg.say(`${user}, you know what?  ${Compliments[Math.floor(Math.random() * Compliments.length)]}`);
    }

};
