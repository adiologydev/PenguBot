const { Event } = require("klasa");

module.exports = class extends Event {

    run(guild) {
        if (this.client.ready && guild.available && !this.client.options.preserveSettings) guild.settings.destroy().catch(() => null);

        this.client.IPC.sendTo("PenguManager", JSON.stringify({
            t: "Prometheus_GUILD",
            at: "dec",
            d: {
                c: 1
            }
        }));
    }

};
