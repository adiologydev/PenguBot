const { Monitor, ServerLog, config } = require("../index");
const { post } = require("snekfetch");

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, { ignoreOthers: false });
    }

    async run(msg) {
        if (!msg.guild || !msg.content || msg.command || !msg.guild.settings.toggles.perspective) return;
        //       if (msg.guild.settings.toggles.staffbypass && await msg.hasAtLeastPermissionLevel(3)) return;
        //       if (this.client.user.id !== "303181184718995457" && await msg.guild.members.fetch("303181184718995457").catch(() => null)) return;

        const { body } = await post(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${config.apis.perspective}`)
            .send({ comment: { text: msg.content }, requestedAttributes: { SEVERE_TOXICITY: {}, TOXICITY: {}, OBSCENE: {}, THREAT: {}, SEXUALLY_EXPLICIT: {}, SPAM: {}, PROFANITY: {} } })
            .catch(() => ({ body: null }));

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
