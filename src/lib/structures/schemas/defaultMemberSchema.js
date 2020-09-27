const { Schema } = require("klasa");

module.exports = new Schema()

    // Profiles
    .add("xp", "integer", { default: 0, configurable: false })
    .add("level", "integer", { default: 0, configurable: false });
