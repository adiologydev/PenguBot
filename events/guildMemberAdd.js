module.exports = async (client, member) => {
    const { guild } = member;
    if (!guild.available) return;
    await welcomeMessage(client, member);
    // Auto Role
    await addRole(client, member);
};

async function welcomeMessage(client, member) {
    const { guild } = member;
    const welcome = guild.settings.get("settings.wlcm-main");
    let welcomemsg = guild.settings.get("settings.wlcm-msg");
    if (!welcome) return;
    const [enabled, channelid] = welcome.split("|");
    if (!enabled) return;
    const channel = guild.channels.get(channelid);
    if (!channel) {
        await guild.settings.remove("settings.wlcm-main");
        (await guild.fetchMember(guild.owner.user)).send(`Join messages disabled as the channel set for it was not found.`)
            .catch(err => console.log(`Error sending dm to ${guild.owner.user.tag} (${guild.owner.id}) for join messages\n${err}`));
    }
    welcomemsg = welcomemsg
        .replace(/{MENTION}/g, member.toString())
        .replace(/{SERVER}/g, guild.name)
        .replace(/{USER}/, member.user.tag)
        .replace(/{TAG}/, member.user.tag)
        .replace(/{DISPLAYNAME}/g, member.displayName)
        .replace(/{ID}/g, member.id);

    return await channel.send(welcomemsg).catch(err => console.log(`Error trying to send welcome message to ${guild.name} (${guild.id})\n ${err}`));
}

async function addRole(client, member) {
    const { guild } = member;
    const roleid = guild.settings.get("AutoRole");
    if (!roleid) return;
    const role = guild.roles.get(roleid);
    if (!role) return await guild.settings.remove("AutoRole");
    const perms = guild.me.permissions;
    if (!perms.has("MANAGE_ROLES")) return (await guild.fetchMember(guild.owner.user)).send(`PenguBot does not have the Manage roles permission, please join the support guild to learn how to enable this discord permission.`);
    return await member.addRole(roleid);
}
