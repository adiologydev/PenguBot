const { Task, Colors, discordUtil: { binaryToID } } = require("../index");

// THRESHOLD equals to 30 minutes in milliseconds:
//     - 1000 milliseconds = 1 second
//     - 60 seconds        = 1 minute
//     - 30 minutes
const THRESHOLD = 1000 * 60 * 30,
    EPOCH = 1420070400000,
    EMPTY = "0000100000000000000000";

module.exports = class MemorySweeper extends Task {

    constructor(...args) {
        super(...args);

        // The colors to stylise the console's logs
        this.colors = {
            red: new Colors({ text: "lightred" }),
            yellow: new Colors({ text: "lightyellow" }),
            green: new Colors({ text: "green" })
        };

        // The header with the console colors
        this.header = new Colors({ text: "lightblue" }).format("[CACHE CLEANUP]");
    }

    async run() {
        const OLD_SNOWFLAKE = binaryToID(((Date.now() - THRESHOLD) - EPOCH).toString(2).padStart(42, "0") + EMPTY);
        let presences = 0, guildMembers = 0, emojis = 0, lastMessages = 0, users = 0;

        // Per-Guild sweeper
        for (const guild of this.client.guilds.values()) {
            // Clear presences
            presences += guild.presences.size;
            guild.presences.clear();

            // Clear members that haven't send a message in the last 30 minutes
            const { me } = guild;
            for (const [id, member] of guild.members) {
                if (member === me) continue;
                if (member.voice.channelID) continue;
                if (member.lastMessageID && member.lastMessageID > OLD_SNOWFLAKE) continue;
                guildMembers++;
                guild.members.delete(id);
            }

            // Clear emojis
            emojis += guild.emojis.size;
            guild.emojis.clear();
        }

        // Per-Channel sweeper
        for (const channel of this.client.channels.values()) {
            if (!channel.lastMessageID) continue;
            channel.lastMessageID = null;
            lastMessages++;
        }

        // Per-User sweeper
        for (const user of this.client.users.values()) {
            if (user.lastMessageID && user.lastMessageID > OLD_SNOWFLAKE) continue;
            this.client.users.delete(user.id);
            this.client.gateways.users.cache.delete(user.id);
            users++;
        }

        // Emit a log
        this.client.emit("verbose",
            `${this.header} ${
                this.setColor(presences)} [Presence]s | ${
                this.setColor(guildMembers)} [GuildMember]s | ${
                this.setColor(users)} [User]s | ${
                this.setColor(emojis)} [Emoji]s | ${
                this.setColor(lastMessages)} [Last Message]s.`);
    }

    /**
	 * Set a colour depending on the amount:
	 * > 1000 : Light Red colour
	 * > 100  : Light Yellow colour
	 * < 100  : Green colour
	 * @since 3.0.0
	 * @param {number} number The number to colourise
	 * @returns {string}
	 */
    setColor(number) {
        const text = String(number).padStart(5, " ");
        // Light Red color
        if (number > 1000) return this.colors.red.format(text);
        // Light Yellow color
        if (number > 100) return this.colors.yellow.format(text);
        // Green color
        return this.colors.green.format(text);
    }

    // Init
    async init() {
        if (!this.client.settings.schedules.some(schedule => schedule.taskName === this.name)) {
            await this.client.schedule.create("cleaner", "*/8 * * * *");
        }
    }

};
