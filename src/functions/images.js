const { Function, config, util: { fetch } } = require("../index");

module.exports = class extends Function {

    run(endpoint, load = {}) {
        return fetch(`https://server.pengubot.com/${endpoint}`, { method: "POST", headers: { authorization: config.apis.pengu }, body: JSON.stringify(load) }, "buffer");
    }

};
