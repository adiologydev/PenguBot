const { MessageEmbed, Permissions } = require("discord.js");
const requiredPermissions = new Permissions(["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"]);

module.exports = class ServerLog {

    constructor(guild) {
        this.guild = guild;
        this.client = guild.client;

        this.type = null;
        this.embedColor = null;
        this.name = null;
        this.user = null;
        this.data = {};
    }

    /**
     * Gives a color to the server log
     * @param {string} type type of log
     * @returns {ServerLog}
     */
    setColor(type) {
        this.embedColor = this.color(type);
        return this;
    }

    /**
     * Gets the type of log
     * @param {string} type type of log
     * @returns {ServerLog}
     */
    setType(type) {
        this.type = type;
        return this;
    }

    /**
     * Sets author for an embed
     * @param {string} name name of author
     * @param {string} iconurl display avatar link
     * @returns {ServerLog}
     */
    setAuthor(name = null, iconurl = null) {
        this.data.author = { name, avatar: iconurl };
        return this;
    }

    /**
     * Sets the message
     * @param {string} message log message
     * @returns {ServerLog}
     */
    setMessage(message = null) {
        if (Array.isArray(message)) message = message.join(" ");
        this.message = message;
        return this;
    }

    /**
     * Sets the name
     * @param {string} name log message
     * @returns {ServerLog}
     */
    setName(name = null) {
        if (Array.isArray(name)) name = name.join(" ");
        this.name = name;
        return this;
    }

    /**
     * Sends an embed with all the details of the server log
     * @returns {Promise<KlasaMessage>}
     */
    async send() {
        if (!this.guild.settings.get(`serverlogs.${this.type}`)) return;
        const channel = this.guild.channels.get(this.guild.settings.channels.logs);
        if (!channel) return;
        if (channel.permissionsFor(this.guild.me).has(requiredPermissions, true)) return;

        return channel.sendEmbed(this.embed);
    }

    /**
     * Creates an embed with all the details of the server log
     * @returns {KlasaMessage}
     */
    get embed() {
        const embed = new MessageEmbed()
            .setColor(this.embedColor)
            .setDescription(this.message)
            .setFooter(this.name)
            .setTimestamp();

        if (this.data && this.data.author) embed.setAuthor(this.data.author.name, this.data.author.avatar ? this.data.author.avatar : "");
        if (this.data && this.data.thumbnail) embed.setThumbnail(this.data.thumbnail);
        if (this.data && this.data.fields) {
            for (const field of this.data.fields) {
                embed.addField(field.name, field.value, field.inline);
            }
        }

        return embed;
    }

    /**
     * Gives color corresponding to a type
     * @param {string} type the type of case
     * @returns {string}
     */
    color(type) {
        switch (type) {
            case "red": return "#d9534f";
            case "green": return "#5cb85c";
            case "blue": return "#428bca";
            case "yellow": return "#d8d94f";
            default: return "#428bca";
        }
    }

};
