const { Command } = require("klasa");
const { get } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            botPerms: ["SEND_MESSAGES"],
            description: (msg) => msg.language.get("COMMAND_TRUMP_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<user:user>"
        });
    }

    async run(msg, [user]) {
        const { body } = await get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${user.username}`).catch(() => msg.say(`There was an error, I think a cat has cut the wire off, dogs don't do that.`)); // eslint-disable-line
        return msg.channel.send(`🎺 ${msg.language.get("COMMAND_TRUMP", body.message)}`);
    }

};
