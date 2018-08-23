const { Function } = require("klasa-functions");

module.exports = class extends Function {

    async run() {
        const done = [];

        for (const command of this.client.settings.counter.commands) {
            this.client.prometheus.commands.executions.labels(command.name).set(command.count);
        }

        for (const command of this.client.commands.values()) {
            const cat = command.fullCategory[0];
            if (done.includes(cat)) continue;
            this.client.prometheus.commands.categories.labels(cat).inc();
            done.push(cat);
        }
    }

};
