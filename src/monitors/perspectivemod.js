const { Monitor, ServerLog, config } = require("../index");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.content || msg.command) return;
        if (!msg.guild.settings.toggles.perspective) return;

        const body = await this.fetchURL(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${config.apis.perspective}`, {
            query: { key: config.apis.perspective },
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                comment: { text: msg.content },
                requestedAttributes: { SEVERE_TOXICITY: {}, TOXICITY: {}, OBSCENE: {}, THREAT: {}, SEXUALLY_EXPLICIT: {}, SPAM: {}, PROFANITY: {} }
            })
        });

        if (!body) return;

        const { perspective } = msg.guild.settings.automod;

        for (const key of Object.keys(body.attributeScores)) {
            if (!perspective[key].enabled) continue;
            if (body.attributeScores[key].summaryScore.value >= perspective[key].threshold) {
                await msg.delete().catch(() => null);
                await new ServerLog(msg.guild)
                    .setColor("red")
                    .setType("automod")
                    .setName(`Automod - Perspective | ${key}`)
                    .setAuthor(`${msg.author.tag} in #${msg.channel.name}`, msg.author.displayAvatarURL())
                    .setMessage(`**Content:**\n${msg.content}`)
                    .send();
            }
        }
    }

};
