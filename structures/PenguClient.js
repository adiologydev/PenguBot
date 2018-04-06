const { Client, PermissionLevels } = require("klasa");

class PenguClient extends Client {

    constructor(options) { //eslint-disable-line
        super(options);
        this.config = require("../config.json");
        this.functions = require("../utils/functions.js");
    }

}

const pLevels = new PermissionLevels()
    // everyone can use these commands
    .add(0, () => true)
    // Member is a PenguBot Moderator in the guild
    .add(4, (c, m) => m.guild && m.guild.configs.get("staff.mods").indexOf(m.member.id) !== -1, { fetch: true })
    // Member must have Kick/Ban Permissions
    .add(5, (c, m) => m.guild && m.member.permissions.has("BAN_MEMBERS") && m.member.permissions.has("KICK_MEMBERS"), { fetch: true })
    // Member must have 'MANAGE_GUILD' or 'ADMINISTRATOR' permissions
    .add(6, (c, m) => m.guild && m.member.permissions.has("MANAGE_GUILD") || m.member.permissions.has("ADMINISTRATOR") || m.guild.configs.get("staff.admins").indexOf(m.member.id) !== -1, { fetch: true }) // eslint-disable-line
    // The member using this command must be the guild owner
    .add(7, (c, m) => m.guild && m.member === m.guild.owner, { fetch: true })
    /*
     * Allows the Bot Owner to use any lower commands
     * and causes any command with a permission level 9 or lower to return an error if no check passes.
     */
    .add(9, (c, m) => m.author === c.owner, { break: true })
    // Allows the bot owner to use Bot Owner only commands, which silently fail for other users.
    .add(10, (c, m) => m.author === c.owner);

const client = new PenguClient({
    clientOptions: {
        fetchAllMembers: false,
        ownerID: "136549806079344640"
    },
    prefix: "p!",
    cmdEditing: true,
    typing: true,
    permissionLevels: pLevels,
    provider: { default: "mongodb" },
    gateways: {
        guilds: { provider: "mongodb" },
        users: { provider: "mongodb" }
    },
    readyMessage: (c) => `${c.user.tag}, Ready to serve ${c.guilds.size} guilds and ${c.users.size} users.`
});

module.exports = client;
