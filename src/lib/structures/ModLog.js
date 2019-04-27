const { MessageEmbed } = require("discord.js");

module.exports = class ModLog {

    constructor(guild) {
        this.guild = guild;
        this.client = guild.client;

        this.caseType = null;
        this.user = null;
        this.moderator = null;
        this.reason = null;
        this.case = null;
        this.timestamp = null;
    }

    /**
     * Gives a type to the mod log
     * @param {string} type type of case
     * @returns {ModLog}
     */
    setType(type) {
        this.type = type;
        return this;
    }

    /**
     * Sets the target user to the mod log
     * @param {User} user target user
     * @returns {ModLog}
     */
    setUser(user) {
        this.user = {
            id: user.id,
            tag: user.tag
        };
        return this;
    }

    /**
     * Sets the moderator to the mod log
     * @param {User} user moderator user
     * @returns {ModLog}
     */
    setModerator(user) {
        this.moderator = {
            id: user.id,
            tag: user.tag,
            avatar: user.displayAvatarURL({ size: 2048, format: "png" })
        };
        return this;
    }

    /**
     * Sets the reason for the case
     * @param {string} reason reason of case
     * @returns {ModLog}
     */
    setReason(reason = null) {
        if (Array.isArray(reason)) reason = reason.join(" ");
        this.reason = reason;
        return this;
    }

    /**
     * Sends an embed with all the details of the mod log
     * @returns {Promise<KlasaMessage>}
     */
    async send() {
        const channel = this.guild.channels.get(this.guild.settings.channels.modlogs);
        if (!channel) throw "Modlogs channel not found.";
        await this.getCase();
        return channel.sendEmbed(this.embed);
    }

    /**
     * Creates an embed with all the details of the mod log
     * @returns {KlasaMessage}
     */
    get embed() {
        return new MessageEmbed()
            .setAuthor(this.moderator.tag, this.moderator.avatar)
            .setColor(this.color(this.type))
            .setDescription([
                `**❯ Type**: ${this.type[0].toUpperCase() + this.type.slice(1)}`,
                `**❯ User**: ${this.user.tag} (${this.user.id})`,
                `**❯ Reason**: ${this.reason || `Use \`${this.guild.settings.prefix}reason ${this.case}\` to claim this log.`}`
            ].join("\n"))
            .setFooter(`Case: ${this.case}`)
            .setTimestamp();
    }

    /**
     * Creates an embed with all the details of the mod log
     * @returns {KlasaMessage}
     */
    async getCase() {
        this.case = this.guild.settings.modlogs.length;
        this.timestamp = new Date().getTime();
        const { errors } = await this.guild.settings.update("modlogs", this.caseInfo);
        if (errors.length) throw errors[0];
        return this.case;
    }

    /**
     * Pack all the case information in an object
     * @returns {Object}
     */
    get caseInfo() {
        return {
            type: this.type,
            user: this.user.id,
            moderator: this.moderator.id,
            reason: this.reason,
            case: this.case,
            timestamp: this.timestamp
        };
    }

    /**
     * Get the default provider being used
     * @returns {Provider}
     */
    get provider() {
        return this.client.providers.default;
    }

    /**
     * Gives color corresponding to a type
     * @param {string} type the type of case
     * @returns {string}
     */
    static color(type) {
        switch (type) {
            case "ban": return "#d9534f";
            case "unban": return "#ab9292";
            case "mute": return "#d9534f";
            case "unmute": return "#ab9292";
            case "warn": return "#fbe400";
            case "kick": return "#d9534f";
            case "softban": return "#d87370";
            default: return "#d9534f";
        }
    }

};
