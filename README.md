# PenguBot [![Build Status](https://travis-ci.org/AdityaTD/PenguBot.svg?branch=master)](https://travis-ci.org/AdityaTD/PenguBot) [![Discord](https://discordapp.com/api/guilds/303195322514014210/embed.png)](https://discord.gg/u8WYw5r)
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
            guildOnly: true, // Execute in Guild Only.
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

## Contributor(s)
[**Jacz**](https://github.com/MrJacz)

## Acknowledgement
This project contains some code from the following:

[**Commando**](https://github.com/WeebDev/Commando) by [**WeebDev**](https://github.com/WeebDev)

[**Lyrics Scraper (Lyricist)**](https://github.com/scf4/lyricist)

[**Komada Pieces**](https://github.com/dirigeants/komada-pieces)

[**Insult Generator**](https://github.com/YorkAARGH)

## Vote on DiscordBots
[![Discord Bots](https://discordbots.org/api/widget/303181184718995457.svg)](https://discordbots.org/bot/303181184718995457/vote)
