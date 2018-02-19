const { WebhookClient, RichEmbed } = require("discord.js");
const config = require("../config.json");
const hook = new WebhookClient("398077031436255232", config.WH.cmd);
module.exports = async (client, command, err, msg) => {
    console.log(`Error in command ${command.groupID}:${command.memberName}`, err.stack);
    const embed = new RichEmbed()
        .setAuthor(msg.author.tag, msg.author.dislayAvatarURl)
        .setDescription(`**Command: **${command.groupID}:${command.memberName}
**Guild:** ${msg.guild.name} (${msg.guild.id})
**Channel:** ${msg.guild ? `${msg.channel.name} (${msg.channel.id})` : "_Direct Messages_"}
**Error**
${err.stack ? err.stack : err}`)
        .setTimestamp()
        .setFooter(`PenguBot - Error Log`);

    hook.send({
        embeds: [embed],
        username: "PenguBot - Error Logs"
    });
};
