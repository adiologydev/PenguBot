const { Event } = require("../index.js");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: "VOICE_STATE_UPDATE",
            emitter: "ws"
        });
    }

    async run(data) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        if (!guild) return;

        await guild.members.fetch(data.user_id).catch(() => null);

        return guild.voiceStates.add(data);
    }

};
