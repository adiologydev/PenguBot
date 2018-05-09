const { Client, PermissionLevels } = require("klasa");

class PenguClient extends Client {

    constructor(options) { //eslint-disable-line
        super(options);
        this.config = require("../config.json");
        this.functions = require("../utils/functions.js");
        this.lavalink = null;
        this.queue = new Map();
        this.log = require("../utils/log.js");
    }

}

const pLevels = new PermissionLevels()
    // everyone can use these commands
    .add(0, () => true)
    // Pengu DJ
    .add(3, (c, m) => m.guild && m.guild.configs.get("pengu-dj").includes(m.member.id), { fetch: true })
    // Member is a PenguBot Moderator in the guild
    .add(4, (c, m) => m.guild && m.guild.configs.get("staff-mods").includes(m.member.id), { fetch: true })
    // Member must have Kick/Ban Permissions
    .add(5, (c, m) => m.guild && m.member.permissions.has("BAN_MEMBERS") && m.member.permissions.has("KICK_MEMBERS") || m.guild.configs.get("staff-mods").includes(m.member.id), { fetch: true }) // eslint-disable-line
    // Member must have 'MANAGE_GUILD' or 'ADMINISTRATOR' permissions
    .add(6, (c, m) => m.guild && m.member.permissions.has("MANAGE_GUILD") || m.member.permissions.has("ADMINISTRATOR") || m.guild.configs.get("staff-admins").includes(m.member.id), { fetch: true }) // eslint-disable-line
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
    presence: { activity: { name: "PenguBot.cc | v2.0 | p!help", type: "WATCHING" } },
    prefix: "p!",
    cmdEditing: true,
    disableEveryone: true,
    typing: true,
    permissionLevels: pLevels,
    provider: { default: "rethinkdb" },
    gateways: {
        guilds: { provider: "rethinkdb" },
        users: { provider: "rethinkdb" },
        clientStorage: { provider: "rethinkdb" }
    },
    readyMessage: (c) => `${c.user.tag}, Ready to serve ${c.guilds.size} guilds and ${c.users.size} users.`
});

module.exports = client;
