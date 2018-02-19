const { Command } = require("discord.js-commando");

module.exports = class LMGTFYCmd extends Command {

    constructor(client) {
        super(client, {
            name: "lmgtfy",
            aliases: ["letmegoogleitforyou", "letmegoogle"],
            group: "utilities",
            memberName: "lmgtfy",
            description: "Generate a short Let Me Google It For You Link.",
            examples: ["<prefix>lmgtfy <search term>"],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "searchterms",
                prompt: "Please enter what you want to search.\n",
                type: "string"
            }]
        });
    }

    async run(msg, { searchterms }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const baseurl = "http://lmgtfy.com/?q=";
        const qterm = searchterms.replace(/ /g, "+");
        const totalterm = baseurl + qterm;
        return msg.reply(`✅ Here is your LMGTFY Link: ${totalterm}`);
    }

};
