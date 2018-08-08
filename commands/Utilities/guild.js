const { Command } = require("klasa");
const filterLevels = ["Off", "No Role", "Everyone"];
const verificationLevels = ["None", "Low", "Medium", "(╯°□°）╯︵ ┻━┻", "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"];
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["server"],
            cooldown: 5,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_GUILDINFO_DESCRIPTION"),
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {
      const guild = msg.guild
      const server = {
        name: guild.name,
        id: guild.id,
        createdAt: guild.createdAt,
        image: guild.iconURL(),
        botJoin: guild.joinedAt,
        region: guild.region.toUpperCase(),
        owner: `${guild.owner.displayName}#${guild.owner.user.discriminator}`,
        filter: guild.explicitContentFilter,
        roles: guild.roles.array().length,
        members: guild.memberCount,
        bots: guild.members.filter((member) => { return member.user.bot }).array().length,
        activity: guild.members.filter((member) => {
          if(member.lastMessage) {
            return member.lastMessage.createdTimestamp
          }
        }).array(),
        daily: guild.members.filter((member) => {
          if(member.lastMessage) {
            if(new Date() - member.lastMessage.createdTimestamp < 86400000) {
              return member.lastMessage.createdTimestamp
            }
          }
        }).array(),
        weekly: guild.members.filter((member) => {
          if(member.lastMessage) {
            if(new Date() - member.lastMessage.createdTimestamp < (86400000 * 7) && new Date() - member.lastMessage.createdTimestamp > 86400000) {
              return member.lastMessage.createdTimestamp
            }
          }
        }).array(),
        monthly: guild.members.filter((member) => {
          if(member.lastMessage) {
            if(new Date() - member.lastMessage.createdTimestamp < (86400000 * 30) && new Date() - member.lastMessage.createdTimestamp > 86400000) {
              return member.lastMessage.createdTimestamp
            }
          }
        }).array()
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setThumbnail(guild.image)
            .addField("❯ Name", guild.name, true)
            .addField("❯ ID", guild.id, true)
            .addField("❯ Region", guild.region, true)
            .addField("❯ Creation Date", guild.createdAt.toDateString(), true)
            .addField("❯ Explicit Filter", filterLevels[guild.explicitContentFilter], true)
            .addField("❯ Verification Level", verificationLevels[guild.verificationLevel], true)
            .addField("❯ Owner", `<@${guild.ownerID}>`, true)
            .addField("❯ Members", guild.memberCount, true)
            .addField("❯ Roles", guild.roles.size, true)
            .addField("❯ Channels", guuild.channels.size, true)
            .addField("❯ Members Have Sent Message", `Since Last Bot Update: ${server.activity.length}\nDaily: ${server.daily.length}\nWeekly: ${server.weekly.length}\nMonthly: ${server.monthly.length}`);

        return msg.sendEmbed(embed);
    }

};
