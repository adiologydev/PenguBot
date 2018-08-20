const { Command } = require("klasa");
const Compliments = [
    "You're my kind of weird.", "I love you more than tea.", "You're a Michelin Star human.",
    "You're a chocolate Hobnob in a jar of Rich Teas.", "You've really nailed being a human. Good job.",
    "You are wonderfully odd.", "You are the last minute goal in the cup final.",
    "You're tougher than my wifi password.", "You are a walking high-five.", "You’d win the Saturday Kitchen omelette challenge.",
    "You could be a part-time model.", "I like your face.", "You're wise and all knowing, like a mighty owl.",
    "You're an awesome friend.", "You're a gift to those around you.", "You're a smart cookie.", "You are awesome!",
    "You have impeccable manners.", "I like your style.", "You have the best laugh.", "I appreciate you.",
    "You are the most perfect you there is.", "You are enough.", "You're strong.", "Your perspective is refreshing.",
    "I'm grateful to know you.", "You light up the room.", "You deserve a hug right now.", "You should be proud of yourself.",
    "You're more helpful than you realize.", "You have a great sense of humor.", "You've got an awesome sense of humor!",
    "You are really courageous.", "Your kindness is a balm to all who encounter it.", "You're all that and a super-size bag of chips.",
    "On a scale from 1 to 10, you're an 11.", "You are strong.", "You're even more beautiful on the inside than you are on the outside.",
    "You have the courage of your convictions.", "I'm inspired by you.", "You're like a ray of sunshine on a really dreary day.",
    "You are making a difference.", "Thank you for being there for me.", "You bring out the best in other people."
];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            description: language => language.get("COMMAND_COMPLIMENT_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:username>"
        });
    }

    async run(msg, [user]) {
        return msg.sendMessage(`${user}, ***you know what? ${Compliments[Math.floor(Math.random() * Compliments.length)]}***`);
    }

};
