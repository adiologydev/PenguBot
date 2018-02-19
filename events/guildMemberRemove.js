module.exports = async (client, member) => {
    const { guild } = member;
    if (!guild.available) return;

    const leave = guild.settings.get("settings.leav-main");
    let leavemsg = guild.settings.get("settings.leav-msg");
    if (!leave) return;
    const [enabled, channelid] = leave.split("|");
    if (!enabled) return;
    const channel = guild.channels.get(channelid);
    if (!channel) {
        await guild.settings.remove("settings.leav-main");
        (await guild.fetchMember(guild.owner.user)).send(`Leave messages disabled as the channel set for it was not found.`)
            .catch(err => console.log(`Error sending dm to ${guild.owner.user.tag} (${guild.owner.id}) for Leave messages\n${err}`));
    }
    leavemsg = leavemsg
        .replace(/{MENTION}/g, member.toString())
        .replace(/{SERVER}/g, guild.name)
        .replace(/{USER}/, member.user.tag)
        .replace(/{TAG}/, member.user.tag)
        .replace(/{DISPLAYNAME}/g, member.displayName)
        .replace(/{ID}/g, member.id);

    await channel.send(leavemsg).catch(err => console.log(`Error trying to send leave message to ${guild.name} (${guild.id})\n ${err}`));
};
