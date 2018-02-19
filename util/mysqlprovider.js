const { SettingProvider } = require("discord.js-commando");
const { Collection } = require("discord.js");

class MySqlProvider extends SettingProvider {

    constructor(db) {
        super();

        this.db = db;
        Object.defineProperty(this, "client", { value: null, writable: true });

        this.settings = new Collection();
        this.listeners = new Collection();
    }

    async init(client) {
        this.client = client;
        await this.db.query("CREATE TABLE IF NOT EXISTS `settings` (`guild` VARCHAR(20) NOT NULL, `settings` TEXT NOT NULL , PRIMARY KEY (`guild`))");

        // Load all settings
        const rows = await this.db.query("SELECT guild, settings FROM settings").then(res => res[0]);
        for (const row of rows) {
            let settings;
            try {
                settings = JSON.parse(row.settings);
            } catch (err) {
                client.emit("warn", `MySqlProvider couldn't parse the settings stored for guild ${row.guild}.`);
                continue;
            }

            const guild = row.guild === "global" ? "global" : row.guild;
            this.settings.set(guild, settings);
            if (guild !== "global" && !client.guilds.has(row.guild)) continue;
            this.setupGuild(guild, settings);
        }

        // Listen for changes
        this.listeners
            .set("commandPrefixChange", (guild, prefix) => this.set(guild, "prefix", prefix))
            .set("commandStatusChange", (guild, command, enabled) => this.set(guild, `cmd-${command.name}`, enabled))
            .set("groupStatusChange", (guild, group, enabled) => this.set(guild, `grp-${group.id}`, enabled))
            .set("guildCreate", guild => {
                const settings = this.settings.get(guild.id);
                if (!settings) return;
                this.setupGuild(guild.id, settings);
            })
            .set("commandRegister", command => {
                for (const [guild, settings] of this.settings) {
                    if (guild !== "global" && !client.guilds.has(guild)) continue;
                    this.setupGuildCommand(client.guilds.get(guild), command, settings);
                }
            })
            .set("groupRegister", group => {
                for (const [guild, settings] of this.settings) {
                    if (guild !== "global" && !client.guilds.has(guild)) continue;
                    this.setupGuildGroup(client.guilds.get(guild), group, settings);
                }
            });
        for (const [event, listener] of this.listeners) client.on(event, listener);
    }

    async destroy() {
        // Remove all listeners from the client
        for (const [event, listener] of this.listeners) {
            this.client.removeListener(event, listener);
        }

        this.listeners.clear();
    }

    get(guild, key, defVal) {
        const settings = this.settings.get(this.constructor.getGuildID(guild));
        return settings ? typeof settings[key] !== "undefined" ? settings[key] : defVal : defVal;
    }

    async set(guild, key, val) {
        guild = this.constructor.getGuildID(guild);
        let settings = this.settings.get(guild);
        if (!settings) {
            settings = {};
            this.settings.set(guild, settings);
        }

        settings[key] = val;
        await this.db.query("REPLACE INTO settings VALUES (?, ?)", [guild !== "global" ? guild : "global", JSON.stringify(settings)]);
        if (guild === "global") this.updateOtherShards(key, val);
        return val;
    }

    async remove(guild, key) {
        guild = this.constructor.getGuildID(guild);
        const settings = this.settings.get(guild);
        if (!settings || typeof settings[key] === "undefined") return undefined;

        const val = settings[key];
        settings[key] = undefined;
        await this.db.query("REPLACE INTO settings VALUES(?, ?)", [guild !== "global" ? guild : "global", JSON.stringify(settings)]);
        if (guild === "global") this.updateOtherShards(key, undefined);
        return val;
    }

    async clear(guild) {
        guild = this.constructor.getGuildID(guild);
        if (!this.settings.has(guild)) return;
        this.settings.delete(guild);
        await this.db.query("DELETE FROM settings WHERE guild = ?", [guild !== "global" ? guild : "global"]);
    }

    setupGuild(guild, settings) {
        if (typeof guild !== "string") throw new TypeError('The guild must be a guild ID or "global".');
        guild = this.client.guilds.get(guild) || null;

        // Load the command prefix
        if (typeof settings.prefix !== "undefined") {
            if (guild) guild._commandPrefix = settings.prefix;
            else this.client._commandPrefix = settings.prefix;
        }

        // Load all command/group statuses
        for (const command of this.client.registry.commands.values()) this.setupGuildCommand(guild, command, settings);
        for (const group of this.client.registry.groups.values()) this.setupGuildGroup(guild, group, settings);
    }

    setupGuildCommand(guild, command, settings) {
        if (typeof settings[`cmd-${command.name}`] === "undefined") return;
        if (guild) {
            if (!guild._commandsEnabled) guild._commandsEnabled = {};
            guild._commandsEnabled[command.name] = settings[`cmd-${command.name}`];
        } else {
            command._globalEnabled = settings[`cmd-${command.name}`];
        }
    }

    setupGuildGroup(guild, group, settings) {
        if (typeof settings[`grp-${group.id}`] === "undefined") return;
        if (guild) {
            if (!guild._groupsEnabled) guild._groupsEnabled = {};
            guild._groupsEnabled[group.id] = settings[`grp-${group.id}`];
        } else {
            group._globalEnabled = settings[`grp-${group.id}`];
        }
    }

    updateOtherShards(key, val) {
        if (!this.client.shard) return;
        key = JSON.stringify(key);
        val = typeof val !== "undefined" ? JSON.stringify(val) : "undefined";
        this.client.shard.broadcastEval(`
			if(this.shard.id !== ${this.client.shard.id} && this.provider && this.provider.settings) {
				let global = this.provider.settings.get('global');
				if(!global) {
					global = {};
					this.provider.settings.set('global', global);
				}
                global[${key}] = ${val};
			}
		`);
    }

}

module.exports = MySqlProvider;
