const { Command } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            cooldown: 10, // Command Throttling in Seconds
            aliases: ['wheresmymama'], // Other than the filename, what other words should trigger the command
            permLevel: 0, // Adding Information On This Soon
            botPerms: ['SEND_MESSAGES', 'READ_MESSAGES'], // What permissions should the bot have to be able to use this command.
            description: 'Tells a random YoMomma joke.', // Command Description, will be visible in help command and website.
            usage: '', // Define the required, option or semi-required arguments here.
            extendedHelp: 'No extended help avalible.' // Extended help on how to use the command.
        });
    }

    async run(msg) {
        let { body } = await snekfetch.get('http://api.yomomma.info/');
        msg.channel.send(`📢**Yomomma joke:** *${JSON.parse(body).joke}*`);
    }
};
