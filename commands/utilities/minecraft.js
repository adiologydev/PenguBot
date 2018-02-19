const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const { get } = require("snekfetch");
const regex1 = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
const regex2 = new RegExp(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/);
module.exports = class MinecraftCMD extends Command {

    constructor(client) {
        super(client, {
            name: "minecraft",
            group: "utilities",
            memberName: "minecraft",
            aliases: ["mc", "mcs", "minecraftserverstatus", "mcstatus"],
            description: "Get a Minecraft Server's status",
            usage: ["<prefix>minecraft <ip> [port]"],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                key: "ip",
                prompt: "What is the minecraft server's IP address?\n",
                type: "string"
            },
            {
                key: "port",
                prompt: "Enter a server port.\n",
                default: "25565",
                type: "integer"
            }
            ]
        });
    }

    async run(msg, { ip, port }) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        function checkIP(ipaddress) {
            if (regex1.test(ipaddress)) {
                return true;
            } else if (regex2.test(ipaddress)) {
                return true;
            } else {
                return false;
            }
        }

        if (checkIP(ip)) {
            const url = `https://mcapi.us/server/status?ip=${ip}&port=${port}`;
            const data = await get(url).then(res => JSON.parse(res.text));

            if (data.online === true) {
                const status = new RichEmbed()
                    .setAuthor("Minecraft Server Status - PenguBot", "https://cdn.discordapp.com/avatars/303181184718995457/d8c775536ad6a13cd117f0ac860355b8.png")
                    .setColor("#7fd85c")
                    .setFooter("© PenguBot", "https://cdn.discordapp.com/avatars/303181184718995457/d8c775536ad6a13cd117f0ac860355b8.png")
                    .setTimestamp()
                    .addField("IP Address:Port", `${ip}:${port}`)
                    .addField("MOTD", this.replaceMotd(data.motd))
                    .addField("Server Version", data.server.name, true)
                    .addField("Players", `${data.players.now}/${data.players.max}`, true)
                    .setThumbnail("http://i.imgur.com/GPCtxEv.png");
                return msg.embed(status);
            } else {
                return msg.reply("🚫 **This server is offline** 🚫 ");
            }
        } else {
            return msg.reply("Invalid Server IP...");
        }
    }
    replaceMotd(motddata) {
        return motddata.replace(/§./g, "");
    // return motddata.split("§0" && "§1" && "§2" && "§3" && "§4" && "§5" && "§6" && "§7" && "§8" && "§9" && "§a" && "§b" && "§c" && "§d" && "§e" && "§k" && "§l" && "§m" && "§n" && "§o" && "§p").join('');
    }

};
