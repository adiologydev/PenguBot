const { Finalizer } = require("klasa");

module.exports = class extends Finalizer {

    async run() {
        const r = this.client.providers.default.db;

        const query = await r.table("clientStorage")
            .get(this.client.user.id)
            .getField("counter")
            .run();

        await r.table("clientStorage")
            .get(this.client.user.id)
            .update({
                counter: {
                    total: query.total + 1
                }
            })
            .run();

        await this.client.shard.broadcastEval("this.settings.sync(true);");
    }

};
