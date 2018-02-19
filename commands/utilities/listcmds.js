const { Command } = require("discord.js-commando");
const main = require("../../main.js");

module.exports = class ListCustomCMD extends Command {

    constructor(client) {
        super(client, {
            name: "listcmds",
            group: "utilities",
            aliases: ["cmdlist", "listc", "listcustom", "listcustomcommand", "listcommands"],
            memberName: "listcmds",
            description: "Know which all custom commands the server has.",
            usage: ["<prefix>listcmds"],
            guildOnly: true
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const connection = main.database;
        const [rows] = await connection.execute(`SELECT * FROM settings WHERE guild = ${msg.guild.id}`);
        if (!rows.length) return msg.say(`No settings for this guild`);
        const obj = JSON.parse(rows[0].settings);
        const res = Object.keys(obj).filter(v => v.startsWith("cmd."));
        if (!res.length) return msg.reply("This guild has no custom commands yet. Ask an Administrator to make some 😃!");

        const list = res.toString().replace(/cmd./g, msg.guild.commandPrefix);
        msg.say(`⚪ Custom Commands of ** ${msg.guild.name}** are:\n**~~-~~** ${list.replace(/,/g, "\n**~~-~~** ")}`);
    }

};
