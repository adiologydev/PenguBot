# PenguBot [![Build Status](https://travis-ci.org/AdityaTD/PenguBot.svg?branch=master)](https://travis-ci.org/AdityaTD/PenguBot) [![Discord](https://discordapp.com/api/guilds/303195322514014210/embed.png)](https://discord.gg/u8WYw5r) [![Greenkeeper badge](https://badges.greenkeeper.io/AdityaTD/PenguBot.svg)](https://greenkeeper.io/) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/112e816149814ef1a83d9a376cf566b5)](https://www.codacy.com/app/adityatripathidelhi/PenguBot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AdityaTD/PenguBot&amp;utm_campaign=Badge_Grade)

PenguBot is a community developed Discord Bot with over 15,000 guilds.
Join Discord for Support and Development https://discord.gg/u8WYw5r

## Contribute
We use Klasa as our command framework, Discord.JS as our Discord Framework, you must have brief knowledge of those to be able to contribute. Accepting Pull Requests for meaningful additions to the bot.

## Basic Empty Command Example
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

## Acknowledgement
[**Klasa Pieces**](https://github.com/dirigeants/klasa-pieces/)

[**Dragonfire535 - Xiao**](https://github.com/dragonfire535)

[**WeebDev - Commando**](https://github.com/WeebDev/Commando)

[**Jacz**](https://github.com/MrJacz)

## Vote on DiscordBots to Support
[![Discord Bots](https://discordbots.org/api/widget/303181184718995457.svg)](https://discordbots.org/bot/303181184718995457/vote)

## License
MIT
