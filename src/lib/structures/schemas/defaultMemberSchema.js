const { KlasaClient } = require("klasa");

module.exports = KlasaClient.defaultMemberSchema

    // Profiles
    .add("xp", "integer", { default: 0, configurable: false })
    .add("level", "integer", { default: 0, configurable: false });
