const { Finalizer } = require("klasa");

module.exports = class extends Finalizer {

    constructor(...args) {
        super(...args, { enabled: true });
    }

    async run(msg) {
        const config = this.client.configs;
        const cmd = msg.command.name;
        let count = config.counter.commands.find(c => c.name === cmd);
        let index = config.counter.commands.findIndex(c => c.name === cmd);
        if (index === -1) {
            count = { name: cmd, count: 0 };
            index = null;
        }

        await config.update("counter.total", config.counter.total + 1);
        await config.update("counter.commands", { name: cmd, count: count.count + 1 }, { arrayPosition: index });
    }

    async init() {
        if (!this.client.gateways.clientStorage.schema.has("counter")) {
            this.client.gateways.clientStorage.schema.add("counter", { total: { type: "integer" }, commands: { type: "any", array: true } });
        }
    }

};
