const { Function } = require("klasa-functions");
const promClient = require("prom-client");

module.exports = class extends Function {

    async run() {
        for (const command of this.client.settings.counter.commands) {
            if (!this.client.prometheus.commands.executions.has(command.name)) {
                await this.client.prometheus.commands.executions.set(
                    command.name,
                    new promClient.Gauge({
                        name: `pengubot_command_${command.name}`,
                        help: `Displays the usage ammount of the ${command.name} command`
                    })
                );
                this.client.prometheus.commands.executions.get(command.name).set(command.count);
            }
        }

        for (const [, command] of this.client.commands) {
            const cat = command.fullCategory[0];
            if (!this.client.prometheus.commands.categories.has(cat)) {
                await this.client.prometheus.commands.categories.set(
                    cat,
                    new promClient.Gauge({
                        name: `pengubot_category_${cat}`,
                        help: `Displays the usage ammount of the ${cat} category`
                    })
                );
            }
        }
    }

};
