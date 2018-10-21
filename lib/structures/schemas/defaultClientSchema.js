const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultClientSchema

    .add("pGuilds", "string", { array: true, configurable: false })
    .add("counter", folder => folder
        .add("total", "integer")
        .add("commands", "any", { array: true }))

    .add("patrons", folder => folder
        .add("users", "user", { array: true, configurable: false })
        .add("guilds", "guild", { array: true, configurable: false }));

