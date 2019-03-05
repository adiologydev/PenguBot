const { PermissionLevels } = require("klasa");

module.exports = new PermissionLevels()
    // Everyone
    .add(0, () => true)

    // Pengu DJ
    .add(3, ({ member, guild }) => {
        if (!guild || !member) return false;
        return guild.settings.permissions.dj.includes(member.id);
    }, { fetch: true })

    // Member is a PenguBot Moderator in the guild
    .add(4, ({ member, guild }) => {
        if (!guild || !member) return false;
        return guild.settings.permissions.mods.includes(member.id);
    }, { fetch: true })

    // Member must have Kick/Ban Permissions
    .add(5, ({ member, guild }) => {
        if (!guild || !member) return false;
        return guild.settings.permissions.mods.includes(member.id) || (member.permissions.has("BAN_MEMBERS") && member.permissions.has("KICK_MEMBERS"));
    }, { fetch: true })

    // Member must have 'MANAGE_GUILD' or 'ADMINISTRATOR' permissions
    .add(6, ({ member, guild }) => {
        if (!guild || !member) return false;
        return guild.settings.permissions.admins.includes(member.id) || (member.permissions.has("ADMINISTRATOR") && member.permissions.has("MANAGE_GUILD"));
    }, { fetch: true })

    // The member using this command must be the guild owner
    .add(7, ({ member, guild }) => {
        if (!guild || !member) return false;
        return member === guild.owner;
    }, { fetch: true })

    // Allows the Bot Owner to use any lower commands
    .add(9, ({ author, client }) => {
        if (!client || !author) return false;
        return author === client.owner;
    }, { break: true })

    // Allows the bot owner to use Bot Owner only commands, which silently fail for other users.
    .add(10, ({ author, client }) => {
        if (!client || !author) return false;
        return author === client.owner;
    });
