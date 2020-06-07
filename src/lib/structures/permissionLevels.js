const { PermissionLevels } = require("klasa");

module.exports = new PermissionLevels()
    // Everyone
    .add(0, () => true)

    // Pengu DJ
    .add(2, ({ member, guild }) => {
        if (!guild || !member) return false;
        return member.roles.has(guild.settings.get("roles.dj")) || guild.settings.get("users.dj").includes(member.id);
    }, { fetch: true })

    // Pengu Staff
    .add(3, ({ member, guild }) => {
        if (!guild || !member) return false;
        return member.roles.has(guild.settings.get("roles.staff")) || guild.settings.get("users.staff").includes(member.id);
    }, { fetch: true })

    // Member is a PenguBot Moderator in the guild
    .add(4, ({ member, guild }) => {
        if (!guild || !member) return false;
        return member.roles.has(guild.settings.get("roles.mod")) || guild.settings.get("users.mod").includes(member.id);
    }, { fetch: true })

    // Member must have Kick/Ban Permissions
    .add(5, ({ member, guild }) => {
        if (!guild || !member) return false;
        return member.roles.has(guild.settings.get("roles.mod")) || guild.settings.get("users.mod").includes(member.id) || (member.permissions.has("BAN_MEMBERS") && member.permissions.has("KICK_MEMBERS"));
    }, { fetch: true })

    // Member must have 'MANAGE_GUILD' or 'ADMINISTRATOR' permissions
    .add(6, ({ member, guild }) => {
        if (!guild || !member) return false;
        return member.roles.has(guild.settings.get("roles.admin")) || guild.settings.get("users.admin").includes(member.id) || (member.permissions.has("ADMINISTRATOR") && member.permissions.has("MANAGE_GUILD"));
    }, { fetch: true })

    // The member using this command must be the guild owner
    .add(7, ({ member, guild }) => {
        if (!guild || !member) return false;
        return member === guild.owner;
    }, { fetch: true })

    // Allows the Bot Owner to use any lower commands
    .add(9, ({ author, client }) => client.owners.has(author), { break: true })

    // Allows the bot owner to use Bot Owner only commands, which silently fail for other users.
    .add(10, ({ author, client }) => client.owners.has(author));
