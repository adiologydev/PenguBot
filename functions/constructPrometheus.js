const { Function } = require("klasa-functions");

module.exports = class extends Function {

    async run() {
        const done = [];

        for (const command of this.client.settings.counter.commands) {
            this.client.IPC.sendTo("PenguManager", JSON.stringify({
                t: "Prometheus_COMMAND_EXECUTIONS",
                at: "set",
                d: {
                    c: command.count,
                    l: [command.name]
                }
            }));
        }

        for (const command of this.client.commands.values()) {
            const cat = command.fullCategory[0];
            if (done.includes(cat)) continue;
            this.client.IPC.sendTo("PenguManager", JSON.stringify({
                t: "Prometheus_COMMAND_CATEGORIES",
                at: "inc",
                d: {
                    c: 1,
                    l: [cat]
                }
            }));
            done.push(cat);
        }
    }

};
