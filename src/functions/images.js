const { Function } = require("@kcp/functions");
const { get } = require("snekfetch");

module.exports = class extends Function {

    run(endpoint, load = {}) {
        return get(`https://images.pengubot.com/${endpoint}`)
            .set("Authorization", this.client.config.keys.images)
            .query(load)
            .then(res => {
                if (res.status !== 200) return null;
                return res.body;
            });
    }

};
