const { Event } = require("klasa");
const MusicClient = require("../lib/structures/LavalinkClient");
const DBL = require("dblapi.js");

module.exports = class extends Event {

    async run() {
        // Setup lavalink
        this.client.lavalink = new MusicClient(this.client, this.client.config.nodes);
        if (this.client.config.main.status) this.client.whStatus.send(`✅ **ONLINE:** Shard \`${this.client.shard.id}\` is now online.`);

        // Setup DBL Webhook
        if (this.client.shard.id === 0 && !this.client.config.main.patreon) {
            const dbl = new DBL(this.client.config.keys.dbl, {
                webhookPort: 2425,
                webhookAuth: this.client.config.keys.dbl
            });
            dbl.webhook.on("vote", vote =>
                this.client.tasks.get("voteRewards").run(vote));
        }

        this.client.promethus.collectDefaultMetrics({
            timeout: 30000
        });
    }

};
