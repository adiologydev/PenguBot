# PenguBot
PenguBot is a community developed Discord Bot with over 12,000 guilds.
Join Discord: https://discord.gg/u8WYw5r

## Contribute
Submit your PRs with new commands, updated previous commands, etc. and they might get accepted into PenguBot in full production :)

## Empty Command Example
```js
const { Command } = require('discord.js-commando');

module.exports = class ExampleCommand extends Command {
    constructor(client) {
        super(client, {
            name: '', // Command name.
            aliases: [], // Other aliases to execute the command.
            group: '', // Group in which the command will go.
            memberName: '', // Name of command.
            description: '', // Command's description.
            examples: [""], // How the command should be executed.
            guildOnly: true, // Execute in Guild Only
            throttling: {
                usages: 1, // Total Usage in the duration below.
                duration: 3 // Cooldown in Seconds.
            },
             args: [{
                key: '', // Name you want to refer this arg to.
                prompt: '', // Message to prompt while asking for input.
                type: '' // Example: String, Integer, Member, etc.
            }]
        });
    }
    hasPermission(msg) {
        // Permission
    }
    async run(msg, args) {
        // Main Command Code
    }
};
```

## License
MIT

## Author
**AdityaTD**
## Contributor(s)
**Jacz**

## Acknowledgement
This project contains some code from the following:
Commando by WeebDev (https://github.com/WeebDev/Commando)
Lyrics Scraper (Lyricist) from https://github.com/scf4/lyricist
Modified Codes From Komada Pieces (https://github.com/dirigeants/komada-pieces/)