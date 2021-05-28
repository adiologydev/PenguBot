const { Finalizer } = require("klasa");

module.exports = class extends Finalizer {

    async run(msg) {
        const cmds = this.client.health.commands.temp;
        if (!cmds[msg.command.name]) cmds[msg.command.name] = 0;
        cmds[msg.command.name] += 1;
        this.client.health.commands.temp.count += 1;

        await config.sync(true);

        const config = this.client.settings;
        const cmd = msg.command.name;
        let count = config.get("counter.commands").find(c => c.name === cmd);
        let index = config.get("counter.commands").findIndex(c => c.name === cmd);
        if (index === -1) {
            count = { name: cmd, count: 0 };
            index = null;
        }

        const updateEval = [
            `this.settings.update("counter.total", ${config.get("counter.total") + 1});`,
            `this.settings.update("counter.commands", { name: ${cmd}, count: ${count.count + 1} }, { arrayPosition: ${index} });`,
            `this.settings.sync(true);`
        ].join(" ");

        await this.client.shard.broadcastEval(updateEval);
    }

};
