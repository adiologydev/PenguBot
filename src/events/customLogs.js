const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {

    /* eslint-disable complexity */
    async run(guild, type, data, user) {
        if (!guild.settings.loggingChannel) return;
        if (!guild.settings.get(`logs.${data.name}`)) return;

        const channel = guild.channels.get(guild.settings.loggingChannel);
        if (!channel || !channel.postable) return;

        switch (type) {
            case "join": channel.send(this.generateEmbed(`📥 ${user} has joined **${guild.name}**.`, "#5cb85c", { footer: "Member Joined", title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "leave": channel.send(this.generateEmbed(`📤 ${user} has left **${guild.name}**.`, "#d9534f", { footer: "Member Left", title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "ban": channel.send(this.generateEmbed(`🔨 ${user} has been **banned**.`, "#d9534f", { footer: "Member Banned", title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "kick": channel.send(this.generateEmbed(`👢 ${user} has been **kicked** by ${data.kicker} for \`${data.reason}\`.`, "#d9534f", { footer: "Member Kicked", title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "mute": channel.send(this.generateEmbed(`🔇 ${user} has been **muted** by ${data.muter}.`, "#d9534f", { footer: "Member Muted", title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "unmute": channel.send(this.generateEmbed(`🔈 ${user} has been **un-muted** by ${data.muter}.`, "#5cb85c", { footer: "Member Unmuted", title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "unban": channel.send(this.generateEmbed(`🔨 ${user} has been **un-banned**.`, "#428bca", { footer: "Member Unbanned", title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "msgUpdate": channel.send(this.generateEmbed(`**Old:**\n${data.oldContent}\n\n**New:**\n${data.newContent}`, "#428bca", { footer: `Message Updated in #${data.channel.name}`, title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL() }));
                break;
            case "msgDelete": channel.send(this.generateEmbed(`**Content:**\n${data.content}`, "#d9534f", { footer: `Messages Deleted in #${data.channel.name}`, title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL(), image: data.image }));
                break;
            case "msgBulkDelete": channel.send(this.generateEmbed(`❌ \`${data.count}\` Messages Deleted in ${data.channel}`, "#d9534f", { footer: `Bulk Messages Deleted` }));
                break;
            case "channelCreate": channel.send(this.generateEmbed(`📗 **#${data.channel.name}** (${data.channel.id}) channel was \`created\``, "#5cb85c", { footer: `Channel Created` }));
                break;
            case "channelDelete": channel.send(this.generateEmbed(`📕 **#${data.channel.name}** (${data.channel.id}) channel was \`deleted\``, "#d9534f", { footer: `Channel Deleted` }));
                break;
            case "channelUpdate": channel.send(this.generateEmbed(`🛠 **#${data.channel.name}** (${data.channel.id}) channel was \`updated\``, "#428bca", { footer: `Channel Updated` }));
                break;
            case "roleCreate": channel.send(this.generateEmbed(`☑ **${data.role}** (${data.role.id}) role was \`created\``, "#5cb85c", { footer: `Role Created` }));
                break;
            case "roleDelete": channel.send(this.generateEmbed(`❌ **${data.role}** (${data.role.id}) role was \`deleted\``, "#d9534f", { footer: `Role Deleted` }));
                break;
            case "roleUpdate": channel.send(this.generateEmbed(`🔄 **${data.role}** (${data.role.id}) role was \`updated\``, "#428bca", { footer: `Role Updated` }));
                break;
            case "automod": channel.send(this.generateEmbed(`**Content:**\n${data.content}`, "#d9534f", { footer: `Autmod Deleted in #${data.channel.name} for ${data.filter}`, title: `${user.tag} | ${user.id}`, avatar: user.displayAvatarURL(), image: data.image }));
                break;
            default: break;
        }
    }

    generateEmbed(message, color, data) {
        const embed = new MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .setDescription(message);
        if (data.title) embed.setAuthor(data.title, data.avatar);
        if (data.image) embed.setImage(data.image);
        if (data.footer) embed.setFooter(data.footer);
        return embed;
    }

};
