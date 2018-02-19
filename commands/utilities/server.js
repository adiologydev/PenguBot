const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const moment = require("moment");
module.exports = class ServerCMD extends Command {

    constructor(client) {
        super(client, {
            name: "server",
            group: "utilities",
            aliases: ["serverinfo"],
            memberName: "server",
            description: "Get information about the guild.",
            usage: ["<prefix>server"],
            throttling: {
                usages: 1,
                duration: 3
            },
            guildOnly: true
        });
    }

    async run(msg) {
        if (msg.guild && !msg.channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) return;
        const { guild } = msg;
        const embed = new RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#56abd1")
            .setFooter(guild.name)
            .setTimestamp()
            .setThumbnail(guild.iconURL)
            .addField("Name & ID", `${guild.name} **(${guild.id})**`, true)
            .addField("Member Count", guild.memberCount, true)
            .addField("Online Members", guild.members.filter(m => m.user.presence.status === "online").size + guild.members.filter(m => m.user.presence.status === "dnd").size + guild.members.filter(m => m.user.presence.status === "idle").size, true)
            .addField("Region", guild.region, true)
            .addField("Channel Count", `${guild.channels.size}`, true)
            .addField(`Role Count`, `${guild.roles.size}`, true)
            .addField("Created At", `${moment(guild.createdAt).format("dddd, MMMM Do YYYY @ h:mm:ss A z")}`, true)
            .addField("Owner", `${guild.owner.user.tag}`, true)
            .addField("Shard ID", this.client.shard.id, true);
        return msg.embed(embed);
    }

};
