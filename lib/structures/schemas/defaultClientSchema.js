const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultClientSchema

    .add("pGuilds", "string", { array: true, configurable: false })
    .add("counter", folder => folder
        .add("total", "integer")
        .add("commands", "any", { array: true }));

