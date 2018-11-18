const { Monitor } = require("klasa");
const { post } = require("snekfetch");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.guild.settings.automod.enabled || !msg.content) return;
        if (msg.content.startsWith(msg.guild.settings.prefix) || this.mentionPrefix(msg)) return;
        const req = await post(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.client.config.keys.perspective}`)
            .send({ comment: { text: msg.content }, requestedAttributes: { SEVERE_TOXICITY: {}, TOXICITY: {}, OBSCENE: {}, THREAT: {}, SEXUALLY_EXPLICIT: {}, SPAM: {}, PROFANITY: {} } });

        const { filters } = msg.guild.settings.automod;

        for (const key of Object.keys(req.body.attributeScores)) {
            if (filters[key].enabled) {
                if (req.body.attributeScores[key].summaryScore.value >= filters[key].threshold) {
                    try {
                        msg.delete();
                        this.client.emit("customLogs", msg.guild, "automod", { filter: key, channel: msg.channel, name: "automod", content: msg.content, image: msg.attachments.size > 0 ? await this.checkAttachments(msg.attachments.array()[0].url) : null }, msg.author);
                    } catch (e) {
                        return;
                    }
                }
            }
        }
    }

    mentionPrefix({ content }) {
        const prefixMention = this.prefixMention.exec(content);
        return prefixMention ? { length: prefixMention[0].length, regex: this.prefixMention } : null;
    }

    init() {
        this.prefixMention = new RegExp(`^<@!?${this.client.user.id}>`);
    }

};
