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
        const activity = guild.members.filter((member) => {
          if(member.lastMessage) {
            return member.lastMessage.createdTimestamp
          }
        });
        const daily = guild.members.filter((member) => {
          if(member.lastMessage) {
            if(new Date() - member.lastMessage.createdTimestamp < 86400000) {
              return member.lastMessage.createdTimestamp
            }
          }
        });
        const weekly = guild.members.filter((member) => {
          if(member.lastMessage) {
            if(new Date() - member.lastMessage.createdTimestamp < (86400000 * 7) && new Date() - member.lastMessage.createdTimestamp > 86400000) {
              return member.lastMessage.createdTimestamp
            }
          }
        });
        const monthly: guild.members.filter((member) => {
          if(member.lastMessage) {
            if(new Date() - member.lastMessage.createdTimestamp < (86400000 * 30) && new Date() - member.lastMessage.createdTimestamp > 86400000) {
              return member.lastMessage.createdTimestamp
            }
          }
        });
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setThumbnail(msg.guild.iconURL())
            .addField("❯ Name", msg.guild.name, true)
            .addField("❯ ID", msg.guild.id, true)
            .addField("❯ Region", msg.guild.region, true)
            .addField("❯ Creation Date", msg.guild.createdAt.toDateString(), true)
            .addField("❯ Explicit Filter", filterLevels[msg.guild.explicitContentFilter], true)
            .addField("❯ Verification Level", verificationLevels[msg.guild.verificationLevel], true)
            .addField("❯ Owner", `<@${msg.guild.ownerID}>`, true)
            .addField("❯ Members", msg.guild.memberCount, true)
            .addField("❯ Roles", msg.guild.roles.size, true)
            .addField("❯ Channels", msg.guild.channels.size, true)
            .addField("❯ Members Have Sent Message", `Since Last Bot Update: ${activity.size}\nDaily: ${daily.size}\nWeekly: ${weekly.size}\nMonthly: ${monthly.size}`);

        return msg.sendEmbed(embed);
    }

};
