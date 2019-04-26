const { Monitor } = require("../index");
const { post } = require("snekfetch");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.content || msg.command || !msg.guild.settings.automod.enabled) return;
        if (await msg.hasAtLeastPermissionLevel(4)) return;
        if (this.client.user.id !== "303181184718995457" && await msg.guild.members.fetch("303181184718995457").catch(() => null)) return;

        const { body } = await post(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${this.client.config.keys.perspective}`)
            .send({ comment: { text: msg.content }, requestedAttributes: { SEVERE_TOXICITY: {}, TOXICITY: {}, OBSCENE: {}, THREAT: {}, SEXUALLY_EXPLICIT: {}, SPAM: {}, PROFANITY: {} } })
            .catch(() => ({ body: null }));

        if (!body) return;

        const { filters } = msg.guild.settings.automod;

        for (const key of Object.keys(body.attributeScores)) {
            if (!filters[key].enabled) continue;
            if (body.attributeScores[key].summaryScore.value <= filters[key].threshold) return;
            await msg.delete().catch(() => null);
            this.client.emit("customLogs", msg.guild, "automod", { filter: key, channel: msg.channel, name: "automod", content: msg.content, image: msg.attachments.size > 0 ? await this.checkAttachments(msg.attachments.first()) : null }, msg.author);
        }
    }

    checkAttachments(attachment) {
        return attachment && attachment.height ? attachment : null;
    }

};
