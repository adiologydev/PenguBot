const Command = require("../../lib/structures/KlasaCommand");
const filterLevels = ["Off", "No Role", "Everyone"];
const verificationLevels = ["None", "Low", "Medium", "(╯°□°）╯︵ ┻━┻", "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["server", "guildinfo", "sererinfo"],
            cooldown: 5,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_GUILDINFO_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setThumbnail(msg.guild.iconURL())
            .addField("❯ Name", msg.guild.name, true)
            .addField("❯ ID", msg.guild.id, true)
            .addField("❯ Region", msg.guild.region.toUpperCase(), true)
            .addField("❯ Creation Date", msg.guild.createdAt.toDateString(), true)
            .addField("❯ Explicit Filter", filterLevels[msg.guild.explicitContentFilter], true)
            .addField("❯ Verification Level", verificationLevels[msg.guild.verificationLevel], true)
            .addField("❯ Owner", `<@${msg.guild.ownerID}>`, true)
            .addField("❯ Members", msg.guild.memberCount, true)
            .addField("❯ Roles", msg.guild.roles.size, true)
            .addField("❯ Channels", msg.guild.channels.cache.size, true);

        return msg.sendEmbed(embed);
    }

};
