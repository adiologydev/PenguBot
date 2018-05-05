## Contribute
We love contributors because they make this project even better with their unique talent and skills. If you want to contribute you must know the following this at an intermediate or master level:

- JavaScript (NodeJS)
- Discord.JS (Discord API Wrapper for NodeJS)
- Klasa (Framework we use to create commands, manage settings, etc.)
- Knowledge of how to use Git

## Steps to Start Contributing
1. To start contributing, firstly create a fork of this project and clone it to your computer, you can read more about it here: [How to Fork a Repo](https://help.github.com/articles/fork-a-repo/)

2. Open a console in the repository where you cloned the repository and run `npm install` to install all the required packages to run the bot.

3. Now you would need a few external dependencies to actually run the bot, those dependencies are: MongoDB Server (Guilds, User, Client Settings) and Lavalink Server (Music Node). You can read how to install MongoDB [here](https://docs.mongodb.com/manual/installation/) and Lavalink Server [here](https://github.com/Frederikam/Lavalink#server-configuration).

4. Now you can simply create a `config.json` file by following this empty template [here](https://github.com/AdityaTD/PenguBot/wiki/Default-Config-File).

5. You're now good to go, just run `node start` and the bot should boot up.

6. To start adding new code or manipulating existing one just go through different folders and files and edit them, once you're done just push the changes to your forked repository and create a new pull request from GitHub, if the code is sensible and works then it is most likely that it'll be accepted but it's upto the developers to accept or deny your pull request for any reason.

### Useful Resources
[**Discord.JS Docs**](https://discord.js.org/#/docs/main/master/general/welcome)

[**Klasa Docs**](https://klasa.js.org/#/docs/main/master/Getting%20Started/GettingStarted)

### Basic Empty Klasa Command Example
```js
const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text', 'dm', 'group'], // Text = Guild Channel, DM = DM Channel and Group = Group Channel (For Selfbots)
            cooldown: 0, // Command Throttling in Seconds
            aliases: [], // Other than the filename, what other words should trigger the command
            permLevel: 0, // Adding Information On This Soon
            botPerms: [], // What permissions should the bot have to be able to use this command.
            description: '', // Command Description, will be visible in help command and website.
            usage: '', // Define the required, option or semi-required arguments here.
            extendedHelp: 'No extended help available.' // Extended help on how to use the command.
        });
    }

    async run(msg, [...params]) {
        // This is where you place the code you want to run for your command
    }
};
```