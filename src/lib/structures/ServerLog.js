const { MessageEmbed } = require("discord.js");

module.exports = class ServerLog {

    constructor(guild) {
        this.guild = guild;
        this.client = guild.client;

        this.type = null;
        this.embedColor = null;
        this.name = null;
        this.user = null;
        this.data = null;
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
     * Gives a type to the server log
     * @param {Object} data type of case
     * @returns {ServerLog}
     */
    setData(data) {
        this.data = data;
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
        if (!this.guild.settings.get(`logs.${this.type}`)) return;
        const channel = this.guild.channels.get(this.guild.settings.channels.logs);
        if (!channel) throw "Server logs channel not found.";
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

        if (this.data && this.data.author) embed.setAuthor(this.data.author);
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
    static color(type) {
        switch (type) {
            case "red": return "#d9534f";
            case "green": return "#5cb85c";
            case "blue": return "#428bca";
            case "yellow": return "#d8d94f";
            default: return "#428bca";
        }
    }

};
